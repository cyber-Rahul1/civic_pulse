import http from 'http';
import { CivicLogger } from '../logging/civic-logger.service.js';
import { NotificationEventType, EventTopic } from '@civic-pulse/contracts';

export interface DispatchNotificationEventOptions {
  notificationsServiceUrl: string;
  internalServiceToken: string;
  eventId: string;
  eventType: NotificationEventType;
  aggregateId: string;
  payload: Record<string, any>;
  logger?: CivicLogger;
}

/**
 * Dispatch an event to Notifications Service with bounded retries and non-blocking failure recovery.
 * Because standalone MongoDB does not support cross-service distributed transactions,
 * events are dispatched with deterministic eventIds. The Notifications Service guarantees
 * idempotent receipt via unique indexes on eventId and compound recipient indexes.
 */
export async function dispatchNotificationEvent(
  options: DispatchNotificationEventOptions,
): Promise<boolean> {
  const {
    notificationsServiceUrl,
    internalServiceToken,
    eventId,
    eventType,
    aggregateId,
    payload,
    logger,
  } = options;

  const targetUrl = new URL(
    '/api/v1/internal/notifications/events',
    notificationsServiceUrl,
  );

  const bodyData = JSON.stringify({
    eventId,
    topic: EventTopic.REPORTS_EVENTS,
    eventType,
    aggregateId,
    timestamp: new Date().toISOString(),
    payload,
  });

  const maxRetries = 2;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const success = await new Promise<boolean>((resolve) => {
        const req = http.request(
          targetUrl.href,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'content-length': Buffer.byteLength(bodyData),
              'x-internal-service-token': internalServiceToken,
              'x-internal-service-name': 'event-dispatcher',
            },
            timeout: 3000,
          },
          (res) => {
            let resBody = '';
            res.on('data', (c) => (resBody += c));
            res.on('end', () => {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                resolve(true);
              } else {
                logger?.warn(
                  `Notification event dispatch attempt ${attempt} failed with status ${res.statusCode}: ${resBody}`,
                );
                resolve(false);
              }
            });
          },
        );

        req.on('error', (err) => {
          logger?.warn(
            `Notification event dispatch attempt ${attempt} network error: ${err.message}`,
          );
          resolve(false);
        });

        req.on('timeout', () => {
          req.destroy();
          logger?.warn(
            `Notification event dispatch attempt ${attempt} timed out after 3000ms`,
          );
          resolve(false);
        });

        req.write(bodyData);
        req.end();
      });

      if (success) {
        return true;
      }
    } catch (err: any) {
      logger?.warn(
        `Unexpected error during event dispatch attempt ${attempt}: ${err.message}`,
      );
    }
  }

  logger?.error(
    `Failed to dispatch notification event ${eventId} (${eventType}) after ${maxRetries} attempts. Event marked for retry/recovery.`,
  );
  return false;
}

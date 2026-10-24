import {
  Injectable,
  BadGatewayException,
  GatewayTimeoutException,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import http from 'http';
import { CivicLogger } from '@civic-pulse/nest-common';

export interface ProxyRequestOptions {
  targetServiceUrl: string;
  path: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body?: any;
  correlationId: string;
}

export interface ProxyResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  data: any;
}

@Injectable()
export class HttpProxyService {
  private readonly timeoutMs: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Gateway:HttpProxyService');
    this.timeoutMs = Number(
      this.configService.get<number>('GATEWAY_TIMEOUT_MS') || 10000,
    );
  }

  async forward(options: ProxyRequestOptions): Promise<ProxyResponse> {
    const targetUrl = new URL(options.path, options.targetServiceUrl);

    // 1. Ingress Header Sanitization:
    // Aggressively strip untrusted internal headers that external clients might forge
    const sanitizedHeaders: Record<string, string | string[] | undefined> = {};
    for (const [key, val] of Object.entries(options.headers)) {
      const lower = key.toLowerCase();
      // Drop any spoofed internal headers or host header
      if (
        lower.startsWith('x-internal-') ||
        lower === 'x-user-id' ||
        lower === 'x-user-role' ||
        lower === 'host'
      ) {
        continue;
      }
      sanitizedHeaders[key] = val;
    }

    // Attach verified correlation ID and gateway forward signature
    sanitizedHeaders['x-correlation-id'] = options.correlationId;
    sanitizedHeaders['x-forwarded-by'] = 'CivicPulse-Gateway';

    const payload = options.body ? JSON.stringify(options.body) : undefined;
    if (payload) {
      sanitizedHeaders['content-type'] = 'application/json';
      sanitizedHeaders['content-length'] = Buffer.byteLength(payload).toString();
    }

    return new Promise<ProxyResponse>((resolve, reject) => {
      const req = http.request(
        {
          hostname: targetUrl.hostname,
          port: targetUrl.port,
          path: targetUrl.pathname + targetUrl.search,
          method: options.method,
          headers: sanitizedHeaders as http.OutgoingHttpHeaders,
          timeout: this.timeoutMs,
        },
        (res) => {
          let responseBody = '';
          res.on('data', (chunk) => {
            responseBody += chunk;
          });
          res.on('end', () => {
            let parsed: any;
            try {
              parsed = JSON.parse(responseBody);
            } catch {
              parsed = responseBody;
            }

            const statusCode = res.statusCode || 200;

            if (statusCode >= 400) {
              // Propagate downstream error
              reject(new HttpException(parsed, statusCode));
            } else {
              resolve({
                statusCode,
                headers: res.headers,
                data: parsed,
              });
            }
          });
        },
      );

      req.on('timeout', () => {
        req.destroy();
        this.logger.error(`[${options.correlationId}] Gateway timeout proxying to ${targetUrl}`);
        reject(new GatewayTimeoutException('Upstream service request timed out'));
      });

      req.on('error', (err) => {
        this.logger.error(
          `[${options.correlationId}] Bad gateway error reaching ${targetUrl}: ${err.message}`,
        );
        reject(
          new BadGatewayException(
            `Unable to reach upstream service (${targetUrl.hostname}:${targetUrl.port})`,
          ),
        );
      });

      if (payload) {
        req.write(payload);
      }
      req.end();
    });
  }
}

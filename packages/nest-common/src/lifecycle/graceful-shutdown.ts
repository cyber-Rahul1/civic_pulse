import { INestApplication } from '@nestjs/common';
import { CivicLogger } from '../logging/civic-logger.service.js';

/**
 * Installs graceful shutdown hooks to handle SIGTERM/SIGINT signals.
 * Drains in-flight HTTP requests and cleanly disconnects database/redis connections.
 */
export function setupGracefulShutdown(app: INestApplication, serviceName: string) {
  const logger = new CivicLogger();
  logger.setContext(`${serviceName}:Shutdown`);

  app.enableShutdownHooks();

  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];

  shutdownSignals.forEach((signal) => {
    process.on(signal, async () => {
      logger.log(`Received ${signal}. Commencing graceful shutdown of ${serviceName}...`);
      try {
        await app.close();
        logger.log(`${serviceName} closed successfully.`);
        process.exit(0);
      } catch (err: any) {
        logger.error(`Error during graceful shutdown of ${serviceName}: ${err?.message}`, err?.stack);
        process.exit(1);
      }
    });
  });
}

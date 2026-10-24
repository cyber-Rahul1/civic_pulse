import { Injectable, LoggerService, Scope } from '@nestjs/common';
import pino, { Logger as PinoInstance } from 'pino';

@Injectable({ scope: Scope.TRANSIENT })
export class CivicLogger implements LoggerService {
  private pinoLogger: PinoInstance;
  private contextName = 'CivicPulse';

  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    this.pinoLogger = pino({
      level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
      timestamp: pino.stdTimeFunctions.isoTime,
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    });
  }

  setContext(context: string) {
    this.contextName = context;
  }

  log(message: any, ...optionalParams: any[]) {
    this.pinoLogger.info({ context: this.contextName, extra: optionalParams }, message);
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    this.pinoLogger.error({ context: this.contextName, trace, extra: optionalParams }, message);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.pinoLogger.warn({ context: this.contextName, extra: optionalParams }, message);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.pinoLogger.debug({ context: this.contextName, extra: optionalParams }, message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.pinoLogger.trace({ context: this.contextName, extra: optionalParams }, message);
  }
}

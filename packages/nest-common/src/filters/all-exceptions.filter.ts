import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiResponse, ApiErrorDetail, ApiResponseMeta } from '@civic-pulse/contracts';
import { CivicLogger } from '../logging/civic-logger.service.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CivicLogger,
    private readonly serviceName: string,
    private readonly serviceVersion: string,
  ) {
    this.logger.setContext('AllExceptionsFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const correlationId =
      ((request as any).correlationId as string) ||
      (request.headers['x-correlation-id'] as string) ||
      'unknown';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let errorMessage = 'An unexpected internal error occurred';
    let errorDetails: Record<string, unknown> | Array<unknown> | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        errorMessage = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, any>;
        errorMessage = obj.message || exception.message;
        errorCode = obj.error || exception.name;
        if (Array.isArray(obj.message)) {
          errorMessage = 'Validation failed';
          errorDetails = obj.message;
          errorCode = 'VALIDATION_ERROR';
        }
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `[${correlationId}] Unhandled exception: ${exception.message}`,
        exception.stack,
      );
      errorMessage =
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : exception.message;
    }

    const meta: ApiResponseMeta = {
      timestamp: new Date().toISOString(),
      correlationId,
      service: this.serviceName,
      version: this.serviceVersion,
    };

    const errorPayload: ApiErrorDetail = {
      code: errorCode,
      message: errorMessage,
      details: errorDetails,
    };

    const envelope: ApiResponse<null> = {
      success: false,
      statusCode: status,
      data: null,
      error: errorPayload,
      meta,
    };

    response.status(status).send(envelope);
  }
}

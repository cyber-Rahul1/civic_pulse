import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiResponse, ApiResponseMeta } from '@civic-pulse/contracts';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(
    private readonly serviceName: string,
    private readonly serviceVersion: string,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const http = context.switchToHttp();
    const req = http.getRequest<FastifyRequest>();
    const res = http.getResponse<FastifyReply>();

    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    return next.handle().pipe(
      map((data) => {
        // If data is already in standard envelope format, avoid double-wrapping
        if (data && typeof data === 'object' && 'success' in data && 'meta' in data) {
          return data;
        }

        const meta: ApiResponseMeta = {
          timestamp: new Date().toISOString(),
          correlationId,
          service: this.serviceName,
          version: this.serviceVersion,
        };

        const statusCode = res.statusCode || 200;

        return {
          success: true,
          statusCode,
          data,
          error: null,
          meta,
        };
      }),
    );
  }
}

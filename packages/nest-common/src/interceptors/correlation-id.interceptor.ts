import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<FastifyRequest>();
    const res = http.getResponse<FastifyReply>();

    let correlationId = req.headers[CORRELATION_ID_HEADER] as string;
    if (!correlationId) {
      correlationId = uuidv4();
    }

    (req as any).correlationId = correlationId;
    res.header(CORRELATION_ID_HEADER, correlationId);

    return next.handle();
  }
}

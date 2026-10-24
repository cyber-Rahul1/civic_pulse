import {
  Controller,
  All,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';
import { HttpProxyService } from './http-proxy.service.js';

@ApiTags('Gateway Proxy')
@Controller()
export class ProxyController {
  private readonly identityServiceUrl: string;

  constructor(
    private readonly proxyService: HttpProxyService,
    private readonly configService: ConfigService,
  ) {
    this.identityServiceUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') || 'http://127.0.0.1:3001';
    this.reportsServiceUrl =
      this.configService.get<string>('REPORTS_SERVICE_URL') || 'http://127.0.0.1:3002';
  }

  private readonly reportsServiceUrl: string;

  @All('api/v1/auth/*')
  @ApiOperation({ summary: 'Proxy authentication and identity requests to Identity Service' })
  async proxyAuth(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.identityServiceUrl,
      path: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      correlationId,
    });

    res.status(proxyRes.statusCode).send(proxyRes.data);
  }

  @All(['api/v1/reports', 'api/v1/reports/*'])
  @ApiOperation({ summary: 'Proxy civic reports requests to Reports Service' })
  async proxyReports(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.reportsServiceUrl,
      path: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      correlationId,
    });

    res.status(proxyRes.statusCode).send(proxyRes.data);
  }

  @All(['api/v1/media', 'api/v1/media/*'])
  @ApiOperation({ summary: 'Proxy media upload signature requests to Reports & Media Service' })
  async proxyMedia(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.reportsServiceUrl,
      path: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      correlationId,
    });

    res.status(proxyRes.statusCode).send(proxyRes.data);
  }
}

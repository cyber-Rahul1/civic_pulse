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
  private readonly reportsServiceUrl: string;
  private readonly communityServiceUrl: string;
  private readonly authorityServiceUrl: string;
  private readonly notificationsServiceUrl: string;

  constructor(
    private readonly proxyService: HttpProxyService,
    private readonly configService: ConfigService,
  ) {
    this.identityServiceUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') || 'http://127.0.0.1:3001';
    this.reportsServiceUrl =
      this.configService.get<string>('REPORTS_SERVICE_URL') || 'http://127.0.0.1:3002';
    this.communityServiceUrl =
      this.configService.get<string>('COMMUNITY_SERVICE_URL') || 'http://127.0.0.1:3003';
    this.authorityServiceUrl =
      this.configService.get<string>('AUTHORITY_SERVICE_URL') || 'http://127.0.0.1:3004';
    this.notificationsServiceUrl =
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') || 'http://127.0.0.1:3005';
  }

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

  @All(['api/v1/authority', 'api/v1/authority/*', 'api/v1/me/authority-assignments'])
  @ApiOperation({ summary: 'Proxy authority requests to Authority Service' })
  async proxyAuthority(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.authorityServiceUrl,
      path: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      correlationId,
    });

    res.status(proxyRes.statusCode).send(proxyRes.data);
  }

  @All([
    'api/v1/me/notifications',
    'api/v1/me/notifications/*',
    'api/v1/me/notification-preferences',
    'api/v1/me/device-tokens',
  ])
  @ApiOperation({ summary: 'Proxy notifications and preferences to Notifications Service' })
  async proxyNotifications(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.notificationsServiceUrl,
      path: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      correlationId,
    });

    res.status(proxyRes.statusCode).send(proxyRes.data);
  }

  @All([
    'api/v1/comments',
    'api/v1/comments/*',
    'api/v1/me/followed-reports',
  ])
  @ApiOperation({ summary: 'Proxy comments and following requests to Community Service' })
  async proxyCommunity(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const proxyRes = await this.proxyService.forward({
      targetServiceUrl: this.communityServiceUrl,
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

  @All(['api/v1/reports', 'api/v1/reports/*'])
  @ApiOperation({ summary: 'Proxy civic reports requests to appropriate upstream service' })
  async proxyReports(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const correlationId =
      ((req as any).correlationId as string) ||
      (req.headers['x-correlation-id'] as string) ||
      'unknown';

    const url = req.url;

    // Route assignments, evidence, and jurisdiction-matches to Authority Service
    if (url.includes('/assignments') || url.includes('/evidence') || url.includes('/match-jurisdictions')) {
      const proxyRes = await this.proxyService.forward({
        targetServiceUrl: this.authorityServiceUrl,
        path: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        correlationId,
      });
      return res.status(proxyRes.statusCode).send(proxyRes.data);
    }

    // Route endorsements, follows, comments, community-summary, stats reconciliation to Community Service
    if (
      url.includes('/endorsement') ||
      url.includes('/community-summary') ||
      url.includes('/follow') ||
      url.includes('/comments') ||
      url.includes('/stats')
    ) {
      const proxyRes = await this.proxyService.forward({
        targetServiceUrl: this.communityServiceUrl,
        path: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        correlationId,
      });
      return res.status(proxyRes.statusCode).send(proxyRes.data);
    }

    // Default to Reports Service
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


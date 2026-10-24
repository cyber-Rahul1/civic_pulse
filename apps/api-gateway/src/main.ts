import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { ServiceName } from '@civic-pulse/contracts';
import {
  CivicLogger,
  CorrelationIdInterceptor,
  AllExceptionsFilter,
  setupGracefulShutdown,
  setupSwagger,
  validateEnvironment,
} from '@civic-pulse/nest-common';
import { AppModule } from './app.module.js';
import { GatewayEnvConfig } from './config/gateway.env.js';

async function bootstrap() {
  // 1. Validate environment configuration
  const config = validateEnvironment(process.env, GatewayEnvConfig);

  const logger = new CivicLogger();
  logger.setContext('ApiGateway:Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    logger: false,
    trustProxy: true,
    bodyLimit: 1048576, // 1MB request size limit
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger,
      bufferLogs: true,
    },
  );

  // 2. Global prefix for gateway management endpoints
  // Note: Proxied routes /api/v1/... are handled by controllers directly

  // 3. Security Headers with Helmet
  await (app as any).register(helmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  // 4. Strict CORS configuration (no wildcard with credentials)
  const allowedOrigins = (config.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  await (app as any).register(cors, {
    origin: (origin: string | undefined, cb: (err: Error | null, allow: boolean) => void) => {
      // Allow requests with no origin (e.g. mobile apps, curl) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('CORS request blocked by Gateway policy'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id'],
  });

  // 5. Rate Limiting on Public Gateway
  await (app as any).register(rateLimit, {
    max: config.RATE_LIMIT_MAX || 60,
    timeWindow: '1 minute',
    allowList: ['127.0.0.1'], // Allow loopback for testing
  });

  // 6. Global Interceptors & Centralized Error Filter
  app.useGlobalInterceptors(new CorrelationIdInterceptor());
  app.useGlobalFilters(
    new AllExceptionsFilter(logger, ServiceName.API_GATEWAY, '1.0.0'),
  );

  // 7. OpenAPI / Swagger Setup
  setupSwagger(app, {
    title: 'CivicPulse API Gateway Documentation',
    description: 'Edge API Gateway with rate limiting, correlation tracking, and reverse proxy routing',
    version: '1.0.0',
    docsPath: 'api/docs',
  });

  // 8. Graceful Shutdown
  setupGracefulShutdown(app, ServiceName.API_GATEWAY);

  const port = Number(config.API_GATEWAY_PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 ${ServiceName.API_GATEWAY} running on port ${port}`);
  logger.log(`📖 Gateway Swagger documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during bootstrap of ApiGateway:', err);
  process.exit(1);
});

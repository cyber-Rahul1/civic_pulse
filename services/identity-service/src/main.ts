import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import helmet from '@fastify/helmet';
import { ServiceName } from '@civic-pulse/contracts';
import {
  CivicLogger,
  CorrelationIdInterceptor,
  ResponseTransformInterceptor,
  AllExceptionsFilter,
  setupGracefulShutdown,
  setupSwagger,
  validateEnvironment,
} from '@civic-pulse/nest-common';
import { AppModule } from './app.module.js';
import { IdentityEnvConfig } from './config/identity.env.js';

async function bootstrap() {
  // 1. Validate environment configuration before booting
  validateEnvironment(process.env, IdentityEnvConfig);

  const logger = new CivicLogger();
  logger.setContext('IdentityService:Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    logger: false, // We use custom Pino structured logger
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger,
      bufferLogs: true,
    },
  );

  // 2. Global prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // 3. Security headers with Fastify Helmet
  await (app as any).register(helmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  // 4. Request validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 5. Global interceptors & filters
  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new ResponseTransformInterceptor(ServiceName.IDENTITY, '1.0.0'),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(logger, ServiceName.IDENTITY, '1.0.0'),
  );

  // 6. OpenAPI / Swagger Setup
  setupSwagger(app, {
    title: 'CivicPulse Identity Microservice API',
    description: 'Authentication, Authorization, Roles and User Profiles',
    version: '1.0.0',
    docsPath: 'api/docs',
  });

  // 7. Graceful Shutdown
  setupGracefulShutdown(app, ServiceName.IDENTITY);

  const port = Number(process.env.IDENTITY_SERVICE_PORT) || 3001;
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 ${ServiceName.IDENTITY} running on port ${port}`);
  logger.log(`📖 Swagger API documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during bootstrap of IdentityService:', err);
  process.exit(1);
});

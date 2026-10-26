import 'reflect-metadata';
import dns from 'node:dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import {
  CivicLogger,
  AllExceptionsFilter,
  CorrelationIdInterceptor,
  ResponseTransformInterceptor,
  setupGracefulShutdown,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const logger = new CivicLogger();
  logger.setContext('Notifications:Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    logger: false,
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { logger },
  );

  await app.register(helmet as any, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(logger, ServiceName.NOTIFICATIONS, '1.0.0'));
  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new ResponseTransformInterceptor(ServiceName.NOTIFICATIONS, '1.0.0'),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CivicPulse Notifications Service')
    .setDescription('In-App Notifications, Preference Management, and Event Ingestion')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter RS256 JWT access token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  setupGracefulShutdown(app, 'notifications-service');

  const port = Number(process.env.NOTIFICATIONS_SERVICE_PORT) || 3005;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 notifications-service running on port ${port}`);
  logger.log(`📖 Notifications Swagger API docs: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during notifications-service bootstrap:', err);
  process.exit(1);
});

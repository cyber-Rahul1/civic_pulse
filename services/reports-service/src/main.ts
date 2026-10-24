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
import { ReportsEnvConfig } from './config/reports.env.js';

async function bootstrap() {
  validateEnvironment(process.env, ReportsEnvConfig);

  const logger = new CivicLogger();
  logger.setContext('ReportsService:Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    logger: false,
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

  app.setGlobalPrefix('api/v1');

  await (app as any).register(helmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new ResponseTransformInterceptor(ServiceName.REPORTS, '1.0.0'),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(logger, ServiceName.REPORTS, '1.0.0'),
  );

  setupSwagger(app, {
    title: 'CivicPulse Reports & Media Microservice API',
    description: 'Civic issue report lifecycle management, geospatial queries, and presigned media uploads',
    version: '1.0.0',
    docsPath: 'api/docs',
  });

  setupGracefulShutdown(app, ServiceName.REPORTS);

  const port = Number(process.env.REPORTS_SERVICE_PORT) || 3002;
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 ${ServiceName.REPORTS} running on port ${port}`);
  logger.log(`📖 Reports Swagger API docs: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during bootstrap of ReportsService:', err);
  process.exit(1);
});

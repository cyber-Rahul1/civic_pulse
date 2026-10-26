import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyHelmet from '@fastify/helmet';
import {
  CivicLogger,
  AllExceptionsFilter,
  CorrelationIdInterceptor,
  ResponseTransformInterceptor,
  setupSwagger,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const logger = new CivicLogger();
  logger.setContext('Community:Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    logger: false,
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { logger },
  );

  await app.register(fastifyHelmet as any, {
    contentSecurityPolicy: false,
  });

  app.enableCors({
    origin: (process.env.CORS_ORIGIN || '*').split(','),
    credentials: true,
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

  app.useGlobalFilters(
    new AllExceptionsFilter(logger, ServiceName.COMMUNITY, '1.0.0'),
  );
  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new ResponseTransformInterceptor(ServiceName.COMMUNITY, '1.0.0'),
  );

  setupSwagger(app, {
    title: 'CivicPulse Community Service API',
    description: 'Civic issue report endorsements, comments, following, and discussion APIs',
    version: '1.0.0',
    docsPath: 'api/docs',
  });

  const port = Number(process.env.COMMUNITY_SERVICE_PORT || 3003);
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 community-service running on port ${port}`);
  logger.log(`📖 Community Swagger API docs: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error in community-service:', err);
  process.exit(1);
});

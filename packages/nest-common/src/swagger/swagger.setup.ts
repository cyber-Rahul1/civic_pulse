import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerConfigOptions {
  title: string;
  description: string;
  version: string;
  tag?: string;
  docsPath?: string;
}

/**
 * Standardized OpenAPI/Swagger documentation setup for all CivicPulse microservices.
 */
export function setupSwagger(app: INestApplication, options: SwaggerConfigOptions) {
  const config = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const docsPath = options.docsPath || 'api/docs';

  SwaggerModule.setup(docsPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  return document;
}

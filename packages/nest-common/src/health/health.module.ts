import { DynamicModule, Module } from '@nestjs/common';
import { HealthController, HealthService } from './health.controller.js';

@Module({})
export class HealthModule {
  static register(serviceName: string, serviceVersion: string): DynamicModule {
    const healthServiceProvider = {
      provide: HealthService,
      useFactory: () => new HealthService(serviceName, serviceVersion),
    };

    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [healthServiceProvider],
      exports: [HealthService],
    };
  }
}

import { HealthService } from './health.controller';

describe('HealthService', () => {
  it('should return healthy status when no indicators fail', async () => {
    const service = new HealthService('test-service', '1.0.0');
    const health = await service.getHealth();

    expect(health.service).toBe('test-service');
    expect(health.version).toBe('1.0.0');
    expect(health.status).toBe('healthy');
    expect(typeof health.uptimeSeconds).toBe('number');
  });

  it('should return degraded status when an indicator reports down', async () => {
    const service = new HealthService('test-service', '1.0.0');
    service.registerIndicator({
      name: 'database',
      check: async () => ({ status: 'down', message: 'Connection timed out' }),
    });

    const health = await service.getHealth();
    expect(health.status).toBe('degraded');
    expect(health.checks?.database?.status).toBe('down');
  });
});

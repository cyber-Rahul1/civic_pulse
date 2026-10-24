import { validateEnvironment } from './env.validator';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class TestConfig {
  @IsString()
  APP_NAME!: string;

  @Type(() => Number)
  @IsNumber()
  PORT!: number;
}

describe('validateEnvironment', () => {
  it('should successfully parse and validate valid environment properties', () => {
    const raw = {
      APP_NAME: 'CivicPulseTest',
      PORT: '3000',
    };

    const validated = validateEnvironment(raw, TestConfig);
    expect((validated as TestConfig).APP_NAME).toBe('CivicPulseTest');
    expect((validated as TestConfig).PORT).toBe(3000); // auto-converted to number
  });

  it('should throw descriptive error when required properties are missing', () => {
    const raw = {
      APP_NAME: 'CivicPulseTest',
    };

    expect(() => validateEnvironment(raw, TestConfig)).toThrow(
      /CivicPulse Config Validation Error/,
    );
  });
});

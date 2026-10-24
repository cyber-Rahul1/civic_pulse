import 'reflect-metadata';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * Validates environment variables at application boot.
 * If required environment variables are missing or of invalid type, prevents application startup with a clear error report.
 */
export function validateEnvironment<T extends object>(
  config: Record<string, unknown>,
  envClass: ClassConstructor<T>,
): T {
  const validatedConfig = plainToInstance(envClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const formattedErrors = errors
      .map((err) => {
        const constraints = Object.values(err.constraints || {}).join(', ');
        return `  - Property "${err.property}": ${constraints}`;
      })
      .join('\n');

    throw new Error(
      `[CivicPulse Config Validation Error] Invalid environment configuration:\n${formattedErrors}`,
    );
  }

  return validatedConfig as T;
}

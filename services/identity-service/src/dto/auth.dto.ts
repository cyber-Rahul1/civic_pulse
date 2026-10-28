import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'resident@example.com' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email!: string;

  @ApiProperty({ example: 'SecurePassword123!', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Display name cannot be empty' })
  displayName!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'resident@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Opaque refresh token previously issued' })
  @IsString()
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken!: string;
}

export class LogoutDto {
  @ApiPropertyOptional({ description: 'Optional refresh token to revoke alongside session' })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}

export class VerifyLocationDto {
  @ApiProperty({ description: 'Coordinates in [longitude, latitude] GeoJSON format', example: [83.2185, 17.6868] })
  @IsArray({ message: 'Coordinates must be an array [longitude, latitude]' })
  coordinates!: [number, number];

  @ApiPropertyOptional({ description: 'Reported GPS accuracy in meters', example: 12.5 })
  @IsOptional()
  @IsNumber({}, { message: 'accuracyMeters must be a number' })
  accuracyMeters?: number;

  @ApiPropertyOptional({ description: 'GPS fix timestamp in milliseconds', example: 1729864200000 })
  @IsOptional()
  @IsNumber({}, { message: 'timestamp must be a number' })
  timestamp?: number;
}


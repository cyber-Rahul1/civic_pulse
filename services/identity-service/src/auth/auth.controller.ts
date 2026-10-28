import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import {
  CurrentUser,
  Public,
} from '@civic-pulse/nest-common';
import {
  UserProfileDto,
  AuthResponseData,
  JwtTokenPayload,
  UserRole,
} from '@civic-pulse/contracts';
import { AuthService } from './auth.service.js';
import { TokenService } from './token.service.js';
import { IdentityJwtAuthGuard } from './identity-jwt-auth.guard.js';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  LogoutDto,
  VerifyLocationDto,
} from '../dto/auth.dto.js';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new citizen account (resident role only)' })
  @SwaggerResponse({ status: 201, description: 'User account registered' })
  @SwaggerResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() dto: RegisterDto): Promise<UserProfileDto> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user with email and password' })
  @SwaggerResponse({ status: 200, description: 'Login successful' })
  @SwaggerResponse({ status: 401, description: 'Invalid email or password' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: FastifyRequest,
  ): Promise<AuthResponseData> {
    const meta = {
      userAgent: req.headers['user-agent'] as string | undefined,
      ipAddress: req.ip,
    };
    return this.authService.login(dto, meta);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token and issue new token pair' })
  @SwaggerResponse({ status: 200, description: 'Token pair refreshed' })
  @SwaggerResponse({ status: 401, description: 'Invalid, expired, or reused token' })
  async refresh(@Body() dto: RefreshTokenDto): Promise<AuthResponseData> {
    return this.authService.refresh(dto);
  }

  @UseGuards(IdentityJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out and revoke current session' })
  @SwaggerResponse({ status: 200, description: 'Session revoked' })
  async logout(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: LogoutDto,
  ): Promise<{ message: string }> {
    return this.authService.logout(user.sessionId, dto?.refreshToken);
  }

  @UseGuards(IdentityJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out of all active devices and sessions' })
  @SwaggerResponse({ status: 200, description: 'All active sessions revoked' })
  async logoutAll(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ message: string; sessionsRevokedCount: number }> {
    return this.authService.logoutAll(user.sub);
  }

  @UseGuards(IdentityJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @SwaggerResponse({ status: 200, description: 'Profile returned' })
  @SwaggerResponse({ status: 401, description: 'Unauthorized' })
  async me(@CurrentUser() user: JwtTokenPayload): Promise<UserProfileDto> {
    return this.authService.getProfile(user.sub);
  }

  @UseGuards(IdentityJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('me/location')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify and update user current GPS location' })
  @SwaggerResponse({ status: 200, description: 'Verified location updated' })
  @SwaggerResponse({ status: 400, description: 'Invalid coordinates or stale fix' })
  @SwaggerResponse({ status: 401, description: 'Unauthorized' })
  async updateLocation(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: VerifyLocationDto,
  ): Promise<UserProfileDto> {
    return this.authService.verifyUserLocation(user.sub, dto);
  }

  @UseGuards(IdentityJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('me/location')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify and update user current GPS location' })
  @SwaggerResponse({ status: 200, description: 'Verified location updated' })
  @SwaggerResponse({ status: 400, description: 'Invalid coordinates or stale fix' })
  @SwaggerResponse({ status: 401, description: 'Unauthorized' })
  async postLocation(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: VerifyLocationDto,
  ): Promise<UserProfileDto> {
    return this.authService.verifyUserLocation(user.sub, dto);
  }


  @Public()
  @Get('public-key')
  @ApiOperation({ summary: 'Retrieve public RSA key for local JWT verification' })
  @SwaggerResponse({ status: 200, description: 'PEM public key' })
  getPublicKey(): { publicKey: string } {
    return { publicKey: this.tokenService.getPublicKey() };
  }

  // ---------------------------------------------------------------------------
  // Internal S2S Role Update Endpoint (Authorized callers only)
  // ---------------------------------------------------------------------------
  @Post('internal/users/:id/role')
  @ApiOperation({ summary: 'Elevate or modify user role via internal service communication' })
  async updateRole(
    @Req() req: FastifyRequest,
    @Body() dto: { role: UserRole },
  ): Promise<UserProfileDto> {
    const internalKey = req.headers['x-internal-service-token'] as string | undefined;
    const callerService = req.headers['x-internal-service-name'] as string | undefined;

    // Reject missing credentials
    if (!internalKey) {
      throw new UnauthorizedException('Missing internal service credentials');
    }

    // Cryptographic service credential verification:
    // In production, AUTHORITY_INTERNAL_KEY must be explicitly set and cannot fall back to dev secret
    const isProd = process.env.NODE_ENV === 'production';
    const authorityInternalKey = process.env.AUTHORITY_INTERNAL_KEY || (isProd ? '' : 'civic_pulse_authority_internal_secret_dev');
    
    if (!authorityInternalKey) {
      throw new UnauthorizedException('Authority service internal key is not configured in production');
    }

    // Role elevation requires the specific authority-service credential.
    // Possession of generic INTERNAL_SERVICE_KEY or other service secrets is insufficient.
    if (internalKey !== authorityInternalKey) {
      throw new UnauthorizedException('Caller is not authorized for user role elevation');
    }

    // Self-asserted callerService header must also match if present, but the credential itself proves identity
    if (callerService && callerService !== 'authority-service') {
      throw new UnauthorizedException('Caller service identity mismatch');
    }

    const userId = (req.params as any).id;
    return this.authService.updateUserRole(userId, dto.role);
  }
}

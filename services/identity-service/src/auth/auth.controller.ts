import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
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
} from '@civic-pulse/contracts';
import { AuthService } from './auth.service.js';
import { TokenService } from './token.service.js';
import { IdentityJwtAuthGuard } from './identity-jwt-auth.guard.js';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  LogoutDto,
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

  @Public()
  @Get('public-key')
  @ApiOperation({ summary: 'Retrieve public RSA key for local JWT verification' })
  @SwaggerResponse({ status: 200, description: 'PEM public key' })
  getPublicKey(): { publicKey: string } {
    return { publicKey: this.tokenService.getPublicKey() };
  }
}

/**
 * Typed Centralized API Client for CivicPulse Mobile
 * 
 * Communicates exclusively with API Gateway on port 3000.
 * Handles:
 * - Correlation ID injection
 * - Authorization Bearer tokens
 * - Automated Refresh Token Rotation on 401 with loop protection
 * - Standardized error extraction matching ApiErrorResponse
 */

import {
  AuthTokens,
  UserProfileDto,
  AuthResponseData,
  ReportDto,
  ReportCategory,
  ReportStatus,
  CommentDto,
  EndorsementSummaryDto,
  CommunitySummaryDto,
  NotificationDto,
  PaginatedNotificationsDto,
  NotificationPreferencesDto,
  UpdateNotificationPreferencesDto,
  DepartmentDto,
  ReportAssignmentDto,
  PublicAssignmentViewDto,
  MediaSignatureResponseDto,
  SignUploadDto,
  CreateReportDto,
  CreateCommentDto,
  RegisterDto,
  LoginDto,
  RepresentativeProfileDto,
  RepresentativeAccountabilitySummaryDto,
  ResolutionEvidenceDto,
  ProfileClaimRequestDto,
  RepresentativeImportSummaryDto,
  SubmitProfileClaimDto,
  SubmitResolutionEvidenceDto,
  VerifyResolutionEvidenceDto,
} from '@civic-pulse/contracts';
import { mobileConfig } from '../config/env';
import { secureStorage } from '../storage/secure-storage';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

export interface ApiClientError extends Error {
  statusCode: number;
  code?: string;
  details?: any;
}

export class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string | null) => void> = [];

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || mobileConfig.apiGatewayUrl).replace(/\/$/, '');
  }

  setBaseUrl(url: string) {
    this.baseUrl = url.replace(/\/$/, '');
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  private async getAccessToken(): Promise<string | null> {
    return secureStorage.getItemAsync('civic_access_token');
  }

  private async getRefreshToken(): Promise<string | null> {
    return secureStorage.getItemAsync('civic_refresh_token');
  }

  private async setTokens(tokens: AuthTokens): Promise<void> {
    await secureStorage.setItemAsync('civic_access_token', tokens.accessToken);
    await secureStorage.setItemAsync('civic_refresh_token', tokens.refreshToken);
  }

  public async clearSession(): Promise<void> {
    await secureStorage.deleteItemAsync('civic_access_token');
    await secureStorage.deleteItemAsync('civic_refresh_token');
    await secureStorage.deleteItemAsync('civic_user_profile');
  }

  private generateCorrelationId(): string {
    return `mob_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  /**
   * Internal HTTP dispatch
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, requiresAuth = false } = options;
    const url = `${this.baseUrl}/${path.replace(/^\//, '')}`;

    const reqHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'x-correlation-id': this.generateCorrelationId(),
      ...headers,
    };

    if (body !== undefined) {
      reqHeaders['Content-Type'] = 'application/json';
    }

    if (requiresAuth) {
      const token = await this.getAccessToken();
      if (token) {
        reqHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: reqHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (networkError: any) {
      const err = new Error(
        `Network connection failed to ${this.baseUrl}: ${networkError?.message || 'Host unreachable'}`
      ) as ApiClientError;
      err.statusCode = 0;
      throw err;
    }

    // Handle 401 Unauthorized for authenticated requests (Try refreshing token)
    if (response.status === 401 && requiresAuth && !path.includes('auth/refresh') && !path.includes('auth/login')) {
      const refreshed = await this.handleTokenRefresh();
      if (refreshed) {
        // Retry original request once with fresh token
        const freshToken = await this.getAccessToken();
        reqHeaders['Authorization'] = `Bearer ${freshToken}`;
        response = await fetch(url, {
          method,
          headers: reqHeaders,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });
      }
    }

    let responseData: any = null;
    const text = await response.text();
    try {
      responseData = text ? JSON.parse(text) : null;
    } catch {
      responseData = text;
    }

    if (!response.ok) {
      const err = new Error(
        responseData?.message || `Request failed with status ${response.status}`
      ) as ApiClientError;
      err.statusCode = response.status;
      err.code = responseData?.code || responseData?.error;
      err.details = responseData?.details || responseData;
      throw err;
    }

    // Unwrap standardized ApiSuccessResponse { data: ... } if present
    if (responseData && typeof responseData === 'object' && 'data' in responseData && 'meta' in responseData) {
      return responseData.data as T;
    }

    return responseData as T;
  }

  private async handleTokenRefresh(): Promise<boolean> {
    if (this.isRefreshing) {
      return new Promise<boolean>((resolve) => {
        this.refreshSubscribers.push((token) => resolve(Boolean(token)));
      });
    }

    this.isRefreshing = true;
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        await this.clearSession();
        this.notifySubscribers(null);
        return false;
      }

      const refreshRes = await this.request<AuthResponseData>('api/v1/auth/refresh', {
        method: 'POST',
        body: { refreshToken },
        requiresAuth: false,
      });

      if (refreshRes?.tokens) {
        await this.setTokens(refreshRes.tokens);
        if (refreshRes.user) {
          await secureStorage.setItemAsync('civic_user_profile', JSON.stringify(refreshRes.user));
        }
        this.notifySubscribers(refreshRes.tokens.accessToken);
        return true;
      }

      await this.clearSession();
      this.notifySubscribers(null);
      return false;
    } catch {
      await this.clearSession();
      this.notifySubscribers(null);
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }

  private notifySubscribers(newToken: string | null) {
    this.refreshSubscribers.forEach((cb) => cb(newToken));
    this.refreshSubscribers = [];
  }

  // ===========================================================================
  // 1. Authentication APIs
  // ===========================================================================

  async register(dto: RegisterDto): Promise<UserProfileDto> {
    return this.request<UserProfileDto>('api/v1/auth/register', {
      method: 'POST',
      body: dto,
    });
  }

  async login(dto: LoginDto): Promise<AuthResponseData> {
    const res = await this.request<AuthResponseData>('api/v1/auth/login', {
      method: 'POST',
      body: dto,
    });
    if (res?.tokens) {
      await this.setTokens(res.tokens);
      if (res.user) {
        await secureStorage.setItemAsync('civic_user_profile', JSON.stringify(res.user));
      }
    }
    return res;
  }

  async logout(): Promise<void> {
    const refreshToken = await this.getRefreshToken();
    try {
      await this.request('api/v1/auth/logout', {
        method: 'POST',
        body: { refreshToken: refreshToken || undefined },
        requiresAuth: true,
      });
    } finally {
      await this.clearSession();
    }
  }

  async getMe(): Promise<UserProfileDto> {
    return this.request<UserProfileDto>('api/v1/auth/me', {
      method: 'GET',
      requiresAuth: true,
    });
  }

  // ===========================================================================
  // 2. Reports & Media APIs
  // ===========================================================================

  async signMediaUpload(dto: SignUploadDto): Promise<MediaSignatureResponseDto> {
    return this.request<MediaSignatureResponseDto>('api/v1/media/sign-upload', {
      method: 'POST',
      body: dto,
      requiresAuth: true,
    });
  }

  async createReport(dto: CreateReportDto): Promise<ReportDto> {
    return this.request<ReportDto>('api/v1/reports', {
      method: 'POST',
      body: dto,
      requiresAuth: true,
    });
  }

  async listReports(params?: {
    category?: ReportCategory;
    status?: ReportStatus;
    page?: number;
    limit?: number;
  }): Promise<{ items: ReportDto[]; total: number; page: number; totalPages: number }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const qs = query.toString();
    return this.request(`api/v1/reports${qs ? `?${qs}` : ''}`, {
      method: 'GET',
    });
  }

  async getNearbyReports(
    longitude: number,
    latitude: number,
    radiusMeters: number = 5000,
    filters?: {
      category?: ReportCategory;
      status?: ReportStatus;
      limit?: number;
    }
  ): Promise<ReportDto[]> {
    const query = new URLSearchParams({
      longitude: String(longitude),
      latitude: String(latitude),
      radiusMeters: String(radiusMeters),
    });
    if (filters?.category) query.append('category', filters.category);
    if (filters?.status) query.append('status', filters.status);
    if (filters?.limit) query.append('limit', String(filters.limit));

    return this.request(`api/v1/reports/nearby?${query.toString()}`, {
      method: 'GET',
    });
  }

  async getReport(id: string): Promise<ReportDto> {
    return this.request<ReportDto>(`api/v1/reports/${id}`, {
      method: 'GET',
    });
  }

  async getReportHistory(id: string): Promise<any[]> {
    return this.request(`api/v1/reports/${id}/history`, {
      method: 'GET',
    });
  }

  // ===========================================================================
  // 3. Community Endorsements, Following, Discussions
  // ===========================================================================

  async getCommunitySummary(reportId: string): Promise<CommunitySummaryDto> {
    return this.request<CommunitySummaryDto>(
      `api/v1/reports/${reportId}/community-summary`,
      { method: 'GET', requiresAuth: true }
    );
  }

  async endorseReport(reportId: string): Promise<EndorsementSummaryDto> {
    return this.request<EndorsementSummaryDto>(
      `api/v1/reports/${reportId}/endorsement`,
      { method: 'PUT', requiresAuth: true }
    );
  }

  async removeEndorsement(reportId: string): Promise<EndorsementSummaryDto> {
    return this.request<EndorsementSummaryDto>(
      `api/v1/reports/${reportId}/endorsement`,
      { method: 'DELETE', requiresAuth: true }
    );
  }

  async followReport(reportId: string): Promise<{ isFollowing: boolean }> {
    return this.request<{ isFollowing: boolean }>(
      `api/v1/reports/${reportId}/follow`,
      { method: 'PUT', requiresAuth: true }
    );
  }

  async unfollowReport(reportId: string): Promise<{ isFollowing: boolean }> {
    return this.request<{ isFollowing: boolean }>(
      `api/v1/reports/${reportId}/follow`,
      { method: 'DELETE', requiresAuth: true }
    );
  }

  async listComments(
    reportId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ items: CommentDto[]; total: number; page: number; totalPages: number }> {
    return this.request(
      `api/v1/reports/${reportId}/comments?page=${page}&limit=${limit}`,
      { method: 'GET' }
    );
  }

  async listReplies(commentId: string): Promise<CommentDto[]> {
    return this.request<CommentDto[]>(`api/v1/comments/${commentId}/replies`, {
      method: 'GET',
    });
  }

  async createComment(reportId: string, dto: CreateCommentDto): Promise<CommentDto> {
    return this.request<CommentDto>(`api/v1/reports/${reportId}/comments`, {
      method: 'POST',
      body: dto,
      requiresAuth: true,
    });
  }

  async updateComment(commentId: string, content: string): Promise<CommentDto> {
    return this.request<CommentDto>(`api/v1/comments/${commentId}`, {
      method: 'PATCH',
      body: { content },
      requiresAuth: true,
    });
  }

  async deleteComment(commentId: string): Promise<{ message: string }> {
    return this.request(`api/v1/comments/${commentId}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  }

  async reportCommentAbuse(commentId: string, reason: string, details?: string) {
    return this.request(`api/v1/comments/${commentId}/abuse-reports`, {
      method: 'POST',
      body: { reason, details },
      requiresAuth: true,
    });
  }

  // ===========================================================================
  // 4. Notifications & Preferences
  // ===========================================================================

  async getNotifications(page: number = 1, limit: number = 20): Promise<PaginatedNotificationsDto> {
    return this.request<PaginatedNotificationsDto>(
      `api/v1/me/notifications?page=${page}&limit=${limit}`,
      { method: 'GET', requiresAuth: true }
    );
  }

  async getUnreadNotificationCount(): Promise<{ unreadCount: number }> {
    return this.request<{ unreadCount: number }>('api/v1/me/notifications/unread-count', {
      method: 'GET',
      requiresAuth: true,
    });
  }

  async markNotificationAsRead(id: string): Promise<NotificationDto> {
    return this.request<NotificationDto>(`api/v1/me/notifications/${id}/read`, {
      method: 'PATCH',
      requiresAuth: true,
    });
  }

  async markAllNotificationsAsRead(): Promise<{ markedCount: number }> {
    return this.request<{ markedCount: number }>('api/v1/me/notifications/read-all', {
      method: 'PATCH',
      requiresAuth: true,
    });
  }

  async getNotificationPreferences(): Promise<NotificationPreferencesDto> {
    return this.request<NotificationPreferencesDto>('api/v1/me/notification-preferences', {
      method: 'GET',
      requiresAuth: true,
    });
  }

  async updateNotificationPreferences(
    dto: UpdateNotificationPreferencesDto
  ): Promise<NotificationPreferencesDto> {
    return this.request<NotificationPreferencesDto>('api/v1/me/notification-preferences', {
      method: 'PATCH',
      body: dto,
      requiresAuth: true,
    });
  }

  // ===========================================================================
  // 5. Authority Public & Assignment Endpoints
  // ===========================================================================

  async getPublicAssignment(reportId: string): Promise<PublicAssignmentViewDto> {
    return this.request<PublicAssignmentViewDto>(
      `api/v1/reports/${reportId}/assignments/public`,
      { method: 'GET' }
    );
  }

  async listDepartments(): Promise<DepartmentDto[]> {
    return this.request<DepartmentDto[]>('api/v1/authority/departments', {
      method: 'GET',
    });
  }

  async getMyAuthorityAssignments(): Promise<ReportAssignmentDto[]> {
    return this.request<ReportAssignmentDto[]>('api/v1/me/authority-assignments', {
      method: 'GET',
      requiresAuth: true,
    });
  }

  // ===========================================================================
  // 6. Public Representatives Directory & Accountability
  // ===========================================================================

  async listRepresentatives(params: {
    search?: string;
    officeType?: string;
    districtId?: string;
    termStatus?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    items: RepresentativeProfileDto[];
    meta: { page: number; limit: number; totalItems: number; totalPages: number };
  }> {
    const q = new URLSearchParams();
    if (params.search) q.append('search', params.search);
    if (params.officeType) q.append('officeType', params.officeType);
    if (params.districtId) q.append('districtId', params.districtId);
    if (params.termStatus) q.append('termStatus', params.termStatus);
    if (params.page) q.append('page', String(params.page));
    if (params.limit) q.append('limit', String(params.limit));

    const queryStr = q.toString() ? `?${q.toString()}` : '';
    return this.request<{
      items: RepresentativeProfileDto[];
      meta: { page: number; limit: number; totalItems: number; totalPages: number };
    }>(`api/v1/authority/representatives${queryStr}`, { method: 'GET' });
  }

  async getRepresentativeById(id: string): Promise<RepresentativeProfileDto> {
    return this.request<RepresentativeProfileDto>(`api/v1/authority/representatives/${id}`, {
      method: 'GET',
    });
  }

  async getRepresentativeAccountability(
    id: string
  ): Promise<RepresentativeAccountabilitySummaryDto> {
    return this.request<RepresentativeAccountabilitySummaryDto>(
      `api/v1/authority/representatives/${id}/accountability`,
      { method: 'GET' }
    );
  }

  async getRepresentativeReports(
    id: string,
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    items: Array<{
      id: string;
      reportId: string;
      relationshipType: string;
      matchingMethod: string;
      reportStatus: string;
      associatedAt: string;
    }>;
    meta: { page: number; limit: number; totalItems: number; totalPages: number };
  }> {
    const q = new URLSearchParams();
    if (status && status !== 'ALL') q.append('status', status);
    q.append('page', String(page));
    q.append('limit', String(limit));

    return this.request<any>(
      `api/v1/authority/representatives/${id}/reports?${q.toString()}`,
      { method: 'GET' }
    );
  }

  async getCoverageReport(): Promise<any> {
    return this.request<any>('api/v1/authority/representatives/coverage', {
      method: 'GET',
    });
  }

  async syncRepresentativeDirectory(): Promise<RepresentativeImportSummaryDto> {
    return this.request<RepresentativeImportSummaryDto>(
      'api/v1/authority/representatives/sync',
      { method: 'POST', requiresAuth: true }
    );
  }

  async submitProfileClaim(
    representativeId: string,
    dto: SubmitProfileClaimDto
  ): Promise<ProfileClaimRequestDto> {
    return this.request<ProfileClaimRequestDto>(
      `api/v1/authority/representatives/${representativeId}/claims`,
      {
        method: 'POST',
        body: dto,
        requiresAuth: true,
      }
    );
  }

  async updateRepresentativeProfile(
    representativeId: string,
    dto: { biography?: string; contactDetails?: any }
  ): Promise<RepresentativeProfileDto> {
    return this.request<RepresentativeProfileDto>(
      `api/v1/authority/representatives/${representativeId}`,
      {
        method: 'PATCH',
        body: dto,
        requiresAuth: true,
      }
    );
  }

  // ===========================================================================
  // 7. Before/After Resolution Evidence
  // ===========================================================================

  async getReportEvidence(reportId: string): Promise<ResolutionEvidenceDto[]> {
    return this.request<ResolutionEvidenceDto[]>(`api/v1/reports/${reportId}/evidence`, {
      method: 'GET',
    });
  }

  async submitResolutionEvidence(
    reportId: string,
    dto: SubmitResolutionEvidenceDto
  ): Promise<ResolutionEvidenceDto> {
    return this.request<ResolutionEvidenceDto>(`api/v1/reports/${reportId}/evidence`, {
      method: 'POST',
      body: dto,
      requiresAuth: true,
    });
  }

  async verifyResolutionEvidence(
    evidenceId: string,
    dto: VerifyResolutionEvidenceDto
  ): Promise<ResolutionEvidenceDto> {
    return this.request<ResolutionEvidenceDto>(
      `api/v1/authority/evidence/${evidenceId}/verify`,
      {
        method: 'POST',
        body: dto,
        requiresAuth: true,
      }
    );
  }
}

export const apiClient = new ApiClient();

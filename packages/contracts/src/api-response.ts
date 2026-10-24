/**
 * Standard Envelope for all CivicPulse REST API Responses
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  data: T | null;
  error: ApiErrorDetail | null;
  meta: ApiResponseMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: Record<string, unknown> | Array<unknown>;
}

export interface ApiResponseMeta {
  timestamp: string;
  correlationId: string;
  service: string;
  version: string;
}

/**
 * Standard Health Check Response Contract
 */
export interface ServiceHealthStatus {
  service: string;
  version: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  checks?: {
    database?: { status: 'up' | 'down'; message?: string };
    redis?: { status: 'up' | 'down'; message?: string };
    [key: string]: unknown;
  };
}

import { ServiceName } from '@civic-pulse/contracts';

export const GATEWAY_ROUTING = {
  service: ServiceName.API_GATEWAY,
  routes: [
    { prefix: '/api/v1/auth', targetService: ServiceName.IDENTITY },
    { prefix: '/api/v1/reports', targetService: ServiceName.REPORTS },
    { prefix: '/api/v1/community', targetService: ServiceName.COMMUNITY },
    { prefix: '/api/v1/authority', targetService: ServiceName.AUTHORITY },
    { prefix: '/api/v1/media', targetService: ServiceName.MEDIA },
    { prefix: '/api/v1/moderation', targetService: ServiceName.MODERATION },
  ],
};

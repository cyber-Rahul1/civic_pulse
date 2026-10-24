import { ServiceName, ReportStatus } from '@civic-pulse/contracts';

export const APP_CONFIG = {
  name: 'CivicPulse',
  version: '0.1.0',
  defaultTargetService: ServiceName.API_GATEWAY,
  defaultReportStatus: ReportStatus.SUBMITTED,
};

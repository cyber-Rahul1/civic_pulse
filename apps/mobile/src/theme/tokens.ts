/**
 * CivicPulse Mobile Design Tokens
 * 
 * Clean, trustworthy, accessible civic design system.
 * High contrast, legible typography, clear status semantic tokens.
 */

export const colors = {
  // Brand / Civic Identity
  primary: '#1E3A8A', // Deep Civic Blue
  primaryDark: '#172554',
  primaryLight: '#3B82F6',
  primaryMuted: '#EFF6FF',

  // Secondary / Accent
  secondary: '#0D9488', // Emerald Teal for civic action & verified authorities
  secondaryLight: '#CCFBF1',

  // Status & Priority Semantics
  statusSubmitted: '#64748B', // Slate
  statusUnderReview: '#D97706', // Amber
  statusInProgress: '#2563EB', // Blue
  statusResolved: '#16A34A', // Green
  statusRejected: '#DC2626', // Red
  statusReopened: '#9333EA', // Purple

  // Neutral scale
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  border: '#E2E8F0',
  borderSubtle: '#F1F5F9',
  
  // Text scale
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Feedback
  error: '#DC2626',
  errorBackground: '#FEF2F2',
  success: '#16A34A',
  successBackground: '#F0FDF4',
  warning: '#D97706',
  warningBackground: '#FFFBEB',
  info: '#2563EB',
  infoBackground: '#EFF6FF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  hero: 32,
};

export const typography = {
  fontFamily: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 18,
    normal: 22,
    relaxed: 26,
    title: 34,
  },
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  raised: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};

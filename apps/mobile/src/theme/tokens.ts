/**
 * CivicPulse Mobile Design Tokens
 * 
 * Modern Premium Light Theme · Professional Civic-Tech Product
 * Sourced: Warm-neutral backgrounds (#F6F7F9), crisp white surfaces (#FFFFFF),
 * clear typography, restrained primary (#3159C9) and secondary (#0F9B83) accents.
 */

export const colors = {
  // Brand / Civic Identity
  primary: '#3159C9',        // Confident, modern civic sapphire
  primaryDark: '#1D3B8A',    // Deep navy active/pressed
  primaryLight: '#4B73E6',   // Soft blue accent
  primaryMuted: '#EEF2F8',   // Light muted blue-tinted surface
  primarySubtle: '#F0F4FD',  // Ultra-light highlight

  // Secondary / Civic Action & Verified Authority
  secondary: '#0F9B83',      // Modern deep emerald/teal
  secondaryDark: '#0A7361',  // Pressed teal
  secondaryLight: '#E6F6F3', // Soft mint surface
  secondaryMuted: '#CCFBF1', // Subtle teal tag

  // Status & Urgency Semantics (Accessible contrast on light backgrounds)
  statusSubmitted: '#5B6B82',  // Neutral slate
  statusUnderReview: '#B7791F',// Warm amber/gold
  statusInProgress: '#2563EB', // Active civic blue
  statusResolved: '#16865B',   // Clear authoritative green
  statusRejected: '#C73E4D',   // Restrained crimson
  statusReopened: '#7C3AED',   // Purple

  // Neutral scale (Warm & Clean Light Theme)
  background: '#F6F7F9',       // Clean, warm light canvas
  cardBackground: '#FFFFFF',   // Crisp white primary surface
  surface: '#FFFFFF',          // Ergonomic surface alias
  surfaceElevated: '#FFFFFF',  // Floating card surface
  surfaceMuted: '#EEF2F8',     // Recessed background / filter chips
  border: '#E7EAF0',           // Delicate structural divider
  borderSubtle: '#F0F3F7',     // Ultra-light inner hairline
  borderFocus: '#3159C9',      // Input active border
  shadow: '#172033',           // Cohesive shadow base tint
  action: '#0F9B83',           // Teal civic action alias
  
  // Typography scale (High-contrast, readable, professional)
  textPrimary: '#172033',      // Rich dark slate
  textSecondary: '#667085',    // Balanced body / supporting text
  textMuted: '#94A3B8',        // Secondary captions & timestamps
  textPlaceholder: '#9AA4B2',  // Form placeholder
  textInverse: '#FFFFFF',      // White on dark buttons/badges
  
  // Feedback states
  error: '#C73E4D',
  errorBackground: '#FDF2F4',
  errorBorder: '#F9D2D7',
  success: '#16865B',
  successLight: '#F0FDF4',
  successBackground: '#F0FDF4',
  successBorder: '#BBF7D0',
  warning: '#B7791F',
  warningLight: '#FEF9EC',
  warningBackground: '#FEF9EC',
  warningBorder: '#FDE68A',
  info: '#3159C9',
  infoBackground: '#F0F4FD',
  infoBorder: '#BFDBFE',
};

export const spacing = {
  xxs: 2,
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
    xxs: 11,
    xs: 12,
    sm: 13,
    body: 14,
    md: 15,
    lg: 17,
    xl: 19,
    xxl: 22,
    title: 26,
    hero: 30,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  lineHeights: {
    tight: 16,
    caption: 18,
    body: 21,
    normal: 22,
    relaxed: 26,
    title: 32,
    hero: 36,
  },
};

export const radii = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  pill: 9999,
  full: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  card: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sm: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 6,
  },
  raised: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
};


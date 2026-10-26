import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReportStatus } from '@civic-pulse/contracts';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface StatusBadgeProps {
  status: ReportStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case ReportStatus.SUBMITTED:
        return {
          label: 'Submitted',
          bg: '#F1F5F9',
          color: colors.statusSubmitted,
        };
      case ReportStatus.UNDER_REVIEW:
        return {
          label: 'Under Review',
          bg: '#FEF3C7',
          color: colors.statusUnderReview,
        };
      case ReportStatus.IN_PROGRESS:
        return {
          label: 'In Progress',
          bg: '#DBEAFE',
          color: colors.statusInProgress,
        };
      case ReportStatus.RESOLVED:
        return {
          label: 'Resolved',
          bg: '#DCFCE7',
          color: colors.statusResolved,
        };
      case ReportStatus.REJECTED:
        return {
          label: 'Rejected',
          bg: '#FEE2E2',
          color: colors.statusRejected,
        };
      case ReportStatus.REOPENED:
        return {
          label: 'Reopened',
          bg: '#F3E8FF',
          color: colors.statusReopened,
        };
      default:
        return {
          label: status,
          bg: '#F1F5F9',
          color: colors.textSecondary,
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    textTransform: 'uppercase',
  },
});

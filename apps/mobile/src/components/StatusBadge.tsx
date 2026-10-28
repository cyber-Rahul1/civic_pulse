import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReportStatus } from '@civic-pulse/contracts';
import { radii, typography } from '../theme/tokens';

interface StatusBadgeProps {
  status: ReportStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case ReportStatus.SUBMITTED:
        return {
          label: 'SUBMITTED',
          bg: '#EAF0F8',
          border: '#D3DEEE',
          color: '#3A5478',
        };
      case ReportStatus.UNDER_REVIEW:
        return {
          label: 'UNDER REVIEW',
          bg: '#FEF8EA',
          border: '#FDE19E',
          color: '#B7791F',
        };
      case ReportStatus.IN_PROGRESS:
        return {
          label: 'IN PROGRESS',
          bg: '#EBF3FF',
          border: '#C0D9FD',
          color: '#2862D8',
        };
      case ReportStatus.RESOLVED:
        return {
          label: 'RESOLVED',
          bg: '#EDFAF2',
          border: '#B6E8CA',
          color: '#158455',
        };
      case ReportStatus.REJECTED:
        return {
          label: 'REJECTED',
          bg: '#FDF2F4',
          border: '#F9D2D7',
          color: '#C73E4D',
        };
      case ReportStatus.REOPENED:
        return {
          label: 'REOPENED',
          bg: '#F5F3FF',
          border: '#DDD6FE',
          color: '#7C3AED',
        };
      default:
        return {
          label: String(status).toUpperCase(),
          bg: '#F1F4F8',
          border: '#E2E8F0',
          color: '#55657E',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.4,
  },
});

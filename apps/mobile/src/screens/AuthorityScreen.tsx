import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { ReportAssignmentDto } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { EmptyState, ErrorState } from '../components/FeedbackStates';
import { SkeletonReportCard } from '../components/ShimmerSkeleton';
import { BackButton } from '../components/BackButton';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface AuthorityScreenProps {
  onBack: () => void;
  onSelectReport: (reportId: string) => void;
}

export const AuthorityScreen: React.FC<AuthorityScreenProps> = ({
  onBack,
  onSelectReport,
}) => {
  const [assignments, setAssignments] = useState<ReportAssignmentDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    try {
      setError(null);
      const data = await apiClient.getMyAuthorityAssignments();
      setAssignments(data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load authority assignments');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchAssignments();
  }, [fetchAssignments]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAssignments();
  };

  const renderAssignmentItem = ({ item }: { item: ReportAssignmentDto }) => {
    return (
      <TouchableOpacity
        style={styles.assignmentCard}
        onPress={() => onSelectReport(item.reportId)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.deptBadge}>
            {item.departmentName || 'Municipal Department'}
          </Text>
          <Text style={styles.statusBadge}>{item.status}</Text>
        </View>

        <Text style={styles.reportIdText}>Report ID: {item.reportId}</Text>
        {item.assignmentReason && (
          <Text style={styles.reasonText}>
            Reason: {item.assignmentReason}
          </Text>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.assignedDate}>
            Assigned: {new Date(item.assignedAt).toLocaleDateString()}
          </Text>
          <Text style={styles.viewLink}>View Report ➔</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackButton onPress={onBack} />
        <Text style={styles.navTitle}>Assigned Reports</Text>
        <View style={{ width: 68 }} />
      </View>

      <View style={styles.noticeBanner}>
        <Text style={styles.noticeIcon}>🏛️</Text>
        <View style={styles.noticeTextContainer}>
          <Text style={styles.noticeTitle}>
            Verified Authority Staff Portal
          </Text>
          <Text style={styles.noticeSubtitle}>
            Showing civic issues assigned to your department. Tap any report to inspect history and update progress.
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <SkeletonReportCard />
          <SkeletonReportCard />
          <SkeletonReportCard />
        </View>
      ) : error ? (
        <ErrorState
          title="Could not load assignments"
          description={error}
          onAction={fetchAssignments}
        />
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={(item) => item.id}
          renderItem={renderAssignmentItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <EmptyState
              title="No reports assigned"
              description="There are currently no active civic reports assigned to your department."
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  navTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#D4E2FC',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  noticeSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.hero,
  },
  assignmentCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  deptBadge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  statusBadge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.action,
    backgroundColor: '#EDFDF5',
    borderWidth: 1,
    borderColor: '#B9F1D4',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  reportIdText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  reasonText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xs,
    marginTop: spacing.xs,
  },
  assignedDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  viewLink: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  skeletonContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});

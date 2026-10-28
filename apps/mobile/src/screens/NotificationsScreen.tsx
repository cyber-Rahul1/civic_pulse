import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { NotificationDto } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { EmptyState, ErrorState } from '../components/FeedbackStates';
import { SkeletonNotificationRow, ShimmerSkeleton } from '../components/ShimmerSkeleton';
import { BackButton } from '../components/BackButton';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface NotificationsScreenProps {
  onBack: () => void;
  onNavigateDeepLink: (deepLink: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onNavigateDeepLink,
}) => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationError, setPaginationError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) {
        setError(null);
      }
      setPaginationError(null);
      const targetPage = isInitial ? 1 : page + 1;
      const res = await apiClient.getNotifications(targetPage, 20);
      const newItems = res?.items || [];
      const hasNext = res?.hasMore ?? (newItems.length === 20);

      if (isInitial) {
        setNotifications(newItems);
        setPage(1);
        setHasMore(hasNext);
        setUnreadCount(res?.unreadCount || 0);
      } else {
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const filtered = newItems.filter((n) => !existingIds.has(n.id));
          return [...prev, ...filtered];
        });
        setPage(targetPage);
        setHasMore(hasNext);
      }
    } catch (err: any) {
      if (isInitial) {
        setError(err?.message || 'Failed to load notifications');
      } else {
        setPaginationError(err?.message || 'Failed to load more updates. Tap to retry.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsFetchingMore(false);
    }
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setHasMore(true);
    fetchNotifications(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchNotifications(true);
  };

  const handleLoadMore = () => {
    if (isLoading || isRefreshing || isFetchingMore || !hasMore) {
      return;
    }
    setIsFetchingMore(true);
    fetchNotifications(false);
  };

  const handleMarkOneRead = async (item: NotificationDto) => {
    if (item.isRead) {
      if (item.deepLink) onNavigateDeepLink(item.deepLink);
      return;
    }

    try {
      await apiClient.markNotificationAsRead(item.id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
      // ignore
    }

    if (item.deepLink) {
      onNavigateDeepLink(item.deepLink);
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0 || isMarkingAll) return;
    setIsMarkingAll(true);
    try {
      await apiClient.markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // ignore
    } finally {
      setIsMarkingAll(false);
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationDto }) => {
    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.notificationCardUnread,
        ]}
        onPress={() => handleMarkOneRead(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationMessage}>{item.message}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.timestampText}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
          {item.deepLink && (
            <Text style={styles.viewActionText}>View Details ➔</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {/* Navigation & Header */}
      <View style={styles.navBar}>
        <BackButton onPress={onBack} />
        <Text style={styles.navTitle}>Notifications</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity onPress={handleMarkAllRead} disabled={isMarkingAll}>
            <Text style={styles.markAllText}>
              {isMarkingAll ? 'Marking...' : 'Mark all read'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <SkeletonNotificationRow />
          <SkeletonNotificationRow />
          <SkeletonNotificationRow />
          <SkeletonNotificationRow />
          <SkeletonNotificationRow />
        </View>
      ) : error ? (
        <ErrorState
          title="Could not load notifications"
          description={error}
          onAction={fetchNotifications}
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.footerLoader}>
                <ShimmerSkeleton width="80%" height={16} borderRadius={radii.xs} />
              </View>
            ) : paginationError ? (
              <TouchableOpacity
                style={styles.footerRetryButton}
                onPress={() => {
                  setIsFetchingMore(true);
                  fetchNotifications(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.footerRetryText}>⚠️ {paginationError}</Text>
              </TouchableOpacity>
            ) : !hasMore && notifications.length > 0 ? (
              <View style={styles.endOfFeedContainer}>
                <Text style={styles.endOfFeedText}>✓ You're all caught up</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              title="No notifications yet"
              description="You will be notified when your reported issues are reviewed, resolved, or commented on."
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
  markAllText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.hero,
  },
  notificationCard: {
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
  notificationCardUnread: {
    backgroundColor: colors.primaryLight,
    borderColor: '#D4E2FC',
    borderLeftWidth: 3.5,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  viewActionText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  footerLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  footerLoaderText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footerRetryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    backgroundColor: colors.warningBackground,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.warningBorder,
  },
  footerRetryText: {
    fontSize: typography.sizes.sm,
    color: colors.warning,
    fontWeight: '600',
  },
  endOfFeedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  endOfFeedText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
});

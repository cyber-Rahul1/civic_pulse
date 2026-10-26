import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ReportDto, ReportCategory, ReportStatus } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { useAuth } from '../context/auth-context';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { EmptyState, ErrorState } from '../components/FeedbackStates';
import { CommunityMap } from '../components/CommunityMap';
import { MapRegion } from '../utils/map-utils';
import { colors, radii, shadows, spacing, typography } from '../theme/tokens';

interface HomeScreenProps {
  onSelectReport: (reportId: string) => void;
  onCreateReport: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAuthorityWorkflows?: () => void;
  activeTab?: 'feed' | 'map';
  onTabChange?: (tab: 'feed' | 'map') => void;
  savedMapRegion?: MapRegion | null;
  onMapRegionChange?: (region: MapRegion) => void;
  savedCategory?: ReportCategory;
  onCategoryChange?: (category?: ReportCategory) => void;
  savedStatus?: ReportStatus;
  onStatusChange?: (status?: ReportStatus) => void;
  onNavigateToLocation?: (reportId: string, coordinates: [number, number]) => void;
  focusReportId?: string | null;
  refreshTrigger?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectReport,
  onCreateReport,
  onOpenNotifications,
  onOpenProfile,
  onOpenAuthorityWorkflows,
  activeTab: controlledTab,
  onTabChange,
  savedMapRegion,
  onMapRegionChange,
  savedCategory,
  onCategoryChange,
  savedStatus,
  onStatusChange,
  onNavigateToLocation,
  focusReportId,
  refreshTrigger,
}) => {
  const { user, isAuthority } = useAuth();
  const [internalTab, setInternalTab] = useState<'feed' | 'map'>('feed');
  const activeTab = controlledTab || internalTab;

  const handleSelectTab = (tab: 'feed' | 'map') => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const [reports, setReports] = useState<ReportDto[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [internalCategory, setInternalCategory] = useState<ReportCategory | undefined>(undefined);
  const [internalStatus, setInternalStatus] = useState<ReportStatus | undefined>(undefined);

  const selectedCategory = savedCategory !== undefined ? savedCategory : internalCategory;
  const selectedStatus = savedStatus !== undefined ? savedStatus : internalStatus;

  const handleSelectCategory = (cat?: ReportCategory) => {
    setInternalCategory(cat);
    onCategoryChange?.(cat);
  };

  const handleSelectStatus = (stat?: ReportStatus) => {
    setInternalStatus(stat);
    onStatusChange?.(stat);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationError, setPaginationError] = useState<string | null>(null);

  const fetchHomeData = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) {
        setError(null);
      }
      setPaginationError(null);
      const targetPage = isInitial ? 1 : page + 1;
      const [reportsData, unreadRes] = await Promise.all([
        apiClient.listReports({
          category: selectedCategory,
          status: selectedStatus,
          page: targetPage,
          limit: 15,
        }),
        isInitial
          ? apiClient.getUnreadNotificationCount().catch(() => ({ unreadCount: 0 }))
          : Promise.resolve(null),
      ]);

      const newItems = reportsData?.items || [];
      const totalPages = (reportsData as any)?.meta?.totalPages || reportsData?.totalPages || 1;

      if (isInitial) {
        setReports(newItems);
        setPage(1);
        setHasMore(targetPage < totalPages && newItems.length > 0);
        if (unreadRes) {
          setUnreadNotifications(unreadRes.unreadCount || 0);
        }
      } else {
        setReports((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const filtered = newItems.filter((r) => !existingIds.has(r.id));
          return [...prev, ...filtered];
        });
        setPage(targetPage);
        setHasMore(targetPage < totalPages && newItems.length > 0);
      }
    } catch (err: any) {
      if (isInitial) {
        setError(err?.message || 'Failed to load community reports');
      } else {
        setPaginationError(err?.message || 'Failed to load more reports. Tap to retry.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsFetchingMore(false);
    }
  }, [selectedCategory, selectedStatus, page]);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setHasMore(true);
    fetchHomeData(true);
  }, [selectedCategory, selectedStatus, refreshTrigger]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchHomeData(true);
  };

  const handleLoadMore = () => {
    if (isLoading || isRefreshing || isFetchingMore || !hasMore) {
      return;
    }
    setIsFetchingMore(true);
    fetchHomeData(false);
  };

  const categories: Array<{ label: string; value: ReportCategory | undefined }> = [
    { label: 'All Categories', value: undefined },
    { label: 'Pothole', value: ReportCategory.POTHOLE },
    { label: 'Streetlight', value: ReportCategory.STREETLIGHT },
    { label: 'Garbage', value: ReportCategory.GARBAGE },
    { label: 'Water', value: ReportCategory.WATER },
    { label: 'Drainage', value: ReportCategory.DRAINAGE },
    { label: 'Safety', value: ReportCategory.PUBLIC_SAFETY },
  ];

  const statuses: Array<{ label: string; value: ReportStatus | undefined }> = [
    { label: 'All Statuses', value: undefined },
    { label: 'Submitted', value: ReportStatus.SUBMITTED },
    { label: 'Under Review', value: ReportStatus.UNDER_REVIEW },
    { label: 'In Progress', value: ReportStatus.IN_PROGRESS },
    { label: 'Resolved', value: ReportStatus.RESOLVED },
  ];

  const renderReportItem = ({ item }: { item: ReportDto }) => {
    const primaryMedia = item.media && item.media.length > 0 ? item.media[0] : null;
    const thumbnailUri = primaryMedia ? primaryMedia.secureUrl || primaryMedia.url : null;

    return (
      <TouchableOpacity
        style={styles.reportCard}
        onPress={() => onSelectReport(item.id)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Report: ${item.title}`}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <StatusBadge status={item.status} />
        </View>

        <View style={styles.cardBodyRow}>
          <View style={styles.cardTextContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          {thumbnailUri && (
            <Image
              source={{ uri: thumbnailUri }}
              style={styles.cardThumbnail}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.cardLocationButton}
            onPress={(e) => {
              e.stopPropagation();
              if (item.location?.coordinates) {
                if (onNavigateToLocation) {
                  onNavigateToLocation(item.id, item.location.coordinates);
                } else {
                  handleSelectTab('map');
                }
              }
            }}
            activeOpacity={item.location?.coordinates ? 0.7 : 1}
            accessibilityRole={item.location?.coordinates ? 'button' : undefined}
            accessibilityLabel={`Location: ${item.locationDescription || 'Public Jurisdiction'}`}
          >
            <Text style={[styles.cardLocation, item.location?.coordinates && styles.cardLocationInteractive]} numberOfLines={1}>
              📍 {item.locationDescription || 'Public Jurisdiction'}
              {item.location?.coordinates && ' (View on Map)'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.cardDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* App Bar / Header */}
      <View style={styles.appBar}>
        <View>
          <Text style={styles.greeting}>CivicPulse</Text>
          <Text style={styles.userGreeting}>
            Hello, {user?.displayName || 'Resident'}
          </Text>
        </View>

        <View style={styles.appBarActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onOpenNotifications}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Text style={styles.iconButtonText}>🔔</Text>
            {unreadNotifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarButton}
            onPress={onOpenProfile}
            accessibilityRole="button"
            accessibilityLabel="Profile & Settings"
          >
            <Text style={styles.avatarText}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Authority Staff Quick Action Banner (if user holds authority role) */}
      {isAuthority && onOpenAuthorityWorkflows && (
        <TouchableOpacity
          style={styles.authorityBanner}
          onPress={onOpenAuthorityWorkflows}
        >
          <Text style={styles.authorityBannerIcon}>🏛️</Text>
          <View style={styles.authorityBannerContent}>
            <Text style={styles.authorityBannerTitle}>Municipal Authority Staff</Text>
            <Text style={styles.authorityBannerSubtitle}>
              Tap to view and manage assigned civic reports
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Segmented View Switcher: Feed vs Map */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentWrapper}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'feed' && styles.segmentTabActive,
            ]}
            onPress={() => handleSelectTab('feed')}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'feed' }}
            accessibilityLabel="Feed view"
          >
            <Text
              style={[
                styles.segmentTabText,
                activeTab === 'feed' && styles.segmentTabTextActive,
              ]}
            >
              📋 Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'map' && styles.segmentTabActive,
            ]}
            onPress={() => handleSelectTab('map')}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'map' }}
            accessibilityLabel="Map view"
          >
            <Text
              style={[
                styles.segmentTabText,
                activeTab === 'map' && styles.segmentTabTextActive,
              ]}
            >
              🗺️ Community Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters: Category & Status */}
      <View style={styles.filterSection}>
        {/* Category Carousel */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.value;
            return (
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                onPress={() => handleSelectCategory(item.value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Status Carousel */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={statuses}
          keyExtractor={(item) => item.label}
          contentContainerStyle={[styles.filterList, styles.statusFilterList]}
          renderItem={({ item }) => {
            const isSelected = selectedStatus === item.value;
            return (
              <TouchableOpacity
                style={[
                  styles.statusChip,
                  isSelected && styles.statusChipSelected,
                ]}
                onPress={() => handleSelectStatus(item.value)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    isSelected && styles.statusChipTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Main View: Map or Feed */}
      {activeTab === 'map' ? (
        <View style={styles.mapViewWrapper}>
          <CommunityMap
            initialReports={reports}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onSelectReport={onSelectReport}
            savedRegion={savedMapRegion}
            onRegionChangeComplete={onMapRegionChange}
            focusReportId={focusReportId}
          />
          {/* Floating Report An Issue Button in Map View */}
          <TouchableOpacity
            style={styles.floatingReportButton}
            onPress={onCreateReport}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Report an Issue"
          >
            <Text style={styles.floatingReportButtonText}>📢 Report an Issue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.feedWrapper}>
          {/* Prominent Report An Issue Action in Feed View */}
          <View style={styles.reportActionContainer}>
            <Button
              title="📢 Report an Issue"
              onPress={onCreateReport}
              size="lg"
              style={styles.reportActionButton}
            />
          </View>

          {/* Reports Feed */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading civic reports...</Text>
            </View>
          ) : error ? (
            <ErrorState
              title="Could not load reports"
              description={error}
              onAction={fetchHomeData}
            />
          ) : (
            <FlatList
              data={reports}
              keyExtractor={(item) => item.id}
              renderItem={renderReportItem}
              contentContainerStyle={styles.feedContent}
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
              ListFooterComponent={
                isFetchingMore ? (
                  <View style={styles.footerLoader}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={styles.footerLoaderText}>Loading more reports...</Text>
                  </View>
                ) : paginationError ? (
                  <TouchableOpacity
                    style={styles.footerRetryButton}
                    onPress={() => {
                      setIsFetchingMore(true);
                      fetchHomeData(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.footerRetryText}>⚠️ {paginationError}</Text>
                  </TouchableOpacity>
                ) : !hasMore && reports.length > 0 ? (
                  <View style={styles.endOfFeedContainer}>
                    <Text style={styles.endOfFeedText}>✓ You're all caught up on civic reports</Text>
                  </View>
                ) : null
              }
              ListEmptyComponent={
                <EmptyState
                  title="No civic reports yet"
                  description="Be the first to voice an issue in your community and track its resolution."
                  actionTitle="Report an Issue"
                  onAction={onCreateReport}
                />
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  userGreeting: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    position: 'relative',
  },
  iconButtonText: {
    fontSize: 18,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: typography.weights.bold,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textInverse,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  authorityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  authorityBannerIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  authorityBannerContent: {
    flex: 1,
  },
  authorityBannerTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
  },
  authorityBannerSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  reportActionContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  reportActionButton: {
    backgroundColor: colors.secondary,
  },
  // Segmented Control (Feed vs Map)
  segmentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.cardBackground,
  },
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.borderSubtle,
    borderRadius: radii.md,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  segmentTabActive: {
    backgroundColor: colors.cardBackground,
    ...shadows.sm,
  },
  segmentTabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  segmentTabTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  // Filter Section
  filterSection: {
    backgroundColor: colors.cardBackground,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  statusFilterList: {
    paddingTop: 2,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.borderSubtle,
    marginRight: spacing.sm,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  filterChipTextSelected: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  statusChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs,
  },
  statusChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  statusChipText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  statusChipTextSelected: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  // Layout wrappers
  mapViewWrapper: {
    flex: 1,
    position: 'relative',
  },
  feedWrapper: {
    flex: 1,
  },
  floatingReportButton: {
    position: 'absolute',
    top: 14,
    right: spacing.md,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    ...shadows.md,
  },
  floatingReportButtonText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  categoryFilterContainer: {
    marginVertical: spacing.xs,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  categoryChipTextSelected: {
    color: colors.textInverse,
    fontWeight: typography.weights.semibold,
  },
  feedContent: {
    padding: spacing.lg,
    paddingBottom: spacing.hero,
  },
  reportCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardCategory: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primaryLight,
  },
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardBodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  cardTextContent: {
    flex: 1,
  },
  cardThumbnail: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.borderSubtle,
  },
  cardDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.sm,
  },
  cardLocationButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cardLocation: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  cardLocationInteractive: {
    color: colors.primary,
    fontWeight: '600',
  },
  cardDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
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
    backgroundColor: '#FFFBEB',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  footerRetryText: {
    fontSize: typography.sizes.sm,
    color: '#B45309',
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

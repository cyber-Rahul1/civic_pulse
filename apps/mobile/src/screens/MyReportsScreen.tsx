import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import { ReportDto, ReportCategory, ReportStatus } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { useAuth } from '../context/auth-context';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState, ErrorState } from '../components/FeedbackStates';
import { SkeletonReportCard, ShimmerSkeleton } from '../components/ShimmerSkeleton';
import { Input } from '../components/Input';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface MyReportsScreenProps {
  onBack: () => void;
  onSelectReport: (reportId: string) => void;
  onCreateReport: () => void;
  onNavigateToLocation?: (reportId: string, coordinates: [number, number]) => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  onBack,
  onSelectReport,
  onCreateReport,
  onNavigateToLocation,
}) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationError, setPaginationError] = useState<string | null>(null);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const fetchMyReports = useCallback(
    async (isInitial = true) => {
      try {
        if (isInitial) {
          setError(null);
        }
        setPaginationError(null);
        const targetPage = isInitial ? 1 : page + 1;

        // Fetch reports (user submitted reports)
        const reportsData = await apiClient.listReports({
          category: selectedCategory,
          status: selectedStatus,
          page: targetPage,
          limit: 15,
        });

        const allItems = reportsData?.items || [];
        const totalPages =
          (reportsData as any)?.meta?.totalPages || reportsData?.totalPages || 1;

        // Filter items where authorId matches current user's id
        const userItems = user?.id
          ? allItems.filter((r: any) => r.authorId === user.id || r.author?.id === user.id)
          : allItems;

        if (isInitial) {
          setReports(userItems);
          setPage(1);
          setHasMore(targetPage < totalPages && allItems.length > 0);
        } else {
          setReports((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const filtered = userItems.filter((r) => !existingIds.has(r.id));
            return [...prev, ...filtered];
          });
          setPage(targetPage);
          setHasMore(targetPage < totalPages && allItems.length > 0);
        }
      } catch (err: any) {
        if (isInitial) {
          setError(err?.message || 'Failed to load your submitted reports');
        } else {
          setPaginationError(err?.message || 'Failed to load more reports. Tap to retry.');
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        setIsFetchingMore(false);
      }
    },
    [selectedCategory, selectedStatus, page, user?.id]
  );

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setHasMore(true);
    fetchMyReports(true);
  }, [selectedCategory, selectedStatus]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchMyReports(true);
  };

  const handleLoadMore = () => {
    if (isLoading || isRefreshing || isFetchingMore || !hasMore) {
      return;
    }
    setIsFetchingMore(true);
    fetchMyReports(false);
  };

  const statuses: Array<{ label: string; value: ReportStatus | undefined }> = [
    { label: 'All', value: undefined },
    { label: 'Submitted', value: ReportStatus.SUBMITTED },
    { label: 'Under Review', value: ReportStatus.UNDER_REVIEW },
    { label: 'In Progress', value: ReportStatus.IN_PROGRESS },
    { label: 'Resolved', value: ReportStatus.RESOLVED },
  ];

  const categories: Array<{ label: string; value: ReportCategory | undefined; icon: string }> = [
    { label: 'Garbage', value: ReportCategory.GARBAGE, icon: '🗑️' },
    { label: 'Streetlight', value: ReportCategory.STREETLIGHT, icon: '💡' },
    { label: 'Water', value: ReportCategory.WATER, icon: '🚰' },
    { label: 'Drainage', value: ReportCategory.DRAINAGE, icon: '🌊' },
    { label: 'Pothole', value: ReportCategory.POTHOLE, icon: '🕳️' },
    { label: 'Safety', value: ReportCategory.PUBLIC_SAFETY, icon: '🛡️' },
  ];

  const getCategoryTheme = (cat: string) => {
    switch (String(cat).toUpperCase()) {
      case 'GARBAGE':
        return {
          textColor: '#2563EB',
          iconColor: '#2563EB',
          bgColor: '#EFF6FF',
          borderColor: '#BFDBFE',
          icon: '🗑️',
        };
      case 'DRAINAGE':
        return {
          textColor: '#0D9488',
          iconColor: '#0D9488',
          bgColor: '#F0FDFA',
          borderColor: '#99F6E4',
          icon: '🌊',
        };
      case 'STREETLIGHT':
        return {
          textColor: '#D97706',
          iconColor: '#059669',
          bgColor: '#ECFDF5',
          borderColor: '#A7F3D0',
          icon: '💡',
        };
      case 'WATER':
        return {
          textColor: '#2563EB',
          iconColor: '#2563EB',
          bgColor: '#EFF6FF',
          borderColor: '#BFDBFE',
          icon: '🚰',
        };
      case 'POTHOLE':
        return {
          textColor: '#B45309',
          iconColor: '#B45309',
          bgColor: '#FEF3C7',
          borderColor: '#FCD34D',
          icon: '🕳️',
        };
      default:
        return {
          textColor: '#334155',
          iconColor: '#334155',
          bgColor: '#F1F5F9',
          borderColor: '#CBD5E1',
          icon: '📋',
        };
    }
  };

  const formatReportDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const now = new Date();
      const isRecent = now.getTime() - d.getTime() < 7 * 24 * 3600 * 1000;
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      const day = d.getDate();
      if (isRecent) {
        const time = d.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return `${month} ${day} • ${time}`;
      } else {
        const year = d.getFullYear();
        return `${month} ${day}, ${year}`;
      }
    } catch {
      return 'Recent';
    }
  };

  const query = debouncedSearch.trim().toLowerCase();
  const displayedReports = query
    ? reports.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          (r.description && r.description.toLowerCase().includes(query)) ||
          (r.locationDescription && r.locationDescription.toLowerCase().includes(query))
      )
    : reports;

  const renderReportItem = ({ item }: { item: ReportDto }) => {
    const primaryMedia = item.media && item.media.length > 0 ? item.media[0] : null;
    const thumbnailUri = primaryMedia ? primaryMedia.secureUrl || primaryMedia.url : null;
    const catTheme = getCategoryTheme(item.category);

    return (
      <TouchableOpacity
        style={styles.reportCard}
        onPress={() => onSelectReport(item.id)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`Report: ${item.title}`}
      >
        {/* Top Row: Category Label & Status Badge */}
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardCategoryLabel, { color: catTheme.textColor }]}>
            {String(item.category).toUpperCase()}
          </Text>
          <StatusBadge status={item.status} />
        </View>

        {/* Middle Content Row: Title + Description + Rounded Icon Tile */}
        <View style={styles.cardMainContent}>
          <View style={styles.cardTextContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            {item.description ? (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}
          </View>

          {thumbnailUri ? (
            <Image
              source={{ uri: thumbnailUri }}
              style={styles.cardThumbnail}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.cardCategoryTile,
                { backgroundColor: catTheme.bgColor, borderColor: catTheme.borderColor },
              ]}
            >
              <Text style={styles.cardCategoryTileIcon}>{catTheme.icon}</Text>
            </View>
          )}
        </View>

        {/* Footer Row: Red Pin Location + Date */}
        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.cardLocationButton}
            onPress={(e) => {
              e.stopPropagation();
              if (item.location?.coordinates && onNavigateToLocation) {
                onNavigateToLocation(item.id, item.location.coordinates);
              }
            }}
            activeOpacity={item.location?.coordinates ? 0.7 : 1}
            accessibilityRole={item.location?.coordinates ? 'button' : undefined}
            accessibilityLabel={`Location: ${item.locationDescription || 'Andhra Pradesh'}`}
          >
            <View style={styles.cardLocationRow}>
              <Text style={styles.cardPinIcon}>📍</Text>
              <Text style={styles.cardLocationText} numberOfLines={1}>
                {item.locationDescription || 'Andhra Pradesh'}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.cardDate}>{formatReportDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>My Reports</Text>
        <TouchableOpacity
          onPress={onCreateReport}
          style={styles.newReportButton}
          activeOpacity={0.8}
        >
          <Text style={styles.newReportButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Subheader summary */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryTextWrap}>
          <Text style={styles.summaryTitle}>Reports Submitted by You</Text>
          <Text style={styles.summarySubtitle}>
            Track real-time progress and resolutions for your civic issues
          </Text>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>
            {displayedReports.length} {displayedReports.length === 1 ? 'report' : 'reports'}
          </Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search your reports..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onDebouncedChange={(val) => setDebouncedSearch(val)}
          debounceDelay={250}
          containerStyle={styles.searchInputContainer}
          style={styles.searchCustomInput}
          leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          rightElement={
            searchQuery.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setDebouncedSearch('');
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.clearSearchText}>✕</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>

      {/* Status Filter Chips */}
      <View style={styles.statusRow}>
        {statuses.map((item) => {
          const isSelected = selectedStatus === item.value;
          if (isSelected) {
            return (
              <TouchableOpacity
                key={item.label}
                style={styles.statusSelectedButton}
                onPress={() => setSelectedStatus(undefined)}
                activeOpacity={0.8}
              >
                <Text style={styles.statusSelectedButtonText}>{item.label}</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={item.label}
              style={styles.statusNormalButton}
              onPress={() => setSelectedStatus(item.value)}
              activeOpacity={0.7}
            >
              <Text style={styles.statusNormalText}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Category Pills */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.value;
            return (
              <TouchableOpacity
                style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
                onPress={() => setSelectedCategory(isSelected ? undefined : item.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.categoryPillIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryPillText,
                    isSelected && styles.categoryPillTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Main List */}
      <View style={styles.listWrapper}>
        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <SkeletonReportCard />
            <SkeletonReportCard />
            <SkeletonReportCard />
          </View>
        ) : error ? (
          <ErrorState
            title="Could not load your reports"
            description={error}
            onAction={() => fetchMyReports(true)}
          />
        ) : (
          <FlatList
            data={displayedReports}
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
                  <ShimmerSkeleton width="90%" height={20} borderRadius={radii.xs} />
                </View>
              ) : paginationError ? (
                <TouchableOpacity
                  style={styles.footerRetryButton}
                  onPress={() => {
                    setIsFetchingMore(true);
                    fetchMyReports(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.footerRetryText}>⚠️ {paginationError}</Text>
                </TouchableOpacity>
              ) : !hasMore && displayedReports.length > 0 ? (
                <View style={styles.endOfFeedContainer}>
                  <Text style={styles.endOfFeedText}>✓ All submitted reports loaded</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <EmptyState
                title={query ? 'No matching reports' : 'No submitted reports yet'}
                description={
                  query
                    ? `No reports matched "${query}". Try adjusting your filters.`
                    : 'You haven’t submitted any civic issue reports yet. Tap below to report an issue.'
                }
                actionTitle="Report a Civic Issue"
                onAction={onCreateReport}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  newReportButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newReportButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  summaryTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  summarySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  countPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  countPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  searchCustomInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    fontSize: 14,
    color: '#0F172A',
  },
  searchIcon: {
    fontSize: 14,
    color: '#64748B',
  },
  clearSearchText: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: 6,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  statusNormalButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusNormalText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  statusSelectedButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  statusSelectedButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  categoryPillSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  categoryPillIcon: {
    fontSize: 13,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryPillTextSelected: {
    color: '#2563EB',
    fontWeight: '700',
  },
  listWrapper: {
    flex: 1,
  },
  feedContent: {
    padding: 16,
    paddingBottom: 32,
  },
  skeletonContainer: {
    padding: 16,
    gap: 12,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardCategoryLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  cardMainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  cardThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  cardCategoryTile: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCategoryTileIcon: {
    fontSize: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cardLocationButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPinIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  cardLocationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  cardDate: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  footerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  footerRetryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    backgroundColor: colors.warningBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.warningBorder,
  },
  footerRetryText: {
    fontSize: typography.sizes.sm,
    color: colors.warning,
    fontWeight: typography.weights.semibold,
  },
  endOfFeedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  endOfFeedText: {
    fontSize: typography.sizes.xs,
    color: '#475569',
    fontWeight: typography.weights.medium,
  },
});

import React, { useEffect, useState, useCallback } from 'react';
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
import { CommunityMap } from '../components/CommunityMap';
import { SkeletonReportCard, ShimmerSkeleton } from '../components/ShimmerSkeleton';
import { Input } from '../components/Input';
import { MapRegion } from '../utils/map-utils';
import { colors, radii, shadows, spacing, typography } from '../theme/tokens';

interface HomeScreenProps {
  onSelectReport: (reportId: string) => void;
  onCreateReport: () => void;
  onOpenMyReports?: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAuthorityWorkflows?: () => void;
  onOpenRepresentatives?: () => void;
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
  onOpenMyReports,
  onOpenNotifications,
  onOpenProfile,
  onOpenAuthorityWorkflows,
  onOpenRepresentatives,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
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

  const categories: Array<{ label: string; value: ReportCategory | undefined; icon: string }> = [
    { label: 'Garbage', value: ReportCategory.GARBAGE, icon: '🗑️' },
    { label: 'Streetlight', value: ReportCategory.STREETLIGHT, icon: '💡' },
    { label: 'Water', value: ReportCategory.WATER, icon: '🚰' },
    { label: 'Drainage', value: ReportCategory.DRAINAGE, icon: '🌊' },
    { label: 'Pothole', value: ReportCategory.POTHOLE, icon: '🕳️' },
    { label: 'Safety', value: ReportCategory.PUBLIC_SAFETY, icon: '🛡️' },
  ];

  const statuses: Array<{ label: string; value: ReportStatus | undefined }> = [
    { label: 'All', value: undefined },
    { label: 'Submitted', value: ReportStatus.SUBMITTED },
    { label: 'Under Review', value: ReportStatus.UNDER_REVIEW },
    { label: 'In Progress', value: ReportStatus.IN_PROGRESS },
    { label: 'Resolved', value: ReportStatus.RESOLVED },
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
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${month} ${day} • ${time}`;
      } else {
        const year = d.getFullYear();
        return `${month} ${day}, ${year}`;
      }
    } catch {
      return 'Recent';
    }
  };

  // Filter reports by debounced search query
  const query = debouncedSearch.trim().toLowerCase();
  const displayedReports = query
    ? reports.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          (r.description && r.description.toLowerCase().includes(query)) ||
          (r.locationDescription && r.locationDescription.toLowerCase().includes(query)),
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
              <Text style={styles.cardCategoryTileIcon}>
                {catTheme.icon}
              </Text>
            </View>
          )}
        </View>

        {/* Footer Row: Red Pin Location + Date */}
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
            accessibilityLabel={`Location: ${item.locationDescription || 'Andhra Pradesh'}`}
          >
            <View style={styles.cardLocationRow}>
              <Text style={styles.cardPinIcon}>📍</Text>
              <Text style={styles.cardLocationText} numberOfLines={1}>
                {item.locationDescription || 'Andhra Pradesh'}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.cardDate}>
            {formatReportDate(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.appBar}>
        <View style={styles.brandContainer}>
          <View style={styles.brandTitleRow}>
            <Text style={styles.brandTitle}>CivicPulse</Text>
            <View style={styles.brandDot} />
            <View style={styles.stateBadge}>
              <Text style={styles.stateBadgeText}>AP OFFICIAL</Text>
            </View>
          </View>
          <Text style={styles.brandSubtitle}>
            Andhra Pradesh Citizen Voice &{'\n'}Accountability
          </Text>
        </View>

        <View style={styles.appBarActions}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={onOpenRepresentatives}
            accessibilityRole="button"
            accessibilityLabel="Public Representatives Directory"
          >
            <Text style={styles.actionIconText}>🏛️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={onOpenNotifications}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Text style={styles.actionIconText}>🔔</Text>
            {unreadNotifications > 0 && (
              <View style={styles.notificationDot} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={user ? styles.avatarButton : styles.guestAvatarButton}
            onPress={onOpenProfile}
            accessibilityRole="button"
            accessibilityLabel={user ? "Profile & Settings" : "Sign In or Register"}
          >
            {user ? (
              <Text style={styles.avatarText}>
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </Text>
            ) : (
              <Text style={styles.guestAvatarText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Authority Staff Quick Action Banner (if user holds authority role) */}
      {isAuthority && onOpenAuthorityWorkflows && (
        <TouchableOpacity
          style={styles.authorityBanner}
          onPress={onOpenAuthorityWorkflows}
          activeOpacity={0.85}
        >
          <Text style={styles.authorityBannerIcon}>🏛️</Text>
          <View style={styles.authorityBannerContent}>
            <Text style={styles.authorityBannerTitle}>Municipal Authority Staff</Text>
            <Text style={styles.authorityBannerSubtitle}>
              Tap to view and manage assigned civic reports
            </Text>
          </View>
          <Text style={styles.authorityBannerArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* High-Contrast Search Bar */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search reports, locations or issues..."
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

      {/* Segmented View Switcher: Reports Feed vs Community Map */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentWrapper}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'feed' && styles.segmentTabActive,
            ]}
            onPress={() => handleSelectTab('feed')}
            activeOpacity={0.85}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'feed' }}
            accessibilityLabel="Feed view"
          >
            <View style={styles.segmentTabInner}>
              <Text style={styles.segmentTabIcon}>📋</Text>
              <Text
                style={[
                  styles.segmentTabText,
                  activeTab === 'feed' && styles.segmentTabTextActive,
                ]}
              >
                Reports Feed
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'map' && styles.segmentTabActive,
            ]}
            onPress={() => handleSelectTab('map')}
            activeOpacity={0.85}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'map' }}
            accessibilityLabel="Map view"
          >
            <View style={styles.segmentTabInner}>
              <Text style={styles.segmentTabIcon}>🗺️</Text>
              <Text
                style={[
                  styles.segmentTabText,
                  activeTab === 'map' && styles.segmentTabTextActive,
                ]}
              >
                Community Map
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Horizontal Filter Pills */}
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
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillSelected,
                ]}
                onPress={() => handleSelectCategory(isSelected ? undefined : item.value)}
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

        {/* Status Text/Button Filter Row */}
        <View style={styles.statusRow}>
          {statuses.map((item) => {
            const isSelected = selectedStatus === item.value;
            if (isSelected) {
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.statusSelectedButton}
                  onPress={() => handleSelectStatus(undefined)}
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
                onPress={() => handleSelectStatus(item.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.statusNormalText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
            bottomOffset={20}
          />
          {/* Floating Report An Issue Action in Map View (positioned above legend options) */}
          <TouchableOpacity
            style={styles.floatingReportButton}
            onPress={onCreateReport}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Report an Issue"
          >
            <Text style={styles.floatingReportButtonIcon}>📢</Text>
            <Text style={styles.floatingReportButtonText}>Report an Issue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.feedWrapper}>
          {/* Report an Issue Callout Card with bold border and elevation */}
          <View style={styles.reportActionContainer}>
            <View style={styles.reportActionCard}>
              <View style={styles.reportActionLeft}>
                <View style={styles.reportActionIconBox}>
                  <Text style={styles.reportActionIcon}>📢</Text>
                </View>
                <View style={styles.reportActionTextWrap}>
                  <Text style={styles.reportActionTitle}>Report a Civic Issue</Text>
                  <Text style={styles.reportActionSubtitle}>
                    GPS verified • Directed to official ward
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.createButton}
                onPress={onCreateReport}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Report a Civic Issue in Andhra Pradesh"
              >
                <Text style={styles.createButtonText}>Create →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Heading: Community Reports + count pill */}
          <View style={styles.feedHeaderRow}>
            <View>
              <Text style={styles.feedSectionTitle}>Community Reports</Text>
              <Text style={styles.feedSubtitle}>
                Live citizen issues reported in Andhra Pradesh
              </Text>
            </View>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>
                {displayedReports.length} {displayedReports.length === 1 ? 'issue' : 'issues'}
              </Text>
            </View>
          </View>

          {/* Reports Feed with High-Contrast Shimmer Skeleton Loading */}
          {isLoading ? (
            <View style={styles.skeletonContainer}>
              <SkeletonReportCard />
              <SkeletonReportCard />
              <SkeletonReportCard />
            </View>
          ) : error ? (
            <ErrorState
              title="Could not load reports"
              description={error}
              onAction={fetchHomeData}
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
                      fetchHomeData(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.footerRetryText}>⚠️ {paginationError}</Text>
                  </TouchableOpacity>
                ) : !hasMore && displayedReports.length > 0 ? (
                  <View style={styles.endOfFeedContainer}>
                    <Text style={styles.endOfFeedText}>✓ You're all caught up on community reports</Text>
                  </View>
                ) : null
              }
              ListEmptyComponent={
                <EmptyState
                  title={query ? 'No matching reports found' : 'No civic reports in this area'}
                  description={
                    query
                      ? `No reports matched "${query}". Try adjusting your filters or search keywords.`
                      : 'Be the first citizen to voice an issue in your community and track its official resolution.'
                  }
                  actionTitle="Report an Issue"
                  onAction={onCreateReport}
                />
              }
            />
          )}
        </View>
      )}

      {/* High-Contrast Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleSelectTab('feed')}
          activeOpacity={0.8}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'feed' && styles.bottomNavIconActive]}>
            🏠
          </Text>
          <Text style={[styles.bottomNavLabel, activeTab === 'feed' && styles.bottomNavLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleSelectTab('map')}
          activeOpacity={0.8}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'map' && styles.bottomNavIconActive]}>
            🗺️
          </Text>
          <Text style={[styles.bottomNavLabel, activeTab === 'map' && styles.bottomNavLabelActive]}>
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={onOpenMyReports || onCreateReport}
          activeOpacity={0.8}
        >
          <Text style={styles.bottomNavIcon}>📋</Text>
          <Text style={styles.bottomNavLabel}>My Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={onOpenRepresentatives}
          activeOpacity={0.8}
        >
          <Text style={styles.bottomNavIcon}>🏛️</Text>
          <Text style={styles.bottomNavLabel}>Directory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={onOpenProfile}
          activeOpacity={0.8}
        >
          <Text style={styles.bottomNavIcon}>👤</Text>
          <Text style={styles.bottomNavLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F6', // Clear, distinct canvas separation from #FFFFFF cards
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#CBD5E1', // High contrast bottom border
  },
  brandContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A', // High contrast dark slate
    letterSpacing: -0.5,
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2563EB',
    marginLeft: 4,
    marginRight: 8,
  },
  stateBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#93C5FD',
  },
  stateBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569', // Darker slate for readability
    lineHeight: 16,
    marginTop: 4,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  actionIconText: {
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#DC2626',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  guestAvatarButton: {
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
  },
  guestAvatarText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '800',
  },
  authorityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1.5,
    borderBottomColor: '#A7F3D0',
  },
  authorityBannerIcon: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  authorityBannerContent: {
    flex: 1,
  },
  authorityBannerTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: '#065F46',
  },
  authorityBannerSubtitle: {
    fontSize: typography.sizes.xs,
    color: '#047857',
    marginTop: 1,
  },
  authorityBannerArrow: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  // Search section
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  searchCustomInput: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  searchIcon: {
    fontSize: 15,
    color: '#64748B',
  },
  clearSearchText: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: spacing.xs,
  },
  // Segmented control
  segmentContainer: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  segmentTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentTabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  segmentTabIcon: {
    fontSize: 14,
  },
  segmentTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  segmentTabTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  // Filter Section
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: '#CBD5E1',
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1', // Visible border
  },
  categoryPillSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  categoryPillIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  categoryPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 14,
  },
  statusSelectedButton: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusSelectedButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statusNormalButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  statusNormalText: {
    color: '#475569', // Darker, crisp text
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Map layout
  mapViewWrapper: {
    flex: 1,
    position: 'relative',
  },
  floatingReportButton: {
    position: 'absolute',
    bottom: 74,
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: 13,
    borderRadius: radii.pill,
    ...shadows.lg,
    elevation: 8,
    zIndex: 30,
  },
  floatingReportButtonIcon: {
    fontSize: 16,
  },
  floatingReportButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.2,
  },
  // Feed layout
  feedWrapper: {
    flex: 1,
  },
  reportActionContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  reportActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#CBD5E1', // High contrast border
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  reportActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reportActionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  reportActionIcon: {
    fontSize: 22,
  },
  reportActionTextWrap: {
    flex: 1,
  },
  reportActionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  reportActionSubtitle: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 2,
  },
  createButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  feedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  feedSectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  feedSubtitle: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 2,
  },
  countPill: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  countPillText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '700',
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 24,
  },
  skeletonContainer: {
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1', // High contrast border to prevent blending
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
    color: '#0F172A', // High contrast dark slate
    lineHeight: 20,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#475569', // Clear, readable text
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
    color: '#DC2626', // Vibrant, high-contrast red
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#CBD5E1', // Distinct separator from background
    paddingVertical: 10,
    paddingBottom: 14,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomNavIcon: {
    fontSize: 19,
    color: '#64748B',
    marginBottom: 3,
  },
  bottomNavIconActive: {
    color: '#2563EB',
  },
  bottomNavLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  bottomNavLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
});

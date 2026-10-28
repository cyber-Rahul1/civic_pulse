import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import { apiClient } from '../api/api-client';
import {
  RepresentativeProfileDto,
  RepresentativeOfficeType,
} from '@civic-pulse/contracts';
import { colors, typography, spacing, radii, shadows } from '../theme/tokens';
import { ErrorState, EmptyState } from '../components/FeedbackStates';
import { SkeletonRepresentativeCard, ShimmerSkeleton } from '../components/ShimmerSkeleton';
import { Input } from '../components/Input';
import { BackButton } from '../components/BackButton';
import { BottomNavBar, BottomNavTab } from '../components/BottomNavBar';
import { useDebounce } from '../hooks/useDebounce';

interface RepresentativesDirectoryScreenProps {
  onBack: () => void;
  onSelectRepresentative: (id: string) => void;
  onSelectTab?: (tab: BottomNavTab) => void;
}

const OFFICE_TYPE_TABS: Array<{ label: string; value?: string }> = [
  { label: 'All' },
  { label: 'MPs', value: RepresentativeOfficeType.MP },
  { label: 'MLAs', value: RepresentativeOfficeType.MLA },
  { label: 'Mayors', value: RepresentativeOfficeType.MAYOR },
  { label: 'Councillors', value: RepresentativeOfficeType.WARD_COUNCILLOR },
];

export const RepresentativesDirectoryScreen: React.FC<RepresentativesDirectoryScreenProps> = ({
  onBack,
  onSelectRepresentative,
  onSelectTab,
}) => {
  const [representatives, setRepresentatives] = useState<RepresentativeProfileDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedOfficeType, setSelectedOfficeType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  // Fetch representatives
  const fetchRepresentatives = useCallback(
    async (reset: boolean = true) => {
      if (reset) {
        setIsLoading(true);
        setError(null);
      }
      const targetPage = reset ? 1 : page + 1;

      try {
        const res = await apiClient.listRepresentatives({
          search: debouncedSearch.trim() || undefined,
          officeType: selectedOfficeType,
          termStatus: 'CURRENT',
          page: targetPage,
          limit: 15,
        });

        const newItems = res?.items || [];
        const totalPages = res?.meta?.totalPages || 1;

        if (reset) {
          setRepresentatives(newItems);
          setPage(1);
        } else {
          setRepresentatives((prev) => {
            const existing = new Set(prev.map((r) => r.id));
            const filtered = newItems.filter((r) => !existing.has(r.id));
            return [...prev, ...filtered];
          });
          setPage(targetPage);
        }

        setHasMore(targetPage < totalPages && newItems.length > 0);
      } catch (err: any) {
        setError(err?.message || 'Failed to load representatives directory.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        setIsFetchingMore(false);
      }
    },
    [page, debouncedSearch, selectedOfficeType],
  );

  useEffect(() => {
    fetchRepresentatives(true);
  }, [debouncedSearch, selectedOfficeType]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRepresentatives(true);
  };

  const handleLoadMore = () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    fetchRepresentatives(false);
  };

  const renderRepresentativeCard = ({ item }: { item: RepresentativeProfileDto }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.84}
        onPress={() => onSelectRepresentative(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`View public profile of ${item.publicName}, ${item.officialDesignation}`}
      >
        <View style={styles.cardHeaderRow}>
          {/* Portrait Image or Neutral Avatar Fallback */}
          {item.photoUrl && !imageErrorMap[item.id] ? (
            <Image
              source={{ uri: item.photoUrl }}
              style={styles.avatarImage}
              resizeMode="cover"
              onError={() => setImageErrorMap((prev) => ({ ...prev, [item.id]: true }))}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {item.publicName.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.repName} numberOfLines={1}>
                {item.publicName}
              </Text>
              {item.verificationStatus === 'VERIFIED_OFFICIAL' ? (
                <Text style={styles.verifiedCheck}>✓ Official</Text>
              ) : item.verificationStatus === 'FLAGGED_FOR_REVIEW' ? (
                <Text style={styles.flaggedCheck}>⚠️ Pending Review</Text>
              ) : (
                <Text style={styles.publicRecordCheck}>Public Record</Text>
              )}
            </View>

            <Text style={styles.repDesignation} numberOfLines={1}>
              {item.officialDesignation}
            </Text>

            <View style={styles.jurisdictionRow}>
              <Text style={styles.jurisdictionIcon}>📍</Text>
              <Text style={styles.jurisdictionText} numberOfLines={1}>
                {item.jurisdictionName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.partyBadge}>
            <Text style={styles.partyText}>{item.partyAffiliation || 'Independent'}</Text>
          </View>

          <View style={[styles.termBadge, item.termStatus === 'FORMER' && styles.termBadgeFormer]}>
            <Text style={[styles.termText, item.termStatus === 'FORMER' && styles.termTextFormer]}>
              {item.termStatus === 'CURRENT' ? '● In Office' : 'Former'}
            </Text>
          </View>

          <Text style={styles.viewProfileLink}>View Profile →</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navBar}>
        <BackButton onPress={onBack} />
        <Text style={styles.navTitle}>Public Representatives</Text>
        <View style={{ width: 68 }} />
      </View>

      {/* Modern Debounced Search Input */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search representative, constituency, or party..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          rightElement={
            searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            ) : null
          }
          containerStyle={{ marginBottom: 0 }}
          accessibilityLabel="Search public representatives"
        />
      </View>

      {/* Office Type Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {OFFICE_TYPE_TABS.map((tab) => {
            const isSelected = selectedOfficeType === tab.value;
            return (
              <TouchableOpacity
                key={tab.label}
                style={[styles.tabButton, isSelected && styles.tabButtonActive]}
                onPress={() => setSelectedOfficeType(tab.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Honest Scope & Provenance Banner */}
      <View style={styles.coverageBanner}>
        <Text style={styles.coverageBannerText}>
          ℹ️ <Text style={styles.coverageBold}>Coverage Scope:</Text> 5 of 28 Andhra Pradesh districts • Ward-level exact mapping active in 3 pilot wards. Verified via ECI & AP Legislature gazettes.
        </Text>
      </View>

      {/* Main List with Shimmer Skeleton Loading */}
      {isLoading ? (
        <View style={styles.skeletonWrapper}>
          <SkeletonRepresentativeCard />
          <SkeletonRepresentativeCard />
          <SkeletonRepresentativeCard />
          <SkeletonRepresentativeCard />
        </View>
      ) : error ? (
        <ErrorState
          title="Could not load directory"
          description={error}
          onAction={() => fetchRepresentatives(true)}
        />
      ) : representatives.length === 0 ? (
        <EmptyState
          title="No representatives found"
          description="Try adjusting your search criteria or office filter."
          actionTitle="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedOfficeType(undefined);
          }}
        />
      ) : (
        <FlatList
          data={representatives}
          keyExtractor={(item) => item.id}
          renderItem={renderRepresentativeCard}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.moreLoader}>
                <ShimmerSkeleton width="80%" height={16} borderRadius={radii.xs} />
              </View>
            ) : null
          }
        />
      )}

      {/* Persistent Bottom Navigation Bar */}
      {onSelectTab && (
        <BottomNavBar
          activeTab="directory"
          onSelectTab={onSelectTab}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm + 2,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  backText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  navTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  searchIcon: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  clearText: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xs,
  },
  tabsWrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  tabsContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  tabButton: {
    paddingHorizontal: spacing.md + 2,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    borderColor: '#2648A5',
    ...shadows.subtle,
  },
  tabText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  coverageBanner: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    padding: spacing.sm + 2,
    borderRadius: radii.md,
    backgroundColor: colors.primarySubtle,
    borderWidth: 1,
    borderColor: '#D3DCF3',
  },
  coverageBannerText: {
    fontSize: typography.sizes.xs - 1,
    color: colors.primaryDark,
    lineHeight: 18,
  },
  coverageBold: {
    fontWeight: typography.weights.bold,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.hero,
  },
  skeletonWrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  cardInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  repName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  verifiedCheck: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.success,
    backgroundColor: colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  flaggedCheck: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.warning,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  publicRecordCheck: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.medium,
    color: colors.textMuted,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  repDesignation: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: typography.weights.medium,
  },
  jurisdictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  jurisdictionIcon: {
    fontSize: 11,
    marginRight: 3,
  },
  jurisdictionText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  partyBadge: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  partyText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
  },
  termBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  termBadgeFormer: {
    backgroundColor: colors.surfaceMuted,
  },
  termText: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.semibold,
    color: colors.success,
  },
  termTextFormer: {
    color: colors.textMuted,
  },
  viewProfileLink: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  moreLoader: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { apiClient } from '../api/api-client';
import {
  RepresentativeProfileDto,
  RepresentativeOfficeType,
} from '@civic-pulse/contracts';
import { colors, typography, spacing } from '../theme/tokens';
import { ErrorState, EmptyState } from '../components/FeedbackStates';

interface RepresentativesDirectoryScreenProps {
  onBack: () => void;
  onSelectRepresentative: (id: string) => void;
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
}) => {
  const [representatives, setRepresentatives] = useState<RepresentativeProfileDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
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
          search: searchQuery.trim() || undefined,
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
    [page, searchQuery, selectedOfficeType],
  );

  useEffect(() => {
    fetchRepresentatives(true);
  }, [searchQuery, selectedOfficeType]);

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
        activeOpacity={0.8}
        onPress={() => onSelectRepresentative(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`View public profile of ${item.publicName}, ${item.officialDesignation}`}
      >
        <View style={styles.cardHeaderRow}>
          {/* Neutral Avatar Placeholder */}
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.publicName.substring(0, 2).toUpperCase()}
            </Text>
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.repName} numberOfLines={1}>
                {item.publicName}
              </Text>
              {item.verificationStatus === 'VERIFIED_OFFICIAL' && (
                <Text style={styles.verifiedCheck}>✓ Official</Text>
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

          <View style={styles.termBadge}>
            <Text style={styles.termText}>
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
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Public Representatives</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search representative, constituency, or party..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
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

      {/* Main List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading verified representative records...</Text>
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
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : null
          }
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
  },
  backText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  navTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.cardBackground,
  },
  searchInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabsWrapper: {
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.xs,
  },
  tabsContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
  },
  coverageBanner: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  coverageBannerText: {
    fontSize: 10,
    color: '#1E40AF',
    lineHeight: 14,
  },
  coverageBold: {
    fontWeight: typography.weights.bold,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  cardInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  repName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  verifiedCheck: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: '#15803D',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  repDesignation: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: typography.weights.medium,
  },
  jurisdictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  jurisdictionIcon: {
    fontSize: 12,
  },
  jurisdictionText: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  partyBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  partyText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  termBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  termText: {
    fontSize: 11,
    fontWeight: typography.weights.medium,
    color: '#15803D',
  },
  viewProfileLink: {
    marginLeft: 'auto',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  moreLoader: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
});

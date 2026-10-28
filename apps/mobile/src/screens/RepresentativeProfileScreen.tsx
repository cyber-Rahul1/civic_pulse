import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { apiClient } from '../api/api-client';
import {
  RepresentativeProfileDto,
  RepresentativeAccountabilitySummaryDto,
  ReportDto,
} from '@civic-pulse/contracts';
import { colors, typography, spacing, radii } from '../theme/tokens';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { ErrorState } from '../components/FeedbackStates';
import { ShimmerSkeleton, SkeletonReportCard } from '../components/ShimmerSkeleton';

interface RepresentativeProfileScreenProps {
  representativeId: string;
  onBack: () => void;
  onSelectReport: (reportId: string) => void;
}

export const RepresentativeProfileScreen: React.FC<RepresentativeProfileScreenProps> = ({
  representativeId,
  onBack,
  onSelectReport,
}) => {
  const [profile, setProfile] = useState<RepresentativeProfileDto | null>(null);
  const [summary, setSummary] = useState<RepresentativeAccountabilitySummaryDto | null>(null);
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [portraitError, setPortraitError] = useState<boolean>(false);
  const [reportImageErrorMap, setReportImageErrorMap] = useState<Record<string, boolean>>({});

  // Claim Modal State
  const [isClaimModalVisible, setIsClaimModalVisible] = useState<boolean>(false);
  const [claimEmail, setClaimEmail] = useState<string>('');
  const [claimProof, setClaimProof] = useState<string>('');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState<boolean>(false);

  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profileData, summaryData, repReportsData] = await Promise.all([
        apiClient.getRepresentativeById(representativeId),
        apiClient.getRepresentativeAccountability(representativeId),
        apiClient.getRepresentativeReports(representativeId, activeTab),
      ]);

      setProfile(profileData);
      setSummary(summaryData);

      // Fetch actual report details for the associated reports
      const reportItems: ReportDto[] = [];
      for (const assoc of (repReportsData?.items || []).slice(0, 10)) {
        try {
          const repDoc = await apiClient.getReport(assoc.reportId);
          reportItems.push(repDoc);
        } catch {
          // If a single report detail fails, skip gracefully
        }
      }
      setReports(reportItems);
    } catch (err: any) {
      setError(err?.message || 'Failed to load representative profile.');
    } finally {
      setIsLoading(false);
    }
  }, [representativeId, activeTab]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleClaimSubmit = async () => {
    if (!claimEmail.trim() || !claimProof.trim()) {
      Alert.alert('Required Fields', 'Please enter your official email and proof of office.');
      return;
    }

    setIsSubmittingClaim(true);
    try {
      await apiClient.submitProfileClaim(representativeId, {
        officialEmailUsed: claimEmail.trim(),
        proofDetails: claimProof.trim(),
      });
      Alert.alert(
        'Claim Submitted',
        'Your profile claim has been submitted for administrative verification. You will be notified once reviewed.',
      );
      setIsClaimModalVisible(false);
      setClaimEmail('');
      setClaimProof('');
      fetchProfileData();
    } catch (err: any) {
      Alert.alert('Claim Submission Error', err?.message || 'Could not submit claim request.');
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  if (isLoading && !profile) {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Representative Profile</Text>
          <View style={{ width: 48 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.hero }}>
          {/* Header Card Skeleton */}
          <View style={styles.profileHeaderCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ShimmerSkeleton width={80} height={80} borderRadius={radii.pill} />
              <View style={{ marginLeft: spacing.md, flex: 1 }}>
                <ShimmerSkeleton width={180} height={20} borderRadius={radii.xs} />
                <ShimmerSkeleton width={140} height={14} borderRadius={radii.xs} style={{ marginTop: 6 }} />
                <ShimmerSkeleton width={100} height={14} borderRadius={radii.xs} style={{ marginTop: 6 }} />
              </View>
            </View>
          </View>

          {/* Metrics Skeleton */}
          <View style={[styles.profileHeaderCard, { marginTop: spacing.md }]}>
            <ShimmerSkeleton width={160} height={18} borderRadius={radii.xs} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
              <ShimmerSkeleton width={60} height={40} borderRadius={radii.sm} />
              <ShimmerSkeleton width={60} height={40} borderRadius={radii.sm} />
              <ShimmerSkeleton width={60} height={40} borderRadius={radii.sm} />
              <ShimmerSkeleton width={60} height={40} borderRadius={radii.sm} />
            </View>
          </View>

          {/* Reports Grid Skeleton */}
          <View style={{ marginTop: spacing.lg }}>
            <ShimmerSkeleton width={180} height={20} borderRadius={radii.xs} style={{ marginBottom: spacing.md }} />
            <SkeletonReportCard />
            <SkeletonReportCard />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <ErrorState
          title="Could not load representative"
          description={error || 'Representative profile unavailable'}
          onAction={fetchProfileData}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          {profile.publicName}
        </Text>
        <TouchableOpacity
          onPress={() => setIsClaimModalVisible(true)}
          style={styles.claimButton}
          disabled={profile.claimStatus === 'CLAIMED_VERIFIED'}
        >
          <Text style={styles.claimButtonText}>
            {profile.claimStatus === 'CLAIMED_VERIFIED' ? '✓ Verified' : 'Claim Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Box */}
        <View style={styles.profileHeaderBox}>
          {profile.photoUrl && !portraitError ? (
            <Image
              source={{ uri: profile.photoUrl }}
              style={styles.portraitLarge}
              resizeMode="cover"
              onError={() => setPortraitError(true)}
            />
          ) : (
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>
                {profile.publicName.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          )}

          <Text style={styles.repNameLarge}>{profile.publicName}</Text>
          <Text style={styles.repDesignationLarge}>{profile.officialDesignation}</Text>

          <View style={styles.jurisdictionBadge}>
            <Text style={styles.jurisdictionBadgeText}>📍 {profile.jurisdictionName}</Text>
          </View>

          <View style={styles.metaPillsRow}>
            <View style={styles.pillParty}>
              <Text style={styles.pillPartyText}>{profile.partyAffiliation || 'Independent'}</Text>
            </View>
            <View style={styles.pillTerm}>
              <Text style={styles.pillTermText}>
                {profile.termStatus === 'CURRENT' ? '● Active Term' : 'Former Representative'}
              </Text>
            </View>
            <View
              style={[
                styles.pillVerified,
                profile.verificationStatus === 'FLAGGED_FOR_REVIEW' && styles.pillFlagged,
                profile.verificationStatus === 'PUBLIC_RECORD' && styles.pillPublicRecord,
              ]}
            >
              <Text
                style={[
                  styles.pillVerifiedText,
                  profile.verificationStatus === 'FLAGGED_FOR_REVIEW' && styles.pillFlaggedText,
                  profile.verificationStatus === 'PUBLIC_RECORD' && styles.pillPublicRecordText,
                ]}
              >
                {profile.verificationStatus === 'VERIFIED_OFFICIAL'
                  ? '✓ Official Verified'
                  : profile.verificationStatus === 'FLAGGED_FOR_REVIEW'
                  ? '⚠️ Pending Review'
                  : 'Public Record'}
              </Text>
            </View>
          </View>

          <Text style={styles.lastVerifiedText}>
            Source: {profile.sourceProvenance?.sourceName || 'Official Gazetted Directory'} • Verified:{' '}
            {new Date(profile.lastVerifiedAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Civic Accountability Summary Card */}
        {summary && (
          <View style={styles.accountabilityBox}>
            <Text style={styles.cardHeading}>📊 Civic Accountability Overview</Text>
            <Text style={styles.accountabilitySub}>
              Aggregated from reports in {profile.jurisdictionName}
            </Text>

            <View style={styles.metricGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricNumber}>{summary.totalAssociatedReports}</Text>
                <Text style={styles.metricLabel}>Total Issues</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={[styles.metricNumber, { color: colors.warning }]}>
                  {summary.openReports}
                </Text>
                <Text style={styles.metricLabel}>Open</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={[styles.metricNumber, { color: colors.info }]}>
                  {summary.inProgressReports}
                </Text>
                <Text style={styles.metricLabel}>In Progress</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={[styles.metricNumber, { color: colors.success }]}>
                  {summary.resolvedReports}
                </Text>
                <Text style={styles.metricLabel}>Resolved</Text>
              </View>
            </View>

            <View style={styles.resolutionRateRow}>
              <Text style={styles.resolutionRateLabel}>Resolution Rate:</Text>
              <Text style={styles.resolutionRateValue}>{summary.resolutionPercentage}%</Text>
            </View>
          </View>
        )}

        {/* About & Official Contact Details */}
        <View style={styles.aboutBox}>
          <Text style={styles.cardHeading}>🏛️ About & Official Contact</Text>
          <Text style={styles.biographyText}>
            {profile.biography || 'Publicly sourced biography for this public officeholder.'}
          </Text>

          {profile.contactDetails ? (
            <View style={styles.contactDetailsWrapper}>
              {profile.contactDetails.officeAddress && (
                <Text style={styles.contactLine}>
                  📍 <Text style={styles.contactBold}>Office:</Text> {profile.contactDetails.officeAddress}
                </Text>
              )}
              {profile.contactDetails.officialEmail && (
                <Text style={styles.contactLine}>
                  ✉️ <Text style={styles.contactBold}>Email:</Text> {profile.contactDetails.officialEmail}
                </Text>
              )}
              {profile.contactDetails.officialPhone && (
                <Text style={styles.contactLine}>
                  📞 <Text style={styles.contactBold}>Phone:</Text> {profile.contactDetails.officialPhone}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.noContactText}>Public contact details awaiting verification.</Text>
          )}

          {/* Official Provenance Details */}
          {profile.sourceProvenance && (
            <View style={styles.provenanceBox}>
              <Text style={styles.provenanceTitle}>Official Source Provenance</Text>
              <Text style={styles.provenanceField}>
                <Text style={styles.contactBold}>Source Record:</Text> {profile.sourceProvenance.sourceName}
              </Text>
              {profile.sourceProvenance.sourceUrl && (
                <Text style={styles.provenanceField}>
                  <Text style={styles.contactBold}>Official URL:</Text> {profile.sourceProvenance.sourceUrl}
                </Text>
              )}
              {profile.sourceProvenance.notes && (
                <Text style={styles.provenanceField}>
                  <Text style={styles.contactBold}>Gazette Notes:</Text> {profile.sourceProvenance.notes}
                </Text>
              )}
              <Text style={styles.provenanceField}>
                <Text style={styles.contactBold}>Verified On:</Text>{' '}
                {new Date(profile.lastVerifiedAt).toLocaleDateString()} (Manual Audit)
              </Text>
            </View>
          )}
        </View>

        {/* Associated Civic Reports */}
        <View style={styles.reportsSection}>
          <Text style={styles.cardHeading}>📋 Area Reports & Track Record</Text>

          {/* Filter Tabs */}
          <View style={styles.filterTabsRow}>
            {(['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.filterTab, activeTab === tab && styles.filterTabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    activeTab === tab && styles.filterTabTextActive,
                  ]}
                >
                  {tab === 'ALL'
                    ? 'All'
                    : tab === 'OPEN'
                      ? 'Open'
                      : tab === 'IN_PROGRESS'
                        ? 'In Progress'
                        : 'Resolved'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reports Grid (Two-Column Responsive Image Grid) */}
          {reports.length === 0 ? (
            <View style={styles.emptyReportsBox}>
              <Text style={styles.emptyReportsIcon}>📭</Text>
              <Text style={styles.emptyReportsTitle}>No reports in this category</Text>
              <Text style={styles.emptyReportsText}>
                There are no reports recorded with status {activeTab} for {profile.jurisdictionName}.
              </Text>
            </View>
          ) : (
            <View style={styles.reportsGrid}>
              {reports.map((report) => {
                const primaryMedia = report.media && report.media.length > 0 ? report.media[0] : null;
                const photoUrl = primaryMedia?.secureUrl || primaryMedia?.url;
                const hasImage = Boolean(photoUrl && !reportImageErrorMap[report.id]);
                const hasResolvedEvidence = Boolean(
                  report.status === 'RESOLVED' &&
                    report.resolutionEvidenceMedia &&
                    report.resolutionEvidenceMedia.length > 0
                );

                const getCategoryIcon = (cat: string) => {
                  switch (String(cat).toUpperCase()) {
                    case 'POTHOLE':
                      return '🕳️';
                    case 'STREETLIGHT':
                      return '💡';
                    case 'GARBAGE':
                      return '🗑️';
                    case 'WATER':
                      return '🚰';
                    case 'DRAINAGE':
                      return '🌊';
                    case 'PUBLIC_SAFETY':
                      return '🛡️';
                    default:
                      return '📋';
                  }
                };

                return (
                  <TouchableOpacity
                    key={report.id}
                    style={styles.gridCard}
                    activeOpacity={0.85}
                    onPress={() => onSelectReport(report.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Report: ${report.title}, status: ${report.status}`}
                  >
                    {/* Top Thumbnail or Designed Category Fallback */}
                    <View style={styles.gridImageContainer}>
                      {hasImage ? (
                        <Image
                          source={{ uri: photoUrl! }}
                          style={styles.gridImage}
                          resizeMode="cover"
                          onError={() =>
                            setReportImageErrorMap((prev) => ({ ...prev, [report.id]: true }))
                          }
                        />
                      ) : (
                        <View style={styles.gridImagePlaceholder}>
                          <Text style={styles.gridPlaceholderIcon}>
                            {getCategoryIcon(report.category)}
                          </Text>
                          <Text style={styles.gridPlaceholderLabel}>
                            {report.category || 'Civic Issue'}
                          </Text>
                        </View>
                      )}

                      {/* Floating Status & Resolved Badges */}
                      <View style={styles.floatingStatusBadge}>
                        <StatusBadge status={report.status} />
                      </View>

                      {hasResolvedEvidence && (
                        <View style={styles.resolvedPhotoIndicator}>
                          <Text style={styles.resolvedPhotoText}>✓ Solved w/ Photo</Text>
                        </View>
                      )}
                    </View>

                    {/* Card Body */}
                    <View style={styles.gridCardBody}>
                      <View style={styles.gridCategoryRow}>
                        <Text style={styles.gridCategoryBadge}>{report.category}</Text>
                        <Text style={styles.gridDateText}>
                          {new Date(report.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Text>
                      </View>

                      <Text style={styles.gridReportTitle} numberOfLines={2}>
                        {report.title}
                      </Text>

                      <Text style={styles.gridReportLocation} numberOfLines={1}>
                        📍 {report.locationDescription || 'Verified Location'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Profile Claim Modal */}
      <Modal visible={isClaimModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Claim Official Profile</Text>
            <Text style={styles.modalSub}>
              Are you an authorized representative or official officeholder for {profile.publicName}?
              Submit verified credentials to request administrative access.
            </Text>

            <Text style={styles.inputLabel}>Official / Government Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. mla.office@aplegislature.org"
              value={claimEmail}
              onChangeText={setClaimEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Proof of Office / Supporting Details</Text>
            <TextInput
              style={[styles.textInput, { height: 80 }]}
              placeholder="Provide official notification number, ID card reference, or appointment details..."
              value={claimProof}
              onChangeText={setClaimProof}
              multiline
            />

            <View style={styles.modalActionRow}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setIsClaimModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Submit Claim"
                onPress={handleClaimSubmit}
                loading={isSubmittingClaim}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  navTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    maxWidth: 180,
  },
  claimButton: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#D4E2FC',
  },
  claimButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  profileHeaderCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  profileHeaderBox: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  portraitLarge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.borderSubtle,
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarLarge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: '#D4E2FC',
  },
  avatarLargeText: {
    fontSize: 26,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  repNameLarge: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  repDesignationLarge: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    marginTop: 2,
    textAlign: 'center',
  },
  jurisdictionBadge: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  jurisdictionBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
  },
  metaPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
    justifyContent: 'center',
  },
  pillParty: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#D4E2FC',
  },
  pillPartyText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  pillTerm: {
    backgroundColor: '#EDFDF5',
    borderColor: '#B9F1D4',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  pillTermText: {
    fontSize: 11,
    fontWeight: typography.weights.semibold,
    color: colors.success,
  },
  pillVerified: {
    backgroundColor: '#EDFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#B9F1D4',
  },
  pillVerifiedText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  pillFlagged: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  pillFlaggedText: {
    color: colors.warning,
  },
  pillPublicRecord: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSubtle,
  },
  pillPublicRecordText: {
    color: colors.textSecondary,
  },
  lastVerifiedText: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  accountabilityBox: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeading: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  accountabilitySub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    marginTop: 2,
  },
  resolutionRateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  resolutionRateLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  resolutionRateValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  aboutBox: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  biographyText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  contactDetailsWrapper: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    gap: 4,
  },
  contactLine: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
  },
  contactBold: {
    fontWeight: typography.weights.bold,
  },
  provenanceBox: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  provenanceTitle: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  provenanceField: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 14,
    marginTop: 2,
  },
  noContactText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  reportsSection: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTabsRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    gap: 6,
  },
  filterTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
  },
  emptyReportsBox: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyReportsIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  emptyReportsTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptyReportsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 240,
  },
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
  },
  gridCard: {
    width: '48.5%',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  gridImageContainer: {
    width: '100%',
    height: 110,
    backgroundColor: colors.surfaceMuted,
    position: 'relative',
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridPlaceholderIcon: {
    fontSize: 28,
    marginBottom: 2,
  },
  gridPlaceholderLabel: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  floatingStatusBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    transform: [{ scale: 0.85 }],
    transformOrigin: 'top left',
  },
  resolvedPhotoIndicator: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(22, 134, 91, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  resolvedPhotoText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: typography.weights.bold,
  },
  gridCardBody: {
    padding: spacing.xs,
    gap: 2,
  },
  gridCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  gridCategoryBadge: {
    fontSize: 9,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    textTransform: 'uppercase',
  },
  gridDateText: {
    fontSize: 9,
    color: colors.textMuted,
  },
  gridReportTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    lineHeight: 14,
    marginTop: 2,
  },
  gridReportLocation: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(23, 32, 51, 0.6)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  modalSub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginTop: 4,
  },
  textInput: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    fontSize: typography.sizes.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    color: colors.textPrimary,
  },
  modalActionRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
});

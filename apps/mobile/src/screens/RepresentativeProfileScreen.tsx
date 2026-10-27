import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { apiClient } from '../api/api-client';
import {
  RepresentativeProfileDto,
  RepresentativeAccountabilitySummaryDto,
  ReportDto,
} from '@civic-pulse/contracts';
import { colors, typography, spacing } from '../theme/tokens';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { ErrorState } from '../components/FeedbackStates';

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading representative profile...</Text>
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
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {profile.publicName.substring(0, 2).toUpperCase()}
            </Text>
          </View>

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
            <View style={styles.pillVerified}>
              <Text style={styles.pillVerifiedText}>
                {profile.verificationStatus === 'VERIFIED_OFFICIAL' ? '✓ Official ECI Record' : 'Public Record'}
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

          {/* Reports List */}
          {reports.length === 0 ? (
            <View style={styles.emptyReportsBox}>
              <Text style={styles.emptyReportsText}>
                No reports found in this section for {profile.jurisdictionName}.
              </Text>
            </View>
          ) : (
            reports.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                activeOpacity={0.8}
                onPress={() => onSelectReport(report.id)}
              >
                <View style={styles.reportCardTop}>
                  <Text style={styles.reportCategoryBadge}>{report.category}</Text>
                  <StatusBadge status={report.status} />
                </View>

                <Text style={styles.reportTitle} numberOfLines={2}>
                  {report.title}
                </Text>

                <Text style={styles.reportLocationText} numberOfLines={1}>
                  📍 {report.locationDescription || 'Location verified'}
                </Text>

                <View style={styles.reportCardFooter}>
                  <Text style={styles.reportDate}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.openReportLink}>View Details →</Text>
                </View>
              </TouchableOpacity>
            ))
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
    paddingVertical: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  navTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    maxWidth: 180,
  },
  claimButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
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
  profileHeaderBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  avatarLargeText: {
    fontSize: 24,
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
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
    marginTop: 2,
    textAlign: 'center',
  },
  jurisdictionBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  jurisdictionBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  metaPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
    justifyContent: 'center',
  },
  pillParty: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  pillPartyText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  pillTerm: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  pillTermText: {
    fontSize: 11,
    fontWeight: typography.weights.medium,
    color: '#15803D',
  },
  pillVerified: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  pillVerifiedText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: '#166534',
  },
  lastVerifiedText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  accountabilityBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: spacing.sm,
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
    borderTopColor: '#F1F5F9',
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
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    borderTopColor: '#F1F5F9',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyReportsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  reportCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportCategoryBadge: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reportTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginTop: 4,
  },
  reportLocationText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  reportCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  reportDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  openReportLink: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.sm,
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
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    fontSize: typography.sizes.sm,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  modalActionRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
});

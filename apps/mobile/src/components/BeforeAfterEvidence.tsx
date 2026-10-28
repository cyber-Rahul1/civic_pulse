import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, typography, spacing, radii } from '../theme/tokens';
import { ResolutionEvidenceDto, EvidenceVerificationStatus, ReportStatus } from '@civic-pulse/contracts';

interface BeforeAfterEvidenceProps {
  beforePhotoUrl?: string | null;
  afterEvidence?: ResolutionEvidenceDto | null;
  reportStatus?: ReportStatus;
  resolutionNotes?: string | null;
  onImagePress?: (url: string) => void;
  onAddResolutionPhotoPress?: () => void;
  canUploadEvidence?: boolean;
}

export const BeforeAfterEvidence: React.FC<BeforeAfterEvidenceProps> = ({
  beforePhotoUrl,
  afterEvidence,
  reportStatus,
  resolutionNotes,
  onImagePress,
  onAddResolutionPhotoPress,
  canUploadEvidence,
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const hasBefore = Boolean(beforePhotoUrl);
  const afterPhotoUrl = afterEvidence?.media?.secureUrl || afterEvidence?.media?.url;
  const statusStr = String(afterEvidence?.verificationStatus || '').toUpperCase();
  const isVerifiedAfter =
    afterEvidence?.verificationStatus === EvidenceVerificationStatus.VERIFIED ||
    statusStr === 'VERIFIED';
  const isPendingAfter =
    afterEvidence?.verificationStatus === EvidenceVerificationStatus.PENDING ||
    statusStr === 'PENDING';
  const isResolved =
    reportStatus === ReportStatus.RESOLVED || String(reportStatus).toUpperCase() === 'RESOLVED';

  // Case A: No original photo and no resolution evidence at all
  if (!hasBefore && !afterEvidence) {
    // If resolved without any photos, render a clean resolution statement without empty image panels
    if (isResolved) {
      return (
        <View style={styles.container}>
          <Text style={styles.sectionHeading}>✅ Issue Resolved</Text>
          <Text style={styles.resolvedNoPhotoText}>
            This civic issue has been officially resolved. No before/after resolution photographs were attached.
          </Text>
          {resolutionNotes && (
            <View style={styles.evidenceDescriptionBox}>
              <Text style={styles.descriptionLabel}>Resolution Notes:</Text>
              <Text style={styles.descriptionText}>{resolutionNotes}</Text>
            </View>
          )}
        </View>
      );
    }
    // Case A (unresolved & no photos): completely hide empty comparison panels
    return null;
  }

  // Case D: Verified resolution evidence exists -> render side-by-side / stacked comparison
  if (isVerifiedAfter && afterPhotoUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionHeading}>📸 Resolution Evidence</Text>
          <View style={[styles.verificationBadge, styles.verifiedBadge]}>
            <Text style={styles.verifiedBadgeText}>✓ Verified Resolution</Text>
          </View>
        </View>

        <View style={[styles.comparisonContainer, isWide ? styles.rowComparison : styles.columnComparison]}>
          {/* BEFORE BOX (if available) */}
          {hasBefore && (
            <View style={[styles.evidenceBox, isWide ? styles.halfWidth : styles.fullWidth]}>
              <View style={styles.labelHeader}>
                <Text style={styles.beforeLabel}>BEFORE</Text>
                <Text style={styles.labelSub}>Original Report</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onImagePress && onImagePress(beforePhotoUrl!)}
                style={styles.imageWrapper}
              >
                <Image source={{ uri: beforePhotoUrl! }} style={styles.evidenceImage} resizeMode="cover" />
                <View style={styles.tapEnlargeBadge}>
                  <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* AFTER BOX */}
          <View style={[styles.evidenceBox, isWide && hasBefore ? styles.halfWidth : styles.fullWidth]}>
            <View style={styles.labelHeader}>
              <Text style={styles.afterLabel}>AFTER</Text>
              <Text style={styles.labelSub}>
                {afterEvidence.isOfficialRepresentativeSubmission ? 'Official Work' : 'Community Submission'}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onImagePress && onImagePress(afterPhotoUrl)}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: afterPhotoUrl }} style={styles.evidenceImage} resizeMode="cover" />
              <View style={styles.tapEnlargeBadge}>
                <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
              </View>
            </TouchableOpacity>

            {afterEvidence.description && (
              <View style={styles.evidenceDescriptionBox}>
                <Text style={styles.descriptionLabel}>Work Description:</Text>
                <Text style={styles.descriptionText}>{afterEvidence.description}</Text>
              </View>
            )}

            <View style={styles.evidenceMetaRow}>
              <Text style={styles.metaUploaderText}>
                By: {afterEvidence.uploaderName || 'Contributor'} ({afterEvidence.uploaderRole})
              </Text>
              <Text style={styles.metaDateText}>
                {new Date(afterEvidence.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Case C: Resolution photo uploaded but pending review (or rejected)
  if (isPendingAfter && afterPhotoUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionHeading}>📸 Resolution Evidence</Text>
          <View style={[styles.verificationBadge, styles.pendingBadge]}>
            <Text style={styles.pendingBadgeText}>⏳ Proposed Evidence (Pending Review)</Text>
          </View>
        </View>

        <View style={[styles.comparisonContainer, isWide ? styles.rowComparison : styles.columnComparison]}>
          {/* BEFORE BOX (if original photo exists) */}
          {hasBefore && (
            <View style={[styles.evidenceBox, isWide ? styles.halfWidth : styles.fullWidth]}>
              <View style={styles.labelHeader}>
                <Text style={styles.beforeLabel}>BEFORE</Text>
                <Text style={styles.labelSub}>Original Report</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onImagePress && onImagePress(beforePhotoUrl!)}
                style={styles.imageWrapper}
              >
                <Image source={{ uri: beforePhotoUrl! }} style={styles.evidenceImage} resizeMode="cover" />
                <View style={styles.tapEnlargeBadge}>
                  <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* PENDING AFTER BOX */}
          <View style={[styles.evidenceBox, isWide && hasBefore ? styles.halfWidth : styles.fullWidth, styles.pendingBorder]}>
            <View style={styles.labelHeader}>
              <Text style={styles.pendingLabel}>PROPOSED AFTER</Text>
              <Text style={styles.labelSub}>Awaiting Official Review</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onImagePress && onImagePress(afterPhotoUrl)}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: afterPhotoUrl }} style={styles.evidenceImage} resizeMode="cover" />
              <View style={styles.tapEnlargeBadge}>
                <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
              </View>
            </TouchableOpacity>

            {afterEvidence.description && (
              <View style={styles.evidenceDescriptionBox}>
                <Text style={styles.descriptionLabel}>Submitted Description:</Text>
                <Text style={styles.descriptionText}>{afterEvidence.description}</Text>
              </View>
            )}

            <View style={styles.evidenceMetaRow}>
              <Text style={styles.metaUploaderText}>
                Submitted by: {afterEvidence.uploaderName || 'Resident'}
              </Text>
              <Text style={styles.metaDateText}>
                {new Date(afterEvidence.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Case B: Original photo exists but no resolution photo exists
  // Do NOT render a blank "AFTER" placeholder box. Show the BEFORE photo cleanly.
  if (hasBefore) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionHeading}>📸 Issue Photograph</Text>
          {isResolved && (
            <View style={[styles.verificationBadge, styles.neutralBadge]}>
              <Text style={styles.neutralBadgeText}>Resolved Without After Photo</Text>
            </View>
          )}
        </View>

        <View style={styles.singleBeforeWrapper}>
          <View style={styles.labelHeader}>
            <Text style={styles.beforeLabel}>BEFORE</Text>
            <Text style={styles.labelSub}>Original Report Evidence</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onImagePress && onImagePress(beforePhotoUrl!)}
            style={styles.imageWrapper}
          >
            <Image source={{ uri: beforePhotoUrl! }} style={styles.evidenceImage} resizeMode="cover" />
            <View style={styles.tapEnlargeBadge}>
              <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Case E / Case B upload prompt if eligible and unresolved */}
        {!isResolved && canUploadEvidence && onAddResolutionPhotoPress && (
          <TouchableOpacity
            style={styles.addEvidenceActionRow}
            onPress={onAddResolutionPhotoPress}
            activeOpacity={0.8}
          >
            <Text style={styles.addEvidenceActionIcon}>📷</Text>
            <View style={styles.addEvidenceActionTextWrap}>
              <Text style={styles.addEvidenceActionTitle}>Add Resolution Photo</Text>
              <Text style={styles.addEvidenceActionSub}>
                Upload photo evidence showing this issue has been resolved.
              </Text>
            </View>
            <Text style={styles.addEvidenceArrow}>→</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  sectionHeading: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  verifiedBadge: {
    backgroundColor: '#EDFDF5',
    borderColor: '#B9F1D4',
  },
  verifiedBadgeText: {
    color: colors.success,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  pendingBadge: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  pendingBadgeText: {
    color: colors.warning,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  rejectedBadge: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
  },
  rejectedBadgeText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  comparisonContainer: {
    gap: spacing.md,
  },
  rowComparison: {
    flexDirection: 'row',
  },
  columnComparison: {
    flexDirection: 'column',
  },
  evidenceBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.sm,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  beforeLabel: {
    backgroundColor: colors.borderSubtle,
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  afterLabel: {
    backgroundColor: '#EDFDF5',
    color: colors.success,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#B9F1D4',
  },
  labelSub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.regular,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: radii.md,
    overflow: 'hidden',
    height: 180,
    backgroundColor: colors.borderSubtle,
  },
  evidenceImage: {
    width: '100%',
    height: '100%',
  },
  tapEnlargeBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(23, 32, 51, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tapEnlargeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },
  emptyPlaceholder: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  emptyIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  missingAfterPlaceholder: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  missingIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  missingTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  missingDesc: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 8,
  },
  evidenceDescriptionBox: {
    marginTop: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  descriptionLabel: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
  },
  descriptionText: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
    marginTop: 2,
    lineHeight: 16,
  },
  evidenceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  metaUploaderText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  metaDateText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  resolvedNoPhotoBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  resolvedNoPhotoText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  singleBeforeWrapper: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.sm,
  },
  pendingBorder: {
    borderColor: '#FDE047',
    backgroundColor: '#FEFDF5',
  },
  pendingLabel: {
    backgroundColor: '#FEF9C3',
    color: colors.warning,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  neutralBadge: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
  },
  neutralBadgeText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  addEvidenceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: '#D4E2FC',
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  addEvidenceActionIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  addEvidenceActionTextWrap: {
    flex: 1,
  },
  addEvidenceActionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  addEvidenceActionSub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addEvidenceArrow: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.xs,
  },
});

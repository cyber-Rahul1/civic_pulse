import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, typography, spacing } from '../theme/tokens';
import { ResolutionEvidenceDto } from '@civic-pulse/contracts';

interface BeforeAfterEvidenceProps {
  beforePhotoUrl?: string | null;
  afterEvidence?: ResolutionEvidenceDto | null;
  onImagePress?: (url: string) => void;
}

export const BeforeAfterEvidence: React.FC<BeforeAfterEvidenceProps> = ({
  beforePhotoUrl,
  afterEvidence,
  onImagePress,
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionHeading}>📸 Resolution Evidence</Text>
        {afterEvidence?.verificationStatus && (
          <View
            style={[
              styles.verificationBadge,
              afterEvidence.verificationStatus === 'VERIFIED'
                ? styles.verifiedBadge
                : afterEvidence.verificationStatus === 'REJECTED'
                  ? styles.rejectedBadge
                  : styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                afterEvidence.verificationStatus === 'VERIFIED'
                  ? styles.verifiedBadgeText
                  : afterEvidence.verificationStatus === 'REJECTED'
                    ? styles.rejectedBadgeText
                    : styles.pendingBadgeText,
              ]}
            >
              {afterEvidence.verificationStatus === 'VERIFIED'
                ? '✓ Verified Resolution'
                : afterEvidence.verificationStatus === 'REJECTED'
                  ? '✕ Evidence Rejected'
                  : '⏳ Proposed Evidence (Pending Review)'}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.comparisonContainer, isWide ? styles.rowComparison : styles.columnComparison]}>
        {/* BEFORE BOX */}
        <View style={[styles.evidenceBox, isWide ? styles.halfWidth : styles.fullWidth]}>
          <View style={styles.labelHeader}>
            <Text style={styles.beforeLabel}>BEFORE</Text>
            <Text style={styles.labelSub}>Original Report</Text>
          </View>

          {beforePhotoUrl ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onImagePress && onImagePress(beforePhotoUrl)}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: beforePhotoUrl }} style={styles.evidenceImage} resizeMode="cover" />
              <View style={styles.tapEnlargeBadge}>
                <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyPlaceholder}>
              <Text style={styles.emptyIcon}>📷</Text>
              <Text style={styles.emptyText}>No original photo provided</Text>
            </View>
          )}
        </View>

        {/* AFTER BOX */}
        <View style={[styles.evidenceBox, isWide ? styles.halfWidth : styles.fullWidth]}>
          <View style={styles.labelHeader}>
            <Text style={styles.afterLabel}>AFTER</Text>
            <Text style={styles.labelSub}>
              {afterEvidence ? (afterEvidence.isOfficialRepresentativeSubmission ? 'Official Work' : 'Community Submission') : 'Pending Fix'}
            </Text>
          </View>

          {afterEvidence?.media?.secureUrl || afterEvidence?.media?.url ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                onImagePress &&
                onImagePress(afterEvidence.media.secureUrl || afterEvidence.media.url)
              }
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: afterEvidence.media.secureUrl || afterEvidence.media.url }}
                style={styles.evidenceImage}
                resizeMode="cover"
              />
              <View style={styles.tapEnlargeBadge}>
                <Text style={styles.tapEnlargeText}>🔍 Tap to view</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.missingAfterPlaceholder}>
              <Text style={styles.missingIcon}>⏳</Text>
              <Text style={styles.missingTitle}>No resolution photo yet</Text>
              <Text style={styles.missingDesc}>
                Awaiting authorized officer or verified representative to upload after-resolution evidence.
              </Text>
            </View>
          )}

          {afterEvidence?.description && (
            <View style={styles.evidenceDescriptionBox}>
              <Text style={styles.descriptionLabel}>Work Description:</Text>
              <Text style={styles.descriptionText}>{afterEvidence.description}</Text>
            </View>
          )}

          {afterEvidence && (
            <View style={styles.evidenceMetaRow}>
              <Text style={styles.metaUploaderText}>
                By: {afterEvidence.uploaderName || 'Official'} ({afterEvidence.uploaderRole})
              </Text>
              <Text style={styles.metaDateText}>
                {new Date(afterEvidence.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedBadge: {
    backgroundColor: '#DCFCE7',
  },
  verifiedBadgeText: {
    color: '#15803D',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  pendingBadge: {
    backgroundColor: '#FEF9C3',
  },
  pendingBadgeText: {
    color: '#854D0E',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  rejectedBadge: {
    backgroundColor: '#FEE2E2',
  },
  rejectedBadgeText: {
    color: '#B91C1C',
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
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: '#E2E8F0',
    color: '#475569',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  afterLabel: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelSub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.regular,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  evidenceImage: {
    width: '100%',
    height: '100%',
  },
  tapEnlargeBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    padding: spacing.xs,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
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
  },
  evidenceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
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
});

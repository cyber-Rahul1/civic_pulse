import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {
  ReportDto,
  CommentDto,
  CommunitySummaryDto,
  PublicAssignmentViewDto,
  ResolutionEvidenceDto,
  ReportRepresentativeAssociationDto,
  EvidenceType,
  RepresentativeVerificationStatus,
} from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { useAuth } from '../context/auth-context';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ErrorState } from '../components/FeedbackStates';
import { SkeletonDetailView } from '../components/ShimmerSkeleton';
import { BeforeAfterEvidence } from '../components/BeforeAfterEvidence';
import { CameraCaptureModal, PhotoCaptureResult } from '../components/CameraCaptureModal';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface ReportDetailScreenProps {
  reportId: string;
  onBack: () => void;
  onNavigateToLocation?: (reportId: string, coordinates: [number, number]) => void;
  onSelectRepresentative?: (representativeId: string) => void;
}

export const ReportDetailScreen: React.FC<ReportDetailScreenProps> = ({
  reportId,
  onBack,
  onNavigateToLocation,
  onSelectRepresentative,
}) => {
  const { user } = useAuth();
  const [report, setReport] = useState<ReportDto | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<PublicAssignmentViewDto | null>(null);
  const [representatives, setRepresentatives] = useState<ReportRepresentativeAssociationDto[]>([]);
  const [communitySummary, setCommunitySummary] = useState<CommunitySummaryDto | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  
  // Resolution Photo Upload Modal State
  const [showUploadEvidenceModal, setShowUploadEvidenceModal] = useState(false);
  const [evidenceDescription, setEvidenceDescription] = useState('');
  const [isUploadingEvidence, setIsUploadingEvidence] = useState(false);
  const [evidenceUploadSuccess, setEvidenceUploadSuccess] = useState<string | null>(null);
  const [evidenceUploadError, setEvidenceUploadError] = useState<string | null>(null);

  // Actions state
  const [isEndorsing, setIsEndorsing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  // Reply State (One level allowed)
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [repliesMap, setRepliesMap] = useState<Record<string, CommentDto[]>>({});
  
  // Media State
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [imageLoadingMap, setImageLoadingMap] = useState<Record<string, boolean>>({});
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Comments Pagination
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [isFetchingMoreComments, setIsFetchingMoreComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  // Loading & Error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [evidenceList, setEvidenceList] = useState<ResolutionEvidenceDto[]>([]);

  const fetchReportDetails = useCallback(async () => {
    try {
      setError(null);
      setCommentsError(null);
      const [reportData, historyData, assignmentData, repsData, communityData, commentsData, evidenceData] =
        await Promise.all([
          apiClient.getReport(reportId),
          apiClient.getReportHistory(reportId).catch(() => []),
          apiClient.getPublicAssignment(reportId).catch(() => null),
          apiClient.getReportRepresentatives(reportId).catch(() => []),
          apiClient.getCommunitySummary(reportId).catch(() => null),
          apiClient.listComments(reportId, 1, 10).catch(() => ({ items: [], total: 0, page: 1, totalPages: 1 })),
          apiClient.getReportEvidence(reportId).catch(() => []),
        ]);

      setReport(reportData);
      setHistory(historyData || []);
      setAssignment(assignmentData);
      setRepresentatives(repsData || []);
      setCommunitySummary(communityData);
      setEvidenceList(evidenceData || []);
      const initialComments = commentsData?.items || [];
      setComments(initialComments);
      setCommentsPage(1);
      const totalPages = (commentsData as any)?.meta?.totalPages || commentsData?.totalPages || 1;
      setHasMoreComments(1 < totalPages && initialComments.length > 0);
    } catch (err: any) {
      setError(err?.message || 'Failed to load report details');
    } finally {
      setIsLoading(false);
    }
  }, [reportId]);

  // Handle Resident / Community Resolution Photo Upload
  const handlePhotoAcceptedForEvidence = async (photo: PhotoCaptureResult) => {
    setShowUploadEvidenceModal(false);
    setIsUploadingEvidence(true);
    setEvidenceUploadError(null);
    setEvidenceUploadSuccess(null);

    try {
      // 1. Sign upload with Cloudinary CDN pipeline
      const signRes = await apiClient.signMediaUpload({ resourceType: 'image' });
      const uploadUrl = `https://api.cloudinary.com/v1_1/${signRes.cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.name || 'civic_resolution_evidence.jpg',
      } as any);
      formData.append('api_key', signRes.apiKey);
      formData.append('timestamp', String(signRes.timestamp));
      formData.append('signature', signRes.signature);
      formData.append('folder', signRes.uploadFolder);
      formData.append('public_id', signRes.publicId);

      const cloudRes = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!cloudRes.ok) {
        const errData = await cloudRes.json().catch(() => ({}));
        throw new Error(errData?.error?.message || 'Failed to upload photo to Cloudinary CDN.');
      }

      const uploadResult = await cloudRes.json();
      const mediaItem = {
        mediaId: signRes.publicId,
        publicId: uploadResult.public_id || signRes.publicId,
        url: uploadResult.url || uploadResult.secure_url,
        secureUrl: uploadResult.secure_url || uploadResult.url,
        format: uploadResult.format || 'jpg',
        resourceType: 'image' as const,
        bytes: uploadResult.bytes || 1024,
      };

      // 2. Persist resolution evidence record on the backend
      const savedEvidence = await apiClient.submitResolutionEvidence(reportId, {
        evidenceType: EvidenceType.AFTER,
        media: mediaItem,
        description: evidenceDescription.trim() || undefined,
      });

      // 3. Immediately refresh evidence list without app restart
      setEvidenceList((prev) => [savedEvidence, ...prev]);
      setEvidenceDescription('');
      setEvidenceUploadSuccess(
        savedEvidence.verificationStatus === 'VERIFIED'
          ? 'Resolution evidence verified and added successfully.'
          : 'Resolution photo submitted! It is now pending official review.'
      );
    } catch (err: any) {
      setEvidenceUploadError(err?.message || 'Failed to submit resolution photo. Please try again.');
    } finally {
      setIsUploadingEvidence(false);
    }
  };

  const handleLoadMoreComments = useCallback(async () => {
    if (isFetchingMoreComments || !hasMoreComments) return;
    setIsFetchingMoreComments(true);
    setCommentsError(null);
    const nextPage = commentsPage + 1;
    try {
      const res = await apiClient.listComments(reportId, nextPage, 10);
      const newItems = res?.items || [];
      const totalPages = (res as any)?.meta?.totalPages || res?.totalPages || 1;
      setComments((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const filtered = newItems.filter((c) => !existingIds.has(c.id));
        return [...prev, ...filtered];
      });
      setCommentsPage(nextPage);
      setHasMoreComments(nextPage < totalPages && newItems.length > 0);
    } catch (err: any) {
      setCommentsError(err?.message || 'Failed to load more comments. Tap to retry.');
    } finally {
      setIsFetchingMoreComments(false);
    }
  }, [commentsPage, hasMoreComments, isFetchingMoreComments, reportId]);

  useEffect(() => {
    setIsLoading(true);
    fetchReportDetails();
  }, [fetchReportDetails]);

  // Endorsement Action
  const handleToggleEndorsement = async () => {
    console.log('[ReportDetailScreen] handleToggleEndorsement clicked, isEndorsing:', isEndorsing, 'communitySummary:', Boolean(communitySummary));
    if (!communitySummary || isEndorsing) return;
    setIsEndorsing(true);
    try {
      if (communitySummary.isEndorsedByCaller) {
        console.log('[ReportDetailScreen] Removing endorsement...');
        const res = await apiClient.removeEndorsement(reportId);
        setCommunitySummary((prev) =>
          prev
            ? {
                ...prev,
                isEndorsedByCaller: res.isEndorsedByCaller,
                endorsementCount: res.endorsementCount,
              }
            : null
        );
      } else {
        const res = await apiClient.endorseReport(reportId);
        setCommunitySummary((prev) =>
          prev
            ? {
                ...prev,
                isEndorsedByCaller: res.isEndorsedByCaller,
                endorsementCount: res.endorsementCount,
              }
            : null
        );
      }
    } catch {
      // Ignore network errors or gracefully handle
    } finally {
      setIsEndorsing(false);
    }
  };

  // Follow Action
  const handleToggleFollow = async () => {
    if (!communitySummary || isFollowing) return;
    setIsFollowing(true);
    try {
      if (communitySummary.isFollowedByCaller) {
        await apiClient.unfollowReport(reportId);
        setCommunitySummary((prev) =>
          prev
            ? {
                ...prev,
                isFollowedByCaller: false,
                followerCount: Math.max(0, prev.followerCount - 1),
              }
            : null
        );
      } else {
        await apiClient.followReport(reportId);
        setCommunitySummary((prev) =>
          prev
            ? {
                ...prev,
                isFollowedByCaller: true,
                followerCount: prev.followerCount + 1,
              }
            : null
        );
      }
    } catch {
      // rollback
    } finally {
      setIsFollowing(false);
    }
  };

  // Submit Comment or Reply
  const handlePostComment = async () => {
    if (!newCommentText.trim() || isSubmittingComment) return;
    setIsSubmittingComment(true);
    try {
      const created = await apiClient.createComment(reportId, {
        content: newCommentText.trim(),
        parentCommentId: replyingToCommentId || undefined,
      });

      if (replyingToCommentId) {
        setRepliesMap((prev) => ({
          ...prev,
          [replyingToCommentId]: [...(prev[replyingToCommentId] || []), created],
        }));
        setReplyingToCommentId(null);
      } else {
        setComments((prev) => [created, ...prev]);
        setCommunitySummary((prev) =>
          prev ? { ...prev, commentCount: prev.commentCount + 1 } : null
        );
      }
      setNewCommentText('');
    } catch (err: any) {
      // alert error
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const loadRepliesForComment = async (commentId: string) => {
    try {
      const replies = await apiClient.listReplies(commentId);
      setRepliesMap((prev) => ({
        ...prev,
        [commentId]: replies,
      }));
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    if (!report) return;
    try {
      await Share.share({
        title: report.title,
        message: `CivicPulse Issue: "${report.title}"\nStatus: ${report.status}\nLocation: ${report.locationDescription || 'Community'}`,
      });
    } catch {
      // ignore
    }
  };

  if (isLoading) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Report Record</Text>
          <View style={{ width: 48 }} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: spacing.hero }}>
          <SkeletonDetailView />
        </ScrollView>
      </View>
    );
  }

  if (error || !report) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <ErrorState
          title="Could not display report"
          description={error || 'Report not found or unavailable'}
          onAction={fetchReportDetails}
        />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      {/* Top App / Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Back to reports">
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} accessibilityRole="button" accessibilityLabel="Share report">
          <Text style={styles.shareText}>📤 Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={200}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 180;
          if (isCloseToBottom && hasMoreComments && !isFetchingMoreComments) {
            handleLoadMoreComments();
          }
        }}
      >

        {/* Status & Category */}
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{report.category}</Text>
          <StatusBadge status={report.status} />
        </View>

        {/* Title & Metadata */}
        <Text style={styles.reportTitle}>{report.title}</Text>
        <Text style={styles.metaText}>
          Reported {new Date(report.createdAt).toLocaleDateString()} • ID: {report.id.substring(0, 8)}
        </Text>

        {/* Location Box */}
        {(report.locationDescription || report.location) && (
          <TouchableOpacity
            style={styles.locationBox}
            activeOpacity={report.location?.coordinates ? 0.7 : 1}
            onPress={() => {
              if (report.location?.coordinates && onNavigateToLocation) {
                onNavigateToLocation(report.id, report.location.coordinates);
              }
            }}
            accessibilityRole={report.location?.coordinates ? 'button' : undefined}
            accessibilityLabel="View issue location on Community Map"
          >
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationTextContainer}>
              <View style={styles.locationTitleRow}>
                <Text style={styles.locationTitle}>
                  {report.locationDescription || 'Public Location'}
                </Text>
                {report.location?.coordinates && (
                  <Text style={styles.viewOnMapBadge}>View on Map →</Text>
                )}
              </View>
              <Text style={styles.locationSub}>
                {report.location?.coordinates
                  ? `Protected public coordinates: ${report.location.coordinates[1].toFixed(4)}, ${report.location.coordinates[0].toFixed(4)}`
                  : 'Approximate area without direct GPS coordinates'}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Media Attachments Section */}
        {report.media && report.media.length > 0 && (
          <View style={styles.mediaSection}>
            <Text style={styles.sectionTitle}>Attached Photos ({report.media.length})</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaScrollList}
            >
              {report.media.map((mediaItem, idx) => {
                const imgUri = mediaItem.secureUrl || mediaItem.url;
                const key = mediaItem.mediaId || mediaItem.publicId || String(idx);
                const isImgLoading = imageLoadingMap[key] ?? true;
                const hasImgError = imageErrorMap[key] ?? false;

                if (!imgUri) return null;

                return (
                  <TouchableOpacity
                    key={key}
                    style={styles.mediaCard}
                    activeOpacity={0.85}
                    onPress={() => setSelectedImageUri(imgUri)}
                    accessibilityRole="button"
                    accessibilityLabel={`View photo ${idx + 1}`}
                  >
                    <Image
                      source={{ uri: imgUri }}
                      style={styles.mediaImage}
                      resizeMode="cover"
                      onLoadStart={() =>
                        setImageLoadingMap((prev) => ({ ...prev, [key]: true }))
                      }
                      onLoadEnd={() =>
                        setImageLoadingMap((prev) => ({ ...prev, [key]: false }))
                      }
                      onError={() =>
                        setImageErrorMap((prev) => ({ ...prev, [key]: true }))
                      }
                    />

                    {isImgLoading && !hasImgError && (
                      <View style={styles.mediaImagePlaceholder}>
                        <ActivityIndicator size="small" color={colors.primary} />
                        <Text style={styles.mediaLoadingText}>Loading...</Text>
                      </View>
                    )}

                    {hasImgError && (
                      <View style={styles.mediaErrorPlaceholder}>
                        <Text style={styles.mediaErrorIcon}>⚠️</Text>
                        <Text style={styles.mediaErrorText}>Unable to load image</Text>
                      </View>
                    )}

                    <View style={styles.mediaBadge}>
                      <Text style={styles.mediaBadgeText}>🔍 Tap to enlarge</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Full-Screen Image Modal */}
        <Modal
          visible={!!selectedImageUri}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedImageUri(null)}
        >
          <View style={styles.modalBackdrop}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSelectedImageUri(null)}
              accessibilityRole="button"
              accessibilityLabel="Close image viewer"
            >
              <Text style={styles.modalCloseText}>✕ Close</Text>
            </TouchableOpacity>

            {selectedImageUri && (
              <Image
                source={{ uri: selectedImageUri }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Modal>

        {/* Responsible Department (Operational Execution) */}
        {assignment?.currentAssignment && (
          <View style={styles.assignmentBox}>
            <Text style={styles.assignmentHeader}>🏛️ Responsible Department (Operations & Repairs)</Text>
            <Text style={styles.departmentName}>
              {assignment.currentAssignment.departmentName}
            </Text>
            <Text style={styles.assignmentJurisdiction}>
              Operational Jurisdiction: {assignment.currentAssignment.jurisdiction}
            </Text>
          </View>
        )}

        {/* Responsible Representative / Local Representative Section */}
        <View style={styles.representativesSection}>
          <Text style={styles.representativesHeader}>🏛️ Area Representatives</Text>
          {representatives.length === 0 ? (
            <View style={styles.noRepCard}>
              <Text style={styles.noRepText}>
                Representative information is not available for this location yet.
              </Text>
            </View>
          ) : (
            representatives.map((rep) => {
              const isVerifiedOfficial =
                rep.verificationStatus === RepresentativeVerificationStatus.VERIFIED_OFFICIAL;
              const isPending =
                rep.verificationStatus === RepresentativeVerificationStatus.FLAGGED_FOR_REVIEW ||
                rep.verificationStatus === RepresentativeVerificationStatus.UNVERIFIED;

              return (
                <View key={rep.id || rep.representativeId} style={styles.representativeCard}>
                  <View style={styles.repTopRow}>
                    {/* Clickable Portrait / Avatar */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => onSelectRepresentative && onSelectRepresentative(rep.representativeId)}
                      style={styles.repAvatarTouchable}
                      accessibilityRole="button"
                      accessibilityLabel={`View profile of ${rep.representativeName}`}
                    >
                      {rep.photoUrl && rep.isPhotoVerified ? (
                        <Image source={{ uri: rep.photoUrl }} style={styles.repAvatarImage} resizeMode="cover" />
                      ) : (
                        <View style={styles.repAvatarFallback}>
                          <Text style={styles.repAvatarInitial}>
                            {rep.representativeName.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    {/* Details Column */}
                    <View style={styles.repDetailsCol}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onSelectRepresentative && onSelectRepresentative(rep.representativeId)}
                      >
                        <Text style={styles.repName}>{rep.representativeName}</Text>
                      </TouchableOpacity>

                      <Text style={styles.repDesignation}>
                        {rep.officialDesignation || rep.officeType}
                      </Text>

                      <Text style={styles.repJurisdiction}>{rep.jurisdictionName}</Text>

                      {rep.partyAffiliation && isVerifiedOfficial && (
                        <Text style={styles.repParty}>Party: {rep.partyAffiliation}</Text>
                      )}

                      <View style={styles.repBadgeRow}>
                        {isVerifiedOfficial ? (
                          <View style={styles.repVerifiedBadge}>
                            <Text style={styles.repVerifiedBadgeText}>✓ Officially verified</Text>
                          </View>
                        ) : isPending ? (
                          <View style={styles.repPendingBadge}>
                            <Text style={styles.repPendingBadgeText}>⏳ Verification pending</Text>
                          </View>
                        ) : (
                          <View style={styles.repNeutralBadge}>
                            <Text style={styles.repNeutralBadgeText}>Active Term</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Clickable Action to Public Profile */}
                  <TouchableOpacity
                    style={styles.viewProfileBtn}
                    activeOpacity={0.8}
                    onPress={() => onSelectRepresentative && onSelectRepresentative(rep.representativeId)}
                    accessibilityRole="button"
                    accessibilityLabel={`View public profile of ${rep.representativeName}`}
                  >
                    <Text style={styles.viewProfileBtnText}>View Public Profile →</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>

        {/* Issue Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{report.description}</Text>

        {/* Resolution Evidence Notifications */}
        {evidenceUploadSuccess && (
          <View style={styles.evidenceSuccessBox}>
            <Text style={styles.evidenceSuccessText}>✅ {evidenceUploadSuccess}</Text>
          </View>
        )}
        {evidenceUploadError && (
          <View style={styles.evidenceErrorBox}>
            <Text style={styles.evidenceErrorText}>⚠️ {evidenceUploadError}</Text>
          </View>
        )}

        {/* Resolution Before/After Comparison Component */}
        <BeforeAfterEvidence
          beforePhotoUrl={
            report.media && report.media.length > 0
              ? (report.media[0]?.secureUrl || report.media[0]?.url || null)
              : null
          }
          afterEvidence={evidenceList.find((e) => e.evidenceType === 'AFTER') || null}
          reportStatus={report.status}
          resolutionNotes={report.resolutionNotes}
          onImagePress={(uri) => setSelectedImageUri(uri)}
          onAddResolutionPhotoPress={() => setShowUploadEvidenceModal(true)}
          canUploadEvidence={Boolean(user)}
        />

        {/* Resolution Notes (if resolved) */}
        {report.resolutionNotes && (
          <View style={styles.resolutionBox}>
            <Text style={styles.resolutionTitle}>✅ Resolution Notes</Text>
            <Text style={styles.resolutionText}>{report.resolutionNotes}</Text>
          </View>
        )}

        {/* Community Actions (Endorse & Follow) */}
        <View style={styles.communityActionRow}>
          <Button
            title={`👍 ${communitySummary?.isEndorsedByCaller ? 'Endorsed' : 'Endorse'} (${communitySummary?.endorsementCount || 0})`}
            onPress={handleToggleEndorsement}
            variant={communitySummary?.isEndorsedByCaller ? 'primary' : 'outline'}
            size="sm"
            loading={isEndorsing}
            style={styles.communityBtn}
          />
          <Button
            title={`🔔 ${communitySummary?.isFollowedByCaller ? 'Following' : 'Follow'} (${communitySummary?.followerCount || 0})`}
            onPress={handleToggleFollow}
            variant={communitySummary?.isFollowedByCaller ? 'secondary' : 'outline'}
            size="sm"
            loading={isFollowing}
            style={styles.communityBtn}
          />
        </View>

        {/* Status Transition Timeline */}
        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Timeline & Status History</Text>
            {history.map((record, index) => (
              <View key={record.transitionId || index} style={styles.timelineItem}>
                <View style={styles.timelineBullet} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineStatus}>
                    {record.previousStatus ? `${record.previousStatus} ➔ ` : 'Created ➔ '}
                    {record.newStatus}
                  </Text>
                  <Text style={styles.timelineDate}>
                    {new Date(record.timestamp).toLocaleString()} • {record.actorRole || 'System'}
                  </Text>
                  {record.reason && (
                    <Text style={styles.timelineReason}>"{record.reason}"</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Discussion & Comments */}
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>
            Community Discussion ({communitySummary?.commentCount || comments.length})
          </Text>

          {/* Add Comment Input */}
          <View style={styles.commentInputBox}>
            {replyingToCommentId && (
              <View style={styles.replyingNotice}>
                <Text style={styles.replyingText}>Replying to comment...</Text>
                <TouchableOpacity onPress={() => setReplyingToCommentId(null)}>
                  <Text style={styles.cancelReplyText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            <Input
              placeholder={replyingToCommentId ? 'Write a reply...' : 'Share community feedback...'}
              value={newCommentText}
              onChangeText={setNewCommentText}
              multiline
              numberOfLines={2}
            />

            <Button
              title={replyingToCommentId ? 'Post Reply' : 'Post Comment'}
              onPress={handlePostComment}
              loading={isSubmittingComment}
              size="sm"
            />
          </View>

          {/* Comment List */}
          {comments.length === 0 ? (
            <View style={styles.emptyCommentsCard}>
              <Text style={styles.emptyCommentsIcon}>💬</Text>
              <Text style={styles.emptyCommentsTitle}>No community comments yet</Text>
              <Text style={styles.emptyCommentsSubtitle}>
                Be the first neighbor or community member to share updates or ask questions about this report.
              </Text>
            </View>
          ) : (
            comments.map((c) => {
              const replies = repliesMap[c.id] || [];
              return (
                <View key={c.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>
                      {c.authorUserId === user?.id ? 'You' : 'Resident'}
                    </Text>
                    <Text style={styles.commentDate}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.commentContent}>{c.content}</Text>

                  <View style={styles.commentActionRow}>
                    <TouchableOpacity
                      onPress={() => {
                        setReplyingToCommentId(c.id);
                      }}
                    >
                      <Text style={styles.replyActionText}>💬 Reply</Text>
                    </TouchableOpacity>

                    {c.replyCount > 0 && !repliesMap[c.id] && (
                      <TouchableOpacity onPress={() => loadRepliesForComment(c.id)}>
                        <Text style={styles.viewRepliesText}>
                          View {c.replyCount} {c.replyCount === 1 ? 'reply' : 'replies'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* 1-Level Replies */}
                  {replies.map((reply) => (
                    <View key={reply.id} style={styles.replyCard}>
                      <Text style={styles.replyAuthor}>
                        ↳ {reply.authorUserId === user?.id ? 'You' : 'Resident'}
                      </Text>
                      <Text style={styles.replyContent}>{reply.content}</Text>
                    </View>
                  ))}
                </View>
              );
            })
          )}

          {/* Comments Pagination Loader & Error Recovery */}
          {isFetchingMoreComments && (
            <View style={styles.loadMoreRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadMoreText}>Loading more comments...</Text>
            </View>
          )}

          {commentsError && (
            <TouchableOpacity
              style={styles.commentsRetryBtn}
              onPress={handleLoadMoreComments}
              activeOpacity={0.7}
            >
              <Text style={styles.commentsRetryText}>⚠️ {commentsError}</Text>
            </TouchableOpacity>
          )}

          {!hasMoreComments && comments.length > 10 && (
            <View style={styles.endOfCommentsContainer}>
              <Text style={styles.endOfCommentsText}>✓ All comments loaded</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Camera Capture Modal for Adding Resolution Photo */}
      {showUploadEvidenceModal && (
        <CameraCaptureModal
          onPhotoAccepted={handlePhotoAcceptedForEvidence}
          onSkip={() => setShowUploadEvidenceModal(false)}
          onCancel={() => setShowUploadEvidenceModal(false)}
        />
      )}

      {/* Uploading Evidence Spinner Overlay */}
      {isUploadingEvidence && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.uploadingOverlayText}>Uploading resolution photo evidence...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.hero,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
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
  navTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  shareText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  reportTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: 28,
  },
  metaText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    flex: 1,
  },
  viewOnMapBadge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  locationSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  assignmentBox: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#D4E2FC',
    marginBottom: spacing.md,
  },
  assignmentHeader: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: 2,
  },
  departmentName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  assignmentJurisdiction: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing.md,
  },
  resolutionBox: {
    backgroundColor: colors.successBackground,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.successBorder,
    marginBottom: spacing.md,
  },
  resolutionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.success,
    marginBottom: 2,
  },
  resolutionText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  communityActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  communityBtn: {
    flex: 1,
  },
  historySection: {
    marginVertical: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  timelineBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 5,
    marginRight: spacing.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  timelineDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  timelineReason: {
    fontSize: typography.sizes.xs,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginTop: 2,
  },
  commentsSection: {
    marginTop: spacing.lg,
  },
  commentInputBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  replyingNotice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  replyingText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  cancelReplyText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
  },
  commentCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  commentAuthor: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  commentDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  commentContent: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    lineHeight: typography.lineHeights.normal,
    marginBottom: spacing.xs,
  },
  commentActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  replyActionText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  viewRepliesText: {
    fontSize: typography.sizes.xs,
    color: colors.action,
    fontWeight: typography.weights.semibold,
  },
  replyCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
    marginLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  replyAuthor: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
  },
  replyContent: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
    marginTop: 2,
  },
  // Media Section Styles
  mediaSection: {
    marginVertical: spacing.md,
  },
  mediaScrollList: {
    paddingVertical: spacing.xs,
    gap: spacing.md,
  },
  mediaCard: {
    width: 260,
    height: 180,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaImagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaLoadingText: {
    marginTop: spacing.xs,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  mediaErrorPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.errorBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  mediaErrorIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  mediaErrorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  mediaBadge: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(23, 32, 51, 0.75)',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  mediaBadgeText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height * 0.75,
  },
  commentsRetryBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.warningBackground,
    borderWidth: 1,
    borderColor: colors.warningBorder,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  commentsRetryText: {
    fontSize: typography.sizes.sm,
    color: colors.warning,
    fontWeight: '600',
  },
  loadMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  loadMoreText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  endOfCommentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  endOfCommentsText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
  emptyCommentsCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  emptyCommentsIcon: {
    fontSize: 26,
    marginBottom: spacing.xs,
  },
  emptyCommentsTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyCommentsSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  // Representatives Section Styles
  representativesSection: {
    marginBottom: spacing.md,
  },
  representativesHeader: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  noRepCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    alignItems: 'center',
  },
  noRepText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  representativeCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  repTopRow: {
    flexDirection: 'row',
  },
  repAvatarTouchable: {
    marginRight: spacing.md,
  },
  repAvatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.borderSubtle,
  },
  repAvatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4E2FC',
  },
  repAvatarInitial: {
    fontSize: 22,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  repDetailsCol: {
    flex: 1,
  },
  repName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  repDesignation: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
    marginTop: 1,
  },
  repJurisdiction: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 1,
  },
  repParty: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  repBadgeRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  repVerifiedBadge: {
    backgroundColor: '#EDFDF5',
    borderColor: '#B9F1D4',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  repVerifiedBadgeText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: typography.weights.bold,
  },
  repPendingBadge: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  repPendingBadgeText: {
    color: colors.warning,
    fontSize: 10,
    fontWeight: typography.weights.bold,
  },
  repNeutralBadge: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  repNeutralBadgeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },
  viewProfileBtn: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    alignItems: 'flex-end',
  },
  viewProfileBtnText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  // Evidence Feedback Banners
  evidenceSuccessBox: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBorder,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  evidenceSuccessText: {
    color: colors.success,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  evidenceErrorBox: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  evidenceErrorText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  // Uploading Overlay
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23, 32, 51, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  uploadingOverlayText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    marginTop: spacing.md,
  },
});

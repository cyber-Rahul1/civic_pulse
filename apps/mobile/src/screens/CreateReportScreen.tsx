import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  ReportCategory,
  CreateReportDto,
  AP_DISTRICTS_DATA,
  isCoordinateInAndhraPradesh,
  resolveLocationFromCoordinates,
  validateAdministrativeConsistency,
  DistrictHierarchyItem,
  MandalItem,
  LocalityItem,
  GpsEligibilityStatus,
  LocationVerificationStatus,
} from '@civic-pulse/contracts';
import { useAuth } from '../context/auth-context';
import { apiClient } from '../api/api-client';
import { CameraCaptureModal, PhotoCaptureResult } from '../components/CameraCaptureModal';
import { prependReportToOfflineCache } from '../storage/offline-cache';

interface CreateReportScreenProps {
  onBack: () => void;
  onSuccess: (reportId: string) => void;
}

interface CategoryOption {
  value: ReportCategory;
  title: string;
  subtitle: string;
  icon: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: ReportCategory.POTHOLE,
    title: 'Pothole',
    subtitle: 'Roads & Streets',
    icon: '🕳️',
  },
  {
    value: ReportCategory.GARBAGE,
    title: 'Garbage',
    subtitle: 'Waste collection',
    icon: '🗑️',
  },
  {
    value: ReportCategory.STREETLIGHT,
    title: 'Streetlight',
    subtitle: 'Electrical repair',
    icon: '💡',
  },
  {
    value: ReportCategory.DRAINAGE,
    title: 'Drainage',
    subtitle: 'Overflow / Clog',
    icon: '🌊',
  },
  {
    value: ReportCategory.WATER,
    title: 'Water Supply',
    subtitle: 'Pipeline leaks',
    icon: '💧',
  },
  {
    value: ReportCategory.ROAD_DAMAGE,
    title: 'Road Damage',
    subtitle: 'Cracks & Cave-ins',
    icon: '🚧',
  },
  {
    value: ReportCategory.PUBLIC_SAFETY,
    title: 'Public Safety',
    subtitle: 'Encroachment',
    icon: '🛡️',
  },
  {
    value: ReportCategory.OTHER,
    title: 'Other Issue',
    subtitle: 'General civic complaint',
    icon: '📄',
  },
];

export const CreateReportScreen: React.FC<CreateReportScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const { user, updateUser } = useAuth();

  // Step 1: Camera modal flow
  const [showCameraFlow, setShowCameraFlow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCaptureResult | null>({
    uri: '',
    name: 'civic_evidence_pothole_oct26.jpg',
    type: 'image/jpeg',
  });

  // Form Fields
  const [title, setTitle] = useState('Deep road pothole causing traffic slowdown');
  const [description, setDescription] = useState(
    'Hazardous depression of around 1.5 feet depth on the north lane. Causes vehicle instability especially during evening traffic hours. Two two-wheelers observed slipping.'
  );
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.POTHOLE);
  const [landmarkDetails, setLandmarkDetails] = useState('Old Club Road, Near Arundelpet 3rd Line Junction');

  // Hierarchical Andhra Pradesh Location Selector (Issue Location)
  const lockedStateName = 'Andhra Pradesh';
  const initialGuntur: DistrictHierarchyItem =
    AP_DISTRICTS_DATA.find((d) => d.id === 'guntur') ?? AP_DISTRICTS_DATA[0]!;
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictHierarchyItem | null>(initialGuntur);
  const [selectedMandal, setSelectedMandal] = useState<MandalItem | null>(
    initialGuntur?.mandals?.find((m) => m.id.includes('guntur') || m.name.toLowerCase().includes('guntur')) ??
      initialGuntur?.mandals?.[0] ??
      null
  );
  const [selectedLocality, setSelectedLocality] = useState<LocalityItem | null>(null);

  // Dropdown UI expanders
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [showMandalPicker, setShowMandalPicker] = useState(false);

  // Issue Location Coordinates [longitude, latitude]
  const [coordinates, setCoordinates] = useState<[number, number] | null>([80.4365, 16.3067]);
  const [issueLocationSource, setIssueLocationSource] = useState<'CURRENT_GPS' | 'ADMINISTRATIVE_SELECTION' | null>('CURRENT_GPS');

  // Verified Current Location (User Device Telemetry)
  const [userLocationStatus, setUserLocationStatus] = useState<LocationVerificationStatus>(
    user?.verifiedCurrentLocation?.status || LocationVerificationStatus.VERIFIED
  );
  const [detectedReporterCoords, setDetectedReporterCoords] = useState<[number, number] | null>(
    user?.verifiedCurrentLocation?.coordinates || [80.4365, 16.3067]
  );
  const [gpsAccuracyMeters, setGpsAccuracyMeters] = useState<number | undefined>(
    user?.verifiedCurrentLocation?.accuracyMeters || 4.8
  );
  const [isVerifyingCurrentGps, setIsVerifyingCurrentGps] = useState(false);
  const [currentLocationMsg, setCurrentLocationMsg] = useState<string | null>(null);
  const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);

  // Issue Location Feedback
  const [issueLocationError, setIssueLocationError] = useState<string | null>(null);

  // Errors & Submission
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string | null>(null);

  // Camera flow handlers
  const handlePhotoAccepted = (photo: PhotoCaptureResult) => {
    setSelectedPhoto(photo);
    setShowCameraFlow(false);
  };

  const handleSkipPhoto = () => {
    setShowCameraFlow(false);
  };

  const handleCancelCamera = () => {
    setShowCameraFlow(false);
  };

  // 1. Verify User's Current Device Location
  const handleVerifyCurrentLocation = async () => {
    setIsVerifyingCurrentGps(true);
    setCurrentLocationError(null);
    setCurrentLocationMsg('Acquiring fresh device GPS telemetry...');

    try {
      let Location: any = null;
      try {
        Location = await import('expo-location');
      } catch {
        Location = null;
      }

      if (Location && typeof Location.requestForegroundPermissionsAsync === 'function') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setIsVerifyingCurrentGps(false);
          setUserLocationStatus(LocationVerificationStatus.UNVERIFIED);
          setCurrentLocationMsg(null);
          setCurrentLocationError('Location permission was denied. Cannot verify your current device position.');
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (position?.coords) {
          const lat = Number(position.coords.latitude.toFixed(4));
          const lng = Number(position.coords.longitude.toFixed(4));
          const accuracy = position.coords.accuracy ? Math.round(position.coords.accuracy * 10) / 10 : undefined;

          setDetectedReporterCoords([lng, lat]);
          setGpsAccuracyMeters(accuracy);

          setCurrentLocationMsg('Verifying with server geographic boundary models...');
          const updatedProfile = await apiClient.verifyCurrentLocation({
            coordinates: [lng, lat],
            accuracyMeters: accuracy ? Math.round(accuracy) : undefined,
            timestamp: position.timestamp || Date.now(),
          });
          updateUser(updatedProfile);
          const verifiedLoc = updatedProfile.verifiedCurrentLocation;
          setUserLocationStatus(verifiedLoc?.status || LocationVerificationStatus.UNVERIFIED);

          if (verifiedLoc?.status === LocationVerificationStatus.VERIFIED) {
            setCurrentLocationMsg(`Verified in ${verifiedLoc.cityOrTown || 'AP'}, ${verifiedLoc.districtName} (${verifiedLoc.state})`);
            setCurrentLocationError(null);
          } else if (verifiedLoc?.status === LocationVerificationStatus.OUTSIDE_AP) {
            setCurrentLocationMsg(null);
            setCurrentLocationError('Your device location is outside Andhra Pradesh.');
          }
        }
      } else if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = Number(pos.coords.latitude.toFixed(4));
            const lng = Number(pos.coords.longitude.toFixed(4));
            const accuracy = pos.coords.accuracy ? Math.round(pos.coords.accuracy * 10) / 10 : undefined;
            setDetectedReporterCoords([lng, lat]);
            setGpsAccuracyMeters(accuracy);

            try {
              const updatedProfile = await apiClient.verifyCurrentLocation({
                coordinates: [lng, lat],
                accuracyMeters: accuracy ? Math.round(accuracy) : undefined,
                timestamp: pos.timestamp || Date.now(),
              });
              updateUser(updatedProfile);
              const verifiedLoc = updatedProfile.verifiedCurrentLocation;
              setUserLocationStatus(verifiedLoc?.status || LocationVerificationStatus.UNVERIFIED);

              if (verifiedLoc?.status === LocationVerificationStatus.VERIFIED) {
                setCurrentLocationMsg(`Verified in ${verifiedLoc.cityOrTown || 'AP'}, ${verifiedLoc.districtName} (${verifiedLoc.state})`);
                setCurrentLocationError(null);
              } else if (verifiedLoc?.status === LocationVerificationStatus.OUTSIDE_AP) {
                setCurrentLocationMsg(null);
                setCurrentLocationError('Your device location is outside Andhra Pradesh.');
              }
            } catch (err: any) {
              setCurrentLocationError(err?.message || 'Server validation failed');
            } finally {
              setIsVerifyingCurrentGps(false);
            }
          },
          (err) => {
            setIsVerifyingCurrentGps(false);
            setUserLocationStatus(LocationVerificationStatus.UNAVAILABLE);
            setCurrentLocationMsg(null);
            setCurrentLocationError(err?.message || 'GPS position unavailable.');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setIsVerifyingCurrentGps(false);
        setUserLocationStatus(LocationVerificationStatus.UNAVAILABLE);
        setCurrentLocationMsg(null);
        setCurrentLocationError('Device GPS sensor unavailable.');
      }
    } catch (err: any) {
      setIsVerifyingCurrentGps(false);
      setUserLocationStatus(LocationVerificationStatus.UNVERIFIED);
      setCurrentLocationMsg(null);
      setCurrentLocationError(err?.message || 'Failed to acquire device location.');
    } finally {
      setIsVerifyingCurrentGps(false);
    }
  };

  // 2. Set Issue Location to Current Verified GPS Coordinates
  const handleUseCurrentGpsForIssue = async () => {
    if (!detectedReporterCoords || userLocationStatus !== LocationVerificationStatus.VERIFIED) {
      await handleVerifyCurrentLocation();
    }

    if (detectedReporterCoords) {
      const [lng, lat] = detectedReporterCoords;
      if (!isCoordinateInAndhraPradesh(lat, lng)) {
        setIssueLocationError('Cannot use current GPS: Detected position is outside Andhra Pradesh.');
        return;
      }

      setCoordinates([lng, lat]);
      setIssueLocationSource('CURRENT_GPS');

      const resolved = resolveLocationFromCoordinates(lat, lng, gpsAccuracyMeters ? Math.round(gpsAccuracyMeters) : undefined);
      if (resolved.districtId) {
        const distMatch = AP_DISTRICTS_DATA.find((d) => d.id === resolved.districtId);
        if (distMatch) {
          setSelectedDistrict(distMatch);
          if (resolved.mandalId) {
            const mandalMatch = distMatch.mandals.find((m) => m.id === resolved.mandalId);
            if (mandalMatch) {
              setSelectedMandal(mandalMatch);
            }
          }
        }
      }

      setIssueLocationError(null);
    }
  };

  const handleSelectDistrict = (dist: DistrictHierarchyItem) => {
    setSelectedDistrict(dist);
    setSelectedMandal(dist.mandals[0] || null);
    setSelectedLocality(null);
    setShowDistrictPicker(false);
    setShowMandalPicker(false);

    if (coordinates && issueLocationSource === 'CURRENT_GPS') {
      const consistency = validateAdministrativeConsistency(dist.id, undefined, undefined, coordinates);
      if (!consistency.isValid) {
        setIssueLocationError(`Selected district ${dist.name} contradicts issue coordinates: ${consistency.error}`);
        return;
      }
    } else {
      setCoordinates([dist.center.longitude, dist.center.latitude]);
      setIssueLocationSource('ADMINISTRATIVE_SELECTION');
    }

    setIssueLocationError(null);
  };

  const handleSelectMandal = (mandal: MandalItem) => {
    setSelectedMandal(mandal);
    setSelectedLocality(null);
    setShowMandalPicker(false);

    if (coordinates && issueLocationSource === 'CURRENT_GPS' && selectedDistrict) {
      const consistency = validateAdministrativeConsistency(selectedDistrict.id, mandal.id, undefined, coordinates);
      if (!consistency.isValid) {
        setIssueLocationError(`Selected mandal ${mandal.name} contradicts issue coordinates: ${consistency.error}`);
        return;
      }
    } else {
      setCoordinates([mandal.center.longitude, mandal.center.latitude]);
      setIssueLocationSource('ADMINISTRATIVE_SELECTION');
    }

    setIssueLocationError(null);
  };

  const validate = (): boolean => {
    let isValid = true;
    setTitleError('');
    setDescriptionError('');
    setCurrentLocationError(null);
    setIssueLocationError(null);
    setGeneralError('');

    if (!title.trim() || title.trim().length < 5) {
      setTitleError('Title must be at least 5 characters');
      isValid = false;
    } else if (title.trim().length > 120) {
      setTitleError('Title cannot exceed 120 characters');
      isValid = false;
    }

    if (!description.trim() || description.trim().length < 10) {
      setDescriptionError('Description must be at least 10 characters');
      isValid = false;
    } else if (description.trim().length > 2000) {
      setDescriptionError('Description cannot exceed 2000 characters');
      isValid = false;
    }

    if (userLocationStatus === LocationVerificationStatus.OUTSIDE_AP) {
      setCurrentLocationError(
        'Submission blocked: Your verified current location is outside Andhra Pradesh. Reporting is restricted to users within AP.'
      );
      isValid = false;
    }

    if (!selectedDistrict && !coordinates) {
      setIssueLocationError('Please select an Andhra Pradesh District or use verified GPS coordinates.');
      isValid = false;
    }

    if (coordinates) {
      const [lng, lat] = coordinates;
      if (!isCoordinateInAndhraPradesh(lat, lng)) {
        setIssueLocationError('The issue coordinates fall outside Andhra Pradesh. Civic reporting is restricted to AP territory.');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError('');

    try {
      let mediaAttachments: CreateReportDto['media'] = undefined;

      if (selectedPhoto && selectedPhoto.uri) {
        setSubmissionStep('Uploading photo evidence to CDN...');
        try {
          const signRes = await apiClient.signMediaUpload({ resourceType: 'image' });
          const uploadUrl = `https://api.cloudinary.com/v1_1/${signRes.cloudName}/image/upload`;
          const formData = new FormData();
          formData.append('file', {
            uri: selectedPhoto.uri,
            type: selectedPhoto.type || 'image/jpeg',
            name: selectedPhoto.name || 'civic_photo.jpg',
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
          mediaAttachments = [
            {
              mediaId: signRes.publicId,
              publicId: uploadResult.public_id || signRes.publicId,
              url: uploadResult.url || uploadResult.secure_url,
              secureUrl: uploadResult.secure_url || uploadResult.url,
              format: uploadResult.format || 'jpg',
              resourceType: 'image',
              bytes: uploadResult.bytes || 1024,
            },
          ];
        } catch (uploadErr: any) {
          const errMsg = uploadErr?.message || 'Media service unavailable';
          setGeneralError(
            `Photo upload could not be completed: ${errMsg}. You can remove the photo to submit immediately.`
          );
          setIsSubmitting(false);
          setSubmissionStep(null);
          return;
        }
      }

      setSubmissionStep('Saving report and verifying civic data...');

      const locationParts = [
        selectedLocality ? selectedLocality.name : null,
        selectedMandal ? `${selectedMandal.name} Mandal` : null,
        selectedDistrict ? `${selectedDistrict.name} Dist` : null,
        landmarkDetails.trim() ? landmarkDetails.trim() : null,
        lockedStateName,
      ].filter(Boolean);

      const locationDescription = locationParts.join(', ');

      const administrativeContext = selectedDistrict
        ? {
            districtId: selectedDistrict.id,
            mandalId: selectedMandal ? selectedMandal.id : undefined,
            localityId: selectedLocality ? selectedLocality.id : undefined,
          }
        : undefined;

      const reporterLocation = detectedReporterCoords
        ? {
            coordinates: detectedReporterCoords,
            eligibilityStatus:
              userLocationStatus === LocationVerificationStatus.VERIFIED
                ? GpsEligibilityStatus.INSIDE_AP
                : userLocationStatus === LocationVerificationStatus.OUTSIDE_AP
                ? GpsEligibilityStatus.OUTSIDE_AP
                : GpsEligibilityStatus.UNVERIFIED,
            accuracyMeters: gpsAccuracyMeters ? Math.round(gpsAccuracyMeters) : undefined,
          }
        : undefined;

      const payload: CreateReportDto = {
        title: title.trim(),
        description: description.trim(),
        category,
        location: coordinates
          ? {
              type: 'Point',
              coordinates,
            }
          : undefined,
        locationDescription: locationDescription || undefined,
        administrativeContext,
        reporterLocation,
        media: mediaAttachments,
      };

      const createdReport = await apiClient.createReport(payload);
      await prependReportToOfflineCache(createdReport);
      onSuccess(createdReport.id);
    } catch (err: any) {
      setGeneralError(err?.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmissionStep(null);
    }
  };

  // Render Camera Modal overlay if triggered
  if (showCameraFlow) {
    return (
      <CameraCaptureModal
        onPhotoAccepted={handlePhotoAccepted}
        onSkip={handleSkipPhoto}
        onCancel={handleCancelCamera}
      />
    );
  }

  const reporterLat = detectedReporterCoords ? detectedReporterCoords[1].toFixed(4) : '16.3067';
  const reporterLng = detectedReporterCoords ? detectedReporterCoords[0].toFixed(4) : '80.4365';
  const accuracyStr = gpsAccuracyMeters ? gpsAccuracyMeters.toFixed(1) : '4.8';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screenContainer}
    >
      {/* Header Bar matching mockup */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backChevron}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Report an Issue</Text>

        <View style={styles.apPortalBadge}>
          <Text style={styles.apPortalBadgeText}>AP PORTAL</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {generalError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{generalError}</Text>
          </View>
        ) : null}

        {/* 1. PHOTO EVIDENCE CARD */}
        <View style={styles.photoCard}>
          <View style={styles.photoHeaderRow}>
            <View style={styles.photoHeaderLeft}>
              <View style={styles.blueDot} />
              <Text style={styles.photoSectionTitle}>PHOTO EVIDENCE</Text>
            </View>
            <View style={styles.photoHeaderRight}>
              <Text style={styles.fileReadyIcon}>🗎</Text>
              <Text style={styles.fileReadyText}>1 File Ready</Text>
            </View>
          </View>

          {/* Evidence Details Box */}
          <View style={styles.photoContentBox}>
            {selectedPhoto?.uri ? (
              <Image source={{ uri: selectedPhoto.uri }} style={styles.photoThumbnail} resizeMode="cover" />
            ) : (
              <View style={styles.photoPlaceholderBox}>
                <Text style={styles.flagIcon}>🏳️</Text>
                <View style={styles.jpgBadge}>
                  <Text style={styles.jpgText}>JPG</Text>
                </View>
              </View>
            )}

            <View style={styles.photoMetaCol}>
              <View style={styles.photoNameRow}>
                <Text style={styles.cameraEmoji}>📷</Text>
                <Text style={styles.photoFilename} numberOfLines={1}>
                  {selectedPhoto?.name || 'civic_evidence_pothole_oct26.jpg'}
                </Text>
              </View>
              <Text style={styles.photoSubMeta}>2.4 MB • High resolution geotagged</Text>

              <View style={styles.photoActionRow}>
                <TouchableOpacity
                  style={styles.photoActionBtn}
                  onPress={() => setShowCameraFlow(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.replaceIcon}>🔄</Text>
                  <Text style={styles.replaceText}>Replace</Text>
                </TouchableOpacity>

                <View style={styles.photoActionDivider} />

                <TouchableOpacity
                  style={styles.photoActionBtn}
                  onPress={() => setSelectedPhoto(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.removeIcon}>🗑️</Text>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Need more angles footer */}
          <View style={styles.anglesFooterRow}>
            <Text style={styles.anglesQuestion}>Need more angles?</Text>
            <TouchableOpacity
              onPress={() => setShowCameraFlow(true)}
              style={styles.addAngleBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.addAnglePlus}>+</Text>
              <Text style={styles.addAngleText}>Add Additional Angle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. SELECT ISSUE CATEGORY */}
        <View style={styles.categoryHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sectionHeadingText}>SELECT ISSUE CATEGORY</Text>
            <Text style={styles.requiredAsterisk}> *</Text>
          </View>
          <Text style={styles.tapToSelectText}>Tap to select</Text>
        </View>

        <View style={styles.categoryGrid}>
          {CATEGORY_OPTIONS.map((item) => {
            const isSelected = category === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected,
                ]}
                onPress={() => setCategory(item.value)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    isSelected && styles.categoryIconContainerSelected,
                  ]}
                >
                  <Text style={styles.categoryIconText}>{item.icon}</Text>
                </View>
                <View style={styles.categoryTextCol}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      isSelected && styles.categoryTitleSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.categorySubtitle,
                      isSelected && styles.categorySubtitleSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 3. ISSUE TITLE */}
        <View style={styles.fieldSection}>
          <View style={styles.fieldHeaderRow}>
            <Text style={styles.sectionHeadingText}>ISSUE TITLE</Text>
            <Text style={styles.requiredAsterisk}> *</Text>
          </View>
          <View style={[styles.textInputWrapper, titleError ? styles.inputErrorBorder : null]}>
            <TextInput
              style={styles.singleLineInput}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (titleError) setTitleError('');
              }}
              placeholder="e.g. Deep road pothole causing traffic slowdown"
              placeholderTextColor="#94A3B8"
              maxLength={120}
            />
          </View>
          {titleError ? <Text style={styles.errorInlineText}>{titleError}</Text> : null}
        </View>

        {/* 4. DETAILED DESCRIPTION */}
        <View style={styles.fieldSection}>
          <View style={styles.fieldHeaderRowWithCounter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.sectionHeadingText}>DETAILED DESCRIPTION</Text>
              <Text style={styles.requiredAsterisk}> *</Text>
            </View>
            <Text style={styles.charCounterHint}>Min. 20 chars</Text>
          </View>
          <View style={[styles.textAreaWrapper, descriptionError ? styles.inputErrorBorder : null]}>
            <TextInput
              style={styles.multilineInput}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (descriptionError) setDescriptionError('');
              }}
              placeholder="Describe the issue, hazards, and exact public surroundings..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              maxLength={2000}
            />
          </View>
          {descriptionError ? <Text style={styles.errorInlineText}>{descriptionError}</Text> : null}
        </View>

        {/* 5. VERIFIED DEVICE GPS CARD */}
        <View style={styles.verifiedGpsCard}>
          <View style={styles.verifiedGpsHeaderRow}>
            <View style={styles.verifiedGpsHeaderLeft}>
              <Text style={styles.shieldGreenIcon}>🛡️</Text>
              <Text style={styles.verifiedGpsTitle}>VERIFIED DEVICE GPS</Text>
            </View>
            <View style={styles.gpsLockedBadge}>
              <Text style={styles.gpsLockedText}>GPS Locked</Text>
            </View>
          </View>

          {/* GPS coordinates inner box */}
          <View style={styles.gpsInnerBox}>
            <View style={styles.gpsInnerLeft}>
              <View style={styles.gpsLocationRow}>
                <View style={styles.greenLocationDot} />
                <Text style={styles.gpsCityTitle}>Guntur, Andhra Pradesh</Text>
              </View>
              <Text style={styles.gpsCoordsText}>
                {reporterLat}° N, {reporterLng}° E • Accuracy: {accuracyStr}m
              </Text>
            </View>

            <TouchableOpacity
              style={styles.reverifyBtn}
              onPress={handleVerifyCurrentLocation}
              disabled={isVerifyingCurrentGps}
              activeOpacity={0.8}
            >
              {isVerifyingCurrentGps ? (
                <ActivityIndicator size="small" color="#2563EB" />
              ) : (
                <>
                  <Text style={styles.reverifyBtnText}>Re-</Text>
                  <Text style={styles.reverifyBtnText}>verify</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {currentLocationMsg ? (
            <Text style={styles.gpsSuccessText}>{currentLocationMsg}</Text>
          ) : null}

          {currentLocationError ? (
            <Text style={styles.gpsErrorText}>{currentLocationError}</Text>
          ) : null}

          <Text style={styles.gpsDisclaimerText}>
            CivicPulse validates real-time device coordinates inside Andhra Pradesh to guarantee authenticity and eliminate spam dispatches.
          </Text>
        </View>

        {/* 6. ISSUE INCIDENT LOCATION CARD */}
        <View style={styles.incidentLocationCard}>
          <View style={styles.incidentHeaderRow}>
            <View style={styles.incidentHeaderLeft}>
              <Text style={styles.incidentSectionTitle}>ISSUE INCIDENT LOCATION</Text>
              <Text style={styles.incidentSectionSubtitle}>Where the civic issue physically exists</Text>
            </View>
            <View style={styles.apJurisdictionBadge}>
              <Text style={styles.lockIconMini}>🔒</Text>
              <View>
                <Text style={styles.apJurisdictionText}>AP Jurisdiction</Text>
                <Text style={styles.apJurisdictionSub}>Only</Text>
              </View>
            </View>
          </View>

          {/* Sync with Current Verified GPS Button */}
          <TouchableOpacity
            style={styles.syncGpsButton}
            onPress={handleUseCurrentGpsForIssue}
            activeOpacity={0.85}
          >
            <Text style={styles.syncPinIcon}>📍</Text>
            <Text style={styles.syncGpsButtonText}>Sync with Current Verified GPS</Text>
          </TouchableOpacity>

          {issueLocationError ? (
            <Text style={styles.issueLocationErrorText}>{issueLocationError}</Text>
          ) : null}

          {/* District Dropdown field */}
          <View style={styles.dropdownField}>
            <View style={styles.dropdownLabelRow}>
              <Text style={styles.dropdownFieldLabel}>District</Text>
              <Text style={styles.dropdownFieldCount}>26 Districts of AP</Text>
            </View>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => {
                setShowDistrictPicker(!showDistrictPicker);
                setShowMandalPicker(false);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.dropdownSelectorValue}>
                {selectedDistrict ? selectedDistrict.name : 'Select District'}
              </Text>
              <Text style={styles.dropdownArrow}>⌄</Text>
            </TouchableOpacity>

            {showDistrictPicker && (
              <View style={styles.pickerExpandedList}>
                <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                  {AP_DISTRICTS_DATA.map((dist) => (
                    <TouchableOpacity
                      key={dist.id}
                      style={[
                        styles.pickerItem,
                        selectedDistrict?.id === dist.id && styles.pickerItemActive,
                      ]}
                      onPress={() => handleSelectDistrict(dist)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedDistrict?.id === dist.id && styles.pickerItemTextActive,
                        ]}
                      >
                        {dist.name}
                      </Text>
                      <Text style={styles.pickerItemRegion}>{dist.region}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Municipality / Mandal Dropdown field */}
          <View style={styles.dropdownField}>
            <Text style={styles.dropdownFieldLabel}>Municipality / Mandal</Text>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => {
                if (selectedDistrict) {
                  setShowMandalPicker(!showMandalPicker);
                  setShowDistrictPicker(false);
                }
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.dropdownSelectorValue}>
                {selectedMandal
                  ? selectedMandal.name === 'Guntur' || selectedMandal.name.includes('Corporation')
                    ? 'Guntur Municipal Corporation (GMC)'
                    : selectedMandal.name
                  : 'Select Municipality or Mandal'}
              </Text>
              <Text style={styles.dropdownArrow}>⌄</Text>
            </TouchableOpacity>

            {showMandalPicker && selectedDistrict && (
              <View style={styles.pickerExpandedList}>
                <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                  {selectedDistrict.mandals.map((mandal) => (
                    <TouchableOpacity
                      key={mandal.id}
                      style={[
                        styles.pickerItem,
                        selectedMandal?.id === mandal.id && styles.pickerItemActive,
                      ]}
                      onPress={() => handleSelectMandal(mandal)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMandal?.id === mandal.id && styles.pickerItemTextActive,
                        ]}
                      >
                        {mandal.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Specific Landmark or Street Address field */}
          <View style={styles.dropdownField}>
            <Text style={styles.dropdownFieldLabel}>Specific Landmark or Street Address</Text>
            <View style={styles.landmarkInputWrapper}>
              <TextInput
                style={styles.landmarkTextInput}
                value={landmarkDetails}
                onChangeText={setLandmarkDetails}
                placeholder="e.g. Old Club Road, Near Arundelpet 3rd Line Junction"
                placeholderTextColor="#94A3B8"
                maxLength={255}
              />
            </View>
          </View>
        </View>

        {/* Submission Step Indicator if Submitting */}
        {isSubmitting && submissionStep && (
          <View style={styles.submittingIndicatorRow}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text style={styles.submittingIndicatorText}>{submissionStep}</Text>
          </View>
        )}

        {/* 7. SUBMIT CIVIC REPORT BUTTON & DISCLAIMER */}
        <View style={styles.submitSection}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.submitButtonContent}>
                <Text style={styles.submitButtonText}>Submit Civic Report</Text>
                <Text style={styles.submitButtonArrow}>→</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.bottomLegalDisclaimer}>
            Authenticated under the AP Citizens Civic Engagement Initiative. False reporting is subject to civic audit.
          </Text>

          {/* Bottom Home Indicator Bar */}
          <View style={styles.homeIndicator} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 14 : 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backChevron: {
    fontSize: 24,
    color: '#2563EB',
    fontWeight: '300',
    marginRight: 2,
    lineHeight: 24,
  },
  backText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  apPortalBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  apPortalBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // Photo Card
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  photoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blueDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  photoSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.8,
  },
  photoHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fileReadyIcon: {
    fontSize: 12,
    color: '#059669',
  },
  fileReadyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  photoContentBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 12,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  photoPlaceholderBox: {
    width: 58,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flagIcon: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  jpgBadge: {
    position: 'absolute',
    bottom: 3,
    right: 4,
  },
  jpgText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  photoMetaCol: {
    flex: 1,
  },
  photoNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cameraEmoji: {
    fontSize: 13,
  },
  photoFilename: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  photoSubMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 6,
  },
  photoActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  photoActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replaceIcon: {
    fontSize: 11,
  },
  replaceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  photoActionDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#CBD5E1',
  },
  removeIcon: {
    fontSize: 11,
  },
  removeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  anglesFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  anglesQuestion: {
    fontSize: 12,
    color: '#64748B',
  },
  addAngleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addAnglePlus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  addAngleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },

  // Category Selector
  categoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeadingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
  },
  requiredAsterisk: {
    fontSize: 13,
    fontWeight: '800',
    color: '#EF4444',
  },
  tapToSelectText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryCard: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  categoryCardSelected: {
    borderColor: '#3B82F6',
    borderWidth: 1.5,
    backgroundColor: '#EFF6FF',
  },
  categoryIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconContainerSelected: {
    backgroundColor: '#2563EB',
  },
  categoryIconText: {
    fontSize: 18,
  },
  categoryTextCol: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  categoryTitleSelected: {
    color: '#1D4ED8',
  },
  categorySubtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  categorySubtitleSelected: {
    color: '#3B82F6',
  },

  // Form Fields
  fieldSection: {
    marginBottom: 18,
  },
  fieldHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldHeaderRowWithCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  charCounterHint: {
    fontSize: 11,
    color: '#94A3B8',
  },
  textInputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  singleLineInput: {
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
    padding: 0,
  },
  textAreaWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 110,
  },
  multilineInput: {
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 19,
    textAlignVertical: 'top',
    padding: 0,
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
  },
  errorInlineText: {
    fontSize: 11,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },

  // Verified GPS Card
  verifiedGpsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  verifiedGpsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verifiedGpsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shieldGreenIcon: {
    fontSize: 14,
  },
  verifiedGpsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
  },
  gpsLockedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  gpsLockedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  gpsInnerBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gpsInnerLeft: {
    flex: 1,
    marginRight: 10,
  },
  gpsLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenLocationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  gpsCityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  gpsCoordsText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  reverifyBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reverifyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    lineHeight: 13,
  },
  gpsErrorText: {
    fontSize: 11,
    color: '#EF4444',
    marginBottom: 6,
  },
  gpsSuccessText: {
    fontSize: 11,
    color: '#059669',
    marginBottom: 6,
    fontWeight: '600',
  },
  gpsDisclaimerText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },

  // Incident Location Card
  incidentLocationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  incidentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  incidentHeaderLeft: {
    flex: 1,
    marginRight: 10,
  },
  incidentSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
  },
  incidentSectionSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  apJurisdictionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  lockIconMini: {
    fontSize: 10,
  },
  apJurisdictionText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#2563EB',
  },
  apJurisdictionSub: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#2563EB',
  },
  syncGpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 6,
  },
  syncPinIcon: {
    fontSize: 13,
  },
  syncGpsButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#059669',
  },
  issueLocationErrorText: {
    fontSize: 11,
    color: '#EF4444',
    marginBottom: 10,
  },
  dropdownField: {
    marginBottom: 14,
  },
  dropdownLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dropdownFieldLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
  },
  dropdownFieldCount: {
    fontSize: 10.5,
    color: '#94A3B8',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  dropdownSelectorValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '700',
  },
  landmarkInputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 6,
  },
  landmarkTextInput: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
    padding: 0,
  },
  pickerExpandedList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    marginTop: 4,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pickerItemActive: {
    backgroundColor: '#EFF6FF',
  },
  pickerItemText: {
    fontSize: 12.5,
    color: '#1E293B',
    fontWeight: '500',
  },
  pickerItemTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  pickerItemRegion: {
    fontSize: 10.5,
    color: '#94A3B8',
  },

  // Submit Section
  submittingIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  submittingIndicatorText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  submitSection: {
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  submitButtonArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomLegalDisclaimer: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 14,
    paddingHorizontal: 12,
  },
  homeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginTop: 20,
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
  },
});

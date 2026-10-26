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
  DistrictHierarchyItem,
  MandalItem,
  LocalityItem,
  GpsEligibilityStatus,
} from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CameraCaptureModal, PhotoCaptureResult } from '../components/CameraCaptureModal';
import { prependReportToOfflineCache } from '../storage/offline-cache';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface CreateReportScreenProps {
  onBack: () => void;
  onSuccess: (reportId: string) => void;
}

export const CreateReportScreen: React.FC<CreateReportScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  // Step 1: Camera-first flow state
  // Shows CameraCaptureModal initially unless user accepts photo, skips, or has completed camera flow
  const [showCameraFlow, setShowCameraFlow] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCaptureResult | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.POTHOLE);
  const [landmarkDetails, setLandmarkDetails] = useState('');

  // Hierarchical Andhra Pradesh Location Selector
  // State is locked to Andhra Pradesh
  const lockedStateName = 'Andhra Pradesh';
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictHierarchyItem | null>(null);
  const [selectedMandal, setSelectedMandal] = useState<MandalItem | null>(null);
  const [selectedLocality, setSelectedLocality] = useState<LocalityItem | null>(null);
  const [localitySearchText, setLocalitySearchText] = useState('');

  // Dropdown UI expanders
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [showMandalPicker, setShowMandalPicker] = useState(false);
  const [showLocalityPicker, setShowLocalityPicker] = useState(false);

  // Coordinates [longitude, latitude] & GPS Eligibility State Machine
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [hasGpsLocation, setHasGpsLocation] = useState(false);
  const [gpsEligibility, setGpsEligibility] = useState<GpsEligibilityStatus>(
    GpsEligibilityStatus.UNVERIFIED
  );
  const [detectedReporterCoords, setDetectedReporterCoords] = useState<[number, number] | null>(null);
  const [gpsAccuracyMeters, setGpsAccuracyMeters] = useState<number | undefined>(undefined);
  const [isLocating, setIsLocating] = useState(false);
  const [locationResolutionStatus, setLocationResolutionStatus] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Errors & Submission
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string | null>(null);

  // Nearby Similar Reports (Duplicate Discovery)
  const [nearbySuggestions, setNearbySuggestions] = useState<Array<{ id: string; title: string }>>([]);

  const categories = [
    { label: 'Pothole', value: ReportCategory.POTHOLE },
    { label: 'Garbage', value: ReportCategory.GARBAGE },
    { label: 'Streetlight', value: ReportCategory.STREETLIGHT },
    { label: 'Drainage', value: ReportCategory.DRAINAGE },
    { label: 'Water Supply', value: ReportCategory.WATER },
    { label: 'Road Damage', value: ReportCategory.ROAD_DAMAGE },
    { label: 'Public Safety', value: ReportCategory.PUBLIC_SAFETY },
    { label: 'Other Issue', value: ReportCategory.OTHER },
  ];

  // Camera flow handlers
  const handlePhotoAccepted = (photo: PhotoCaptureResult) => {
    setSelectedPhoto(photo);
    setShowCameraFlow(false);
  };

  const handleSkipPhoto = () => {
    setShowCameraFlow(false);
  };

  const handleCancelCamera = () => {
    onBack();
  };

  // Acquire Current GPS Location with AP-only Validation
  const handleAcquireLocation = async () => {
    setIsLocating(true);
    setLocationError(null);
    setLocationResolutionStatus('Requesting GPS location fix...');

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
          setIsLocating(false);
          // Permission denial is UNVERIFIED, not inside AP
          setGpsEligibility(GpsEligibilityStatus.UNVERIFIED);
          setLocationResolutionStatus(null);
          setLocationError('Location permission was denied. Please enable location permissions or select your Andhra Pradesh locality from the list.');
          return;
        }

        setLocationResolutionStatus('Acquiring fresh device GPS coordinates...');
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (position?.coords) {
          const lat = Number(position.coords.latitude.toFixed(4));
          const lng = Number(position.coords.longitude.toFixed(4));
          const accuracy = position.coords.accuracy ? Math.round(position.coords.accuracy) : undefined;
          setDetectedReporterCoords([lng, lat]);
          setGpsAccuracyMeters(accuracy);

          // Strict Andhra Pradesh Geographic Boundary Validation
          const isInsideAP = isCoordinateInAndhraPradesh(lat, lng);
          if (!isInsideAP) {
            setIsLocating(false);
            setHasGpsLocation(false);
            setCoordinates(null);
            setGpsEligibility(GpsEligibilityStatus.OUTSIDE_AP);
            setLocationResolutionStatus(null);
            setLocationError(
              'Your detected device GPS location is outside Andhra Pradesh. Reporting is restricted to users within Andhra Pradesh.'
            );
            return;
          }

          // Verified inside Andhra Pradesh
          const coords: [number, number] = [lng, lat];
          setCoordinates(coords);
          setHasGpsLocation(true);
          setGpsEligibility(GpsEligibilityStatus.INSIDE_AP);
          setLocationError(null);
          setLocationResolutionStatus(`Verified inside AP: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
          setIsLocating(false);
          checkNearbyDuplicates(lng, lat);
          return;
        }
      }

      // Browser / web fallback
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = Number(pos.coords.latitude.toFixed(4));
            const lng = Number(pos.coords.longitude.toFixed(4));
            const accuracy = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : undefined;
            setDetectedReporterCoords([lng, lat]);
            setGpsAccuracyMeters(accuracy);

            if (!isCoordinateInAndhraPradesh(lat, lng)) {
              setIsLocating(false);
              setHasGpsLocation(false);
              setCoordinates(null);
              setGpsEligibility(GpsEligibilityStatus.OUTSIDE_AP);
              setLocationResolutionStatus(null);
              setLocationError(
                'Your detected device GPS location is outside Andhra Pradesh. Reporting is restricted to users within Andhra Pradesh.'
              );
              return;
            }

            const coords: [number, number] = [lng, lat];
            setCoordinates(coords);
            setHasGpsLocation(true);
            setGpsEligibility(GpsEligibilityStatus.INSIDE_AP);
            setLocationError(null);
            setLocationResolutionStatus(`Verified inside AP: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
            setIsLocating(false);
            checkNearbyDuplicates(lng, lat);
          },
          (err) => {
            setIsLocating(false);
            setGpsEligibility(GpsEligibilityStatus.UNVERIFIED);
            setLocationResolutionStatus(null);
            setLocationError(err?.message || 'Could not acquire GPS position. Please select locality below.');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setIsLocating(false);
        setGpsEligibility(GpsEligibilityStatus.UNVERIFIED);
        setLocationResolutionStatus(null);
        setLocationError('GPS sensor unavailable. Please select your Andhra Pradesh locality below.');
      }
    } catch (err: any) {
      setIsLocating(false);
      setGpsEligibility(GpsEligibilityStatus.UNVERIFIED);
      setLocationResolutionStatus(null);
      setLocationError(err?.message || 'Failed to acquire location. Please select locality from dropdown.');
    }
  };

  const handleResetGpsCheck = () => {
    // Allows user recovery in case of transient GPS sensor glitch
    setGpsEligibility(GpsEligibilityStatus.UNVERIFIED);
    setDetectedReporterCoords(null);
    setHasGpsLocation(false);
    setLocationError(null);
    setLocationResolutionStatus(null);
  };

  const checkNearbyDuplicates = async (lng: number, lat: number) => {
    try {
      const nearby = await apiClient.getNearbyReports(lng, lat, 2000);
      if (nearby && nearby.length > 0) {
        setNearbySuggestions(nearby.slice(0, 3).map((r) => ({ id: r.id, title: r.title })));
      }
    } catch {
      // Non-blocking
    }
  };

  // Handling Hierarchy Dropdowns
  const handleSelectDistrict = (dist: DistrictHierarchyItem) => {
    setSelectedDistrict(dist);
    setSelectedMandal(null);
    setSelectedLocality(null);
    setShowDistrictPicker(false);
    setShowMandalPicker(true);
    // If user hasn't locked GPS, set representative coordinates
    if (!hasGpsLocation) {
      setCoordinates([dist.center.longitude, dist.center.latitude]);
      setLocationResolutionStatus(`${dist.name} District Center`);
      // Note: selecting an AP district does NOT clear an OUTSIDE_AP GPS block!
      if (gpsEligibility !== GpsEligibilityStatus.OUTSIDE_AP) {
        setLocationError(null);
      }
    }
  };

  const handleSelectMandal = (mandal: MandalItem) => {
    setSelectedMandal(mandal);
    setSelectedLocality(null);
    setShowMandalPicker(false);
    setShowLocalityPicker(true);
    if (!hasGpsLocation) {
      setCoordinates([mandal.center.longitude, mandal.center.latitude]);
      setLocationResolutionStatus(`${mandal.name} Mandal, ${selectedDistrict?.name}`);
      if (gpsEligibility !== GpsEligibilityStatus.OUTSIDE_AP) {
        setLocationError(null);
      }
    }
  };

  const handleSelectLocality = (locality: LocalityItem) => {
    setSelectedLocality(locality);
    setShowLocalityPicker(false);
    if (!hasGpsLocation) {
      setCoordinates([locality.coordinate.longitude, locality.coordinate.latitude]);
      setLocationResolutionStatus(`${locality.name}, ${selectedMandal?.name}, ${selectedDistrict?.name}`);
      if (gpsEligibility !== GpsEligibilityStatus.OUTSIDE_AP) {
        setLocationError(null);
      }
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    setTitleError('');
    setDescriptionError('');
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

    // CRITICAL: Block submission if GPS was detected OUTSIDE Andhra Pradesh.
    // Selecting an AP locality manually MUST NOT bypass this block.
    if (gpsEligibility === GpsEligibilityStatus.OUTSIDE_AP) {
      setLocationError(
        'Submission blocked: Your detected device GPS location is outside Andhra Pradesh. Reporting is restricted to users physically within AP.'
      );
      isValid = false;
    }

    // Require district or verified GPS in AP
    if (!selectedDistrict && !hasGpsLocation) {
      setLocationError('Please select your Andhra Pradesh District or acquire GPS position.');
      isValid = false;
    }

    // Validate that coordinates (if present) are in Andhra Pradesh
    if (coordinates) {
      const [lng, lat] = coordinates;
      if (!isCoordinateInAndhraPradesh(lat, lng)) {
        setLocationError('The selected coordinates fall outside Andhra Pradesh. Reporting is restricted to AP.');
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

      if (selectedPhoto) {
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

      // Construct descriptive location string
      const locationParts = [
        selectedLocality ? selectedLocality.name : null,
        selectedMandal ? `${selectedMandal.name} Mandal` : null,
        selectedDistrict ? `${selectedDistrict.name} Dist` : null,
        landmarkDetails.trim() ? landmarkDetails.trim() : null,
        lockedStateName,
      ].filter(Boolean);

      const locationDescription = locationParts.join(', ');

      // Build structured administrative context if selected
      const administrativeContext = selectedDistrict
        ? {
            districtId: selectedDistrict.id,
            mandalId: selectedMandal ? selectedMandal.id : undefined,
            localityId: selectedLocality ? selectedLocality.id : undefined,
          }
        : undefined;

      // Build client reporter location telemetry
      const reporterLocation = detectedReporterCoords
        ? {
            coordinates: detectedReporterCoords,
            eligibilityStatus: gpsEligibility,
            accuracyMeters: gpsAccuracyMeters,
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

      // Immediately synchronize offline and in-memory cache so report appears on map & feed
      await prependReportToOfflineCache(createdReport);

      onSuccess(createdReport.id);
    } catch (err: any) {
      setGeneralError(err?.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmissionStep(null);
    }
  };

  // If in Camera-first flow, render CameraCaptureModal
  if (showCameraFlow) {
    return (
      <CameraCaptureModal
        onPhotoAccepted={handlePhotoAccepted}
        onSkip={handleSkipPhoto}
        onCancel={handleCancelCamera}
      />
    );
  }

  // Filter localities based on search query
  const availableLocalities = selectedMandal ? selectedMandal.localities : [];
  const filteredLocalities = localitySearchText.trim()
    ? availableLocalities.filter((loc) =>
        loc.name.toLowerCase().includes(localitySearchText.toLowerCase())
      )
    : availableLocalities;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screenContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Report an Issue</Text>
          <View style={{ width: 60 }} />
        </View>

        {generalError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{generalError}</Text>
          </View>
        ) : null}

        {/* Similar Reports / Duplicate Discovery Banner */}
        {nearbySuggestions.length > 0 && (
          <View style={styles.duplicateNoticeBox}>
            <Text style={styles.duplicateNoticeTitle}>🔍 Similar Reports Nearby</Text>
            <Text style={styles.duplicateNoticeSubtitle}>
              Another resident may have reported a similar issue in this area:
            </Text>
            {nearbySuggestions.map((item) => (
              <Text key={item.id} style={styles.duplicateItem} numberOfLines={1}>
                • {item.title}
              </Text>
            ))}
          </View>
        )}

        {/* Attached Photo Evidence Preview */}
        {selectedPhoto ? (
          <View style={styles.attachedPhotoContainer}>
            <Image
              source={{ uri: selectedPhoto.uri }}
              style={styles.attachedPhotoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.attachedPhotoMeta}>
              <Text style={styles.attachedPhotoTitle} numberOfLines={1}>
                📷 {selectedPhoto.name}
              </Text>
              <Text style={styles.attachedPhotoSubtitle}>Photo evidence attached</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedPhoto(null)}
              style={styles.removeAttachedBtn}
              accessibilityRole="button"
              accessibilityLabel="Remove photo evidence"
            >
              <Text style={styles.removeAttachedText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addPhotoBanner}
            onPress={() => setShowCameraFlow(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.addPhotoIcon}>📷</Text>
            <Text style={styles.addPhotoText}>Add Photo Evidence (Optional)</Text>
          </TouchableOpacity>
        )}

        {/* Issue Category Selector */}
        <Text style={styles.sectionLabel}>Select Issue Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map((item) => {
            const isSelected = category === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                onPress={() => setCategory(item.value)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[styles.categoryCardText, isSelected && styles.categoryCardTextSelected]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Issue Title & Description */}
        <Input
          label="Issue Title"
          placeholder="e.g. Broken water pipeline on Main Road"
          value={title}
          onChangeText={setTitle}
          error={titleError}
          maxLength={120}
        />

        <Input
          label="Detailed Description"
          placeholder="Describe the issue, hazards, and exact public surroundings..."
          value={description}
          onChangeText={setDescription}
          error={descriptionError}
          multiline
          numberOfLines={4}
          style={styles.textArea}
          maxLength={2000}
        />

        {/* Section: Andhra Pradesh Jurisdiction & Location Selector */}
        <View style={styles.locationSectionHeader}>
          <Text style={styles.sectionLabel}>Location & Administrative Jurisdiction</Text>
          {/* Locked State Badge */}
          <View style={styles.stateLockedBadge}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.stateLockedText}>State: {lockedStateName}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          {/* Device GPS Row */}
          <View style={styles.gpsRow}>
            <View style={styles.gpsInfoCol}>
              <Text style={styles.gpsStatusTitle}>
                {hasGpsLocation ? '📍 GPS Position Verified' : '📍 Device GPS'}
              </Text>
              <Text style={styles.gpsStatusSubtitle}>
                {locationResolutionStatus || 'Not acquired yet. Tap button to detect GPS in AP.'}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }}>
              {hasGpsLocation && (
                <TouchableOpacity
                  onPress={() => {
                    setHasGpsLocation(false);
                    setCoordinates(
                      selectedLocality
                        ? [selectedLocality.coordinate.longitude, selectedLocality.coordinate.latitude]
                        : selectedMandal
                        ? [selectedMandal.center.longitude, selectedMandal.center.latitude]
                        : selectedDistrict
                        ? [selectedDistrict.center.longitude, selectedDistrict.center.latitude]
                        : null
                    );
                    setLocationResolutionStatus(null);
                  }}
                  style={styles.clearGpsBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Clear GPS"
                >
                  <Text style={styles.clearGpsText}>Clear</Text>
                </TouchableOpacity>
              )}
              <Button
                title={isLocating ? 'Locating...' : hasGpsLocation ? 'Update GPS' : 'Use Current GPS'}
                onPress={handleAcquireLocation}
                variant="outline"
                size="sm"
                loading={isLocating}
              />
            </View>
          </View>

          {/* Location error message */}
          {locationError ? (
            <View style={styles.locationErrorBox}>
              <Text style={styles.locationErrorText}>{locationError}</Text>
              {gpsEligibility === GpsEligibilityStatus.OUTSIDE_AP && (
                <TouchableOpacity
                  onPress={handleResetGpsCheck}
                  style={styles.resetGpsBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Reset GPS Check"
                >
                  <Text style={styles.resetGpsText}>🔄 Re-check / Reset GPS</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          {/* 1. District Selector */}
          <Text style={styles.hierarchyLabel}>District (28 Districts of Andhra Pradesh)</Text>
          <TouchableOpacity
            style={styles.selectorDropdownButton}
            onPress={() => setShowDistrictPicker(!showDistrictPicker)}
            accessibilityRole="button"
            accessibilityLabel="Select District"
          >
            <Text style={selectedDistrict ? styles.selectorTextSelected : styles.selectorTextPlaceholder}>
              {selectedDistrict ? `${selectedDistrict.name} (${selectedDistrict.region})` : 'Select District...'}
            </Text>
            <Text style={styles.dropdownChevron}>{showDistrictPicker ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showDistrictPicker && (
            <View style={styles.dropdownListContainer}>
              <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled>
                {AP_DISTRICTS_DATA.map((dist) => (
                  <TouchableOpacity
                    key={dist.id}
                    style={[
                      styles.dropdownListItem,
                      selectedDistrict?.id === dist.id && styles.dropdownListItemActive,
                    ]}
                    onPress={() => handleSelectDistrict(dist)}
                  >
                    <Text
                      style={[
                        styles.dropdownListItemText,
                        selectedDistrict?.id === dist.id && styles.dropdownListItemTextActive,
                      ]}
                    >
                      {dist.name}
                    </Text>
                    <Text style={styles.dropdownListItemSub}>{dist.region}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* 2. Mandal Selector (Appears once district is selected) */}
          {selectedDistrict && (
            <>
              <Text style={styles.hierarchyLabel}>Mandal ({selectedDistrict.name} District)</Text>
              <TouchableOpacity
                style={styles.selectorDropdownButton}
                onPress={() => setShowMandalPicker(!showMandalPicker)}
                accessibilityRole="button"
                accessibilityLabel="Select Mandal"
              >
                <Text style={selectedMandal ? styles.selectorTextSelected : styles.selectorTextPlaceholder}>
                  {selectedMandal ? selectedMandal.name : 'Select Mandal...'}
                </Text>
                <Text style={styles.dropdownChevron}>{showMandalPicker ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {showMandalPicker && (
                <View style={styles.dropdownListContainer}>
                  <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled>
                    {selectedDistrict.mandals.map((mandal) => (
                      <TouchableOpacity
                        key={mandal.id}
                        style={[
                          styles.dropdownListItem,
                          selectedMandal?.id === mandal.id && styles.dropdownListItemActive,
                        ]}
                        onPress={() => handleSelectMandal(mandal)}
                      >
                        <Text
                          style={[
                            styles.dropdownListItemText,
                            selectedMandal?.id === mandal.id && styles.dropdownListItemTextActive,
                          ]}
                        >
                          {mandal.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </>
          )}

          {/* 3. Locality / Landmark Selector (Appears once mandal is selected) */}
          {selectedMandal && (
            <>
              <Text style={styles.hierarchyLabel}>Town / Locality ({selectedMandal.name})</Text>
              <TouchableOpacity
                style={styles.selectorDropdownButton}
                onPress={() => setShowLocalityPicker(!showLocalityPicker)}
                accessibilityRole="button"
                accessibilityLabel="Select Locality"
              >
                <Text style={selectedLocality ? styles.selectorTextSelected : styles.selectorTextPlaceholder}>
                  {selectedLocality ? selectedLocality.name : 'Choose Town or Locality...'}
                </Text>
                <Text style={styles.dropdownChevron}>{showLocalityPicker ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {showLocalityPicker && (
                <View style={styles.dropdownListContainer}>
                  <View style={styles.searchBarContainer}>
                    <TextInput
                      style={styles.searchBarInput}
                      placeholder="Search localities in mandal..."
                      placeholderTextColor={colors.textMuted}
                      value={localitySearchText}
                      onChangeText={setLocalitySearchText}
                    />
                  </View>
                  <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled>
                    {filteredLocalities.map((loc) => (
                      <TouchableOpacity
                        key={loc.id}
                        style={[
                          styles.dropdownListItem,
                          selectedLocality?.id === loc.id && styles.dropdownListItemActive,
                        ]}
                        onPress={() => handleSelectLocality(loc)}
                      >
                        <Text
                          style={[
                            styles.dropdownListItemText,
                            selectedLocality?.id === loc.id && styles.dropdownListItemTextActive,
                          ]}
                        >
                          {loc.name}
                        </Text>
                        <Text style={styles.dropdownListItemSub}>{loc.type}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </>
          )}

          {/* 4. Landmark Free-text details */}
          <Text style={styles.hierarchyLabel}>Specific Landmark / Street Details (Optional)</Text>
          <Input
            placeholder="e.g. Near Government High School gate or Opposite Water Tank"
            value={landmarkDetails}
            onChangeText={setLandmarkDetails}
            maxLength={255}
          />
        </View>

        {/* Submission Progress Indicator */}
        {isSubmitting && submissionStep && (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.progressText}>{submissionStep}</Text>
          </View>
        )}

        {/* Submit Actions */}
        <View style={styles.submitSection}>
          <Button
            title={isSubmitting ? 'Submitting Report...' : 'Submit Civic Report'}
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            size="lg"
            style={styles.submitButton}
          />
          <Text style={styles.disclaimerText}>
            CivicPulse validates that all submissions fall strictly within Andhra Pradesh jurisdiction to ensure authentic municipal accountability.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  navTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  sectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  attachedPhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  attachedPhotoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: radii.sm,
    backgroundColor: colors.borderSubtle,
  },
  attachedPhotoMeta: {
    flex: 1,
  },
  attachedPhotoTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  attachedPhotoSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.success,
    marginTop: 2,
  },
  removeAttachedBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  removeAttachedText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    fontWeight: typography.weights.bold,
  },
  addPhotoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  addPhotoIcon: {
    fontSize: 20,
  },
  addPhotoText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.lg,
  },
  categoryCard: {
    width: '47%',
    margin: '1.5%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  categoryCardText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  categoryCardTextSelected: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  locationSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  stateLockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    gap: 4,
  },
  lockIcon: {
    fontSize: 12,
  },
  stateLockedText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#3730A3',
  },
  locationContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  gpsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    marginBottom: spacing.sm,
  },
  gpsInfoCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  gpsStatusTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  gpsStatusSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clearGpsBtn: {
    paddingHorizontal: spacing.xs,
  },
  clearGpsText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    fontWeight: typography.weights.bold,
  },
  locationErrorBox: {
    backgroundColor: colors.errorBackground,
    padding: spacing.sm,
    borderRadius: radii.sm,
    marginBottom: spacing.sm,
  },
  locationErrorText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    lineHeight: 18,
  },
  resetGpsBtn: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: colors.cardBackground,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.error,
  },
  resetGpsText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  hierarchyLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  selectorDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  selectorTextSelected: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  selectorTextPlaceholder: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  dropdownChevron: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dropdownListContainer: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    maxHeight: 180,
    overflow: 'hidden',
  },
  dropdownScrollView: {
    maxHeight: 180,
  },
  dropdownListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  dropdownListItemActive: {
    backgroundColor: colors.primaryLight,
  },
  dropdownListItemText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  dropdownListItemTextActive: {
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  dropdownListItemSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  searchBarContainer: {
    padding: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.borderSubtle,
  },
  searchBarInput: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.sm,
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
  },
  errorBox: {
    backgroundColor: colors.errorBackground,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
  },
  duplicateNoticeBox: {
    backgroundColor: colors.warningBackground,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  duplicateNoticeTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.warning,
    marginBottom: spacing.xs,
  },
  duplicateNoticeSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  duplicateItem: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
    marginVertical: 2,
  },
  submitSection: {
    marginTop: spacing.sm,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.borderSubtle,
    padding: spacing.sm,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  disclaimerText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: typography.lineHeights.normal,
  },
});

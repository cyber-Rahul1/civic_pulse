import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { colors, radii, spacing, typography } from '../theme/tokens';

export interface PhotoCaptureResult {
  uri: string;
  name: string;
  type: string;
}

interface CameraCaptureModalProps {
  onPhotoAccepted: (photo: PhotoCaptureResult) => void;
  onSkip: () => void;
  onCancel: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  onPhotoAccepted,
  onSkip,
  onCancel,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      setCameraError(null);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        skipProcessing: false,
      });

      if (photo?.uri) {
        setCapturedPhotoUri(photo.uri);
      } else {
        setCameraError('Failed to capture photo frame. Please try again.');
      }
    } catch (err: any) {
      setCameraError(err?.message || 'Error occurred while capturing photo.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRetake = () => {
    setCapturedPhotoUri(null);
    setCameraError(null);
  };

  const handleUsePhoto = () => {
    if (!capturedPhotoUri) return;
    onPhotoAccepted({
      uri: capturedPhotoUri,
      name: `civic_evidence_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });
  };

  const handlePickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Gallery Permission Denied',
          'Permission to access photo gallery was denied. You can still skip photo or retry.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset?.uri) {
          onPhotoAccepted({
            uri: asset.uri,
            name: asset.fileName || `gallery_evidence_${Date.now()}.jpg`,
            type: asset.mimeType || 'image/jpeg',
          });
        }
      }
    } catch (err: any) {
      Alert.alert('Gallery Error', err?.message || 'Failed to pick image from gallery.');
    }
  };

  // If permission is denied or undetermined, provide clear fallback
  if (!permission || !permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onCancel} style={styles.topBarButton}>
            <Text style={styles.topBarButtonText}>✕ Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSkip} style={styles.topBarButton}>
            <Text style={styles.topBarButtonHighlight}>Skip Photo →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.permissionContent}>
          <Text style={styles.cameraIconLarge}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionMessage}>
            CivicPulse uses photo evidence to accelerate municipal verification. You can grant camera
            permission, choose a photo from your gallery, or continue without a photo.
          </Text>

          <View style={styles.actionButtonGroup}>
            <TouchableOpacity style={styles.primaryActionButton} onPress={requestPermission}>
              <Text style={styles.primaryActionText}>Grant Camera Permission</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryActionButton} onPress={handlePickFromGallery}>
              <Text style={styles.secondaryActionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textActionButton} onPress={onSkip}>
              <Text style={styles.textActionText}>Continue without Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Preview captured photo state
  if (capturedPhotoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedPhotoUri }} style={styles.previewImage} resizeMode="cover" />

        <View style={styles.previewOverlayHeader}>
          <Text style={styles.previewHeaderText}>Photo Evidence Captured</Text>
        </View>

        <View style={styles.previewFooterActions}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={handleRetake}
            accessibilityRole="button"
            accessibilityLabel="Retake Photo"
          >
            <Text style={styles.retakeButtonText}>↺ Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.usePhotoButton}
            onPress={handleUsePhoto}
            accessibilityRole="button"
            accessibilityLabel="Use Photo"
          >
            <Text style={styles.usePhotoButtonText}>✓ Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Active Native Camera Preview View
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onCameraReady={() => setIsCameraReady(true)}
      />

      {/* Top Header Overlay */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onCancel} style={styles.topBarButton} accessibilityLabel="Cancel">
          <Text style={styles.topBarButtonText}>✕ Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modeTitle}>Capture Issue Photo</Text>
        <TouchableOpacity onPress={onSkip} style={styles.topBarButton} accessibilityLabel="Skip Photo">
          <Text style={styles.topBarButtonHighlight}>Skip →</Text>
        </TouchableOpacity>
      </View>

      {/* Camera error banner if any */}
      {cameraError ? (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorOverlayText}>{cameraError}</Text>
        </View>
      ) : null}

      {/* Bottom Controls Overlay */}
      <View style={styles.bottomBar}>
        {/* Gallery selection button */}
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handlePickFromGallery}
          accessibilityRole="button"
          accessibilityLabel="Choose from Gallery"
        >
          <Text style={styles.galleryButtonIcon}>🖼️</Text>
          <Text style={styles.galleryButtonText}>Gallery</Text>
        </TouchableOpacity>

        {/* Capture Shutter Button */}
        <TouchableOpacity
          style={[styles.captureButtonOuter, (!isCameraReady || isCapturing) && styles.captureButtonDisabled]}
          onPress={handleCapture}
          disabled={!isCameraReady || isCapturing}
          accessibilityRole="button"
          accessibilityLabel="Capture Photo"
        >
          {isCapturing ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <View style={styles.captureButtonInner} />
          )}
        </TouchableOpacity>

        {/* Skip button for balance */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onSkip}
          accessibilityRole="button"
          accessibilityLabel="Skip photography"
        >
          <Text style={styles.skipButtonIcon}>⏭️</Text>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.hero,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 10,
  },
  topBarButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  topBarButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  topBarButtonHighlight: {
    color: '#60A5FA',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  modeTitle: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.xl,
    paddingBottom: Platform.OS === 'android' ? spacing.xl : spacing.hero,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 10,
  },
  captureButtonOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  galleryButtonIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  skipButtonIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewOverlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.hero,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
  },
  previewHeaderText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  previewFooterActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    paddingBottom: Platform.OS === 'android' ? spacing.xl : spacing.hero,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    gap: spacing.md,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: '#374151',
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  usePhotoButton: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usePhotoButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  permissionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.hero,
  },
  cameraIconLarge: {
    fontSize: 54,
    marginBottom: spacing.lg,
  },
  permissionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.hero,
  },
  actionButtonGroup: {
    width: '100%',
    gap: spacing.sm,
  },
  primaryActionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  secondaryActionButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  textActionButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  textActionText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  errorOverlay: {
    position: 'absolute',
    top: 80,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    padding: spacing.sm,
    borderRadius: radii.sm,
    zIndex: 20,
  },
  errorOverlayText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
});

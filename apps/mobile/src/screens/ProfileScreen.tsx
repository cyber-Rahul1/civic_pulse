import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { NotificationPreferencesDto, LocationVerificationStatus } from '@civic-pulse/contracts';
import { useAuth } from '../context/auth-context';
import { apiClient } from '../api/api-client';
import { Button } from '../components/Button';
import { BackButton } from '../components/BackButton';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface ProfileScreenProps {
  onBack: () => void;
  onLogin?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogin }) => {
  const { user, logout, updateUser } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferencesDto | null>(null);
  const [isLoadingPrefs, setIsLoadingPrefs] = useState(true);
  const [isUpdatingPrefs, setIsUpdatingPrefs] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // GPS Verification State
  const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);
  const [locationVerificationMsg, setLocationVerificationMsg] = useState<string | null>(null);
  const [locationVerificationError, setLocationVerificationError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    try {
      const data = await apiClient.getNotificationPreferences();
      setPreferences(data);
    } catch {
      // Preferences may not be initialized yet
    } finally {
      setIsLoadingPrefs(false);
    }
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const togglePreference = async (key: keyof NotificationPreferencesDto, value: boolean) => {
    if (!preferences || isUpdatingPrefs) return;
    setIsUpdatingPrefs(true);
    try {
      const updated = await apiClient.updateNotificationPreferences({
        [key]: value,
      });
      setPreferences(updated);
    } catch {
      // rollback or retry
    } finally {
      setIsUpdatingPrefs(false);
    }
  };

  const handleVerifyLocation = async () => {
    setIsVerifyingLocation(true);
    setLocationVerificationMsg('Requesting device GPS position...');
    setLocationVerificationError(null);

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
          setIsVerifyingLocation(false);
          setLocationVerificationMsg(null);
          setLocationVerificationError('Location permission denied. Cannot verify current location.');
          return;
        }

        setLocationVerificationMsg('Acquiring fresh high-accuracy GPS fix...');
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (position?.coords) {
          const lat = Number(position.coords.latitude.toFixed(4));
          const lng = Number(position.coords.longitude.toFixed(4));
          const accuracy = position.coords.accuracy ? Math.round(position.coords.accuracy) : undefined;

          setLocationVerificationMsg('Validating with Andhra Pradesh geographic dataset...');
          const updatedProfile = await apiClient.verifyCurrentLocation({
            coordinates: [lng, lat],
            accuracyMeters: accuracy,
            timestamp: position.timestamp || Date.now(),
          });

          updateUser(updatedProfile);
          setLocationVerificationMsg('Verified current location updated successfully!');
          setIsVerifyingLocation(false);
          return;
        }
      }

      // Browser fallback if expo-location is unavailable
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = Number(pos.coords.latitude.toFixed(4));
            const lng = Number(pos.coords.longitude.toFixed(4));
            const accuracy = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : undefined;

            try {
              const updatedProfile = await apiClient.verifyCurrentLocation({
                coordinates: [lng, lat],
                accuracyMeters: accuracy,
                timestamp: pos.timestamp || Date.now(),
              });
              updateUser(updatedProfile);
              setLocationVerificationMsg('Verified current location updated successfully!');
            } catch (apiErr: any) {
              setLocationVerificationError(apiErr?.message || 'Server validation failed');
            } finally {
              setIsVerifyingLocation(false);
            }
          },
          (err) => {
            setIsVerifyingLocation(false);
            setLocationVerificationMsg(null);
            setLocationVerificationError(err?.message || 'GPS fix unavailable or timed out.');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setIsVerifyingLocation(false);
        setLocationVerificationMsg(null);
        setLocationVerificationError('Location services are unavailable on this device.');
      }
    } catch (err: any) {
      setIsVerifyingLocation(false);
      setLocationVerificationMsg(null);
      setLocationVerificationError(err?.message || 'Failed to verify GPS location.');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch {
      // ignore
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackButton onPress={onBack} />
        <Text style={styles.navTitle}>Account & Settings</Text>
        <View style={{ width: 68 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card / Guest Card */}
        {!user ? (
          <View style={styles.profileCard}>
            <View style={[styles.avatar, { backgroundColor: colors.surfaceMuted }]}>
              <Text style={[styles.avatarText, { color: colors.textSecondary }]}>👤</Text>
            </View>
            <Text style={styles.displayName}>Guest Visitor</Text>
            <Text style={styles.emailText}>Browsing CivicPulse publicly</Text>
            <View style={[styles.roleBadge, { backgroundColor: '#F1F5F9' }]}>
              <Text style={[styles.roleText, { color: colors.textSecondary }]}>ROLE: GUEST</Text>
            </View>
            <View style={{ width: '100%', marginTop: spacing.md }}>
              <Button
                title="Sign In / Register"
                onPress={() => {
                  if (onLogin) {
                    onLogin();
                  }
                }}
                variant="primary"
                size="md"
              />
            </View>
          </View>
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <Text style={styles.displayName}>{user.displayName || 'Resident'}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>ROLE: {user.role.toUpperCase()}</Text>
            </View>
          </View>
        )}

        {/* Section: Verified Current Location (Only when logged in) */}
        {user && (
          <>
            <Text style={styles.sectionHeader}>Verified Current Location</Text>
            <View style={styles.locationCard}>
              <View style={styles.locationHeaderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.locationStatusTitle}>
                    {user.verifiedCurrentLocation?.status === LocationVerificationStatus.VERIFIED
                      ? '📍 GPS-Verified Device Location'
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.OUTSIDE_AP
                      ? '🚫 Outside Andhra Pradesh'
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.INACCURATE
                      ? '⚠️ Inaccurate GPS Fix'
                      : '⚪ Location Unverified'}
                  </Text>
                  <Text style={styles.locationStatusDesc}>
                    {user.verifiedCurrentLocation?.status === LocationVerificationStatus.VERIFIED
                      ? `${user.verifiedCurrentLocation.cityOrTown || 'City Unknown'}, ${user.verifiedCurrentLocation.districtName || ''} (${user.verifiedCurrentLocation.state})`
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.OUTSIDE_AP
                      ? 'Device coordinates are outside Andhra Pradesh boundaries.'
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.INACCURATE
                      ? 'GPS accuracy exceeds 3000m tolerance. City could not be verified reliably.'
                      : 'Verify your device location using fresh GPS telemetry.'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.verificationBadge,
                    user.verifiedCurrentLocation?.status === LocationVerificationStatus.VERIFIED
                      ? styles.badgeVerified
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.OUTSIDE_AP
                      ? styles.badgeOutside
                      : user.verifiedCurrentLocation?.status === LocationVerificationStatus.INACCURATE
                      ? styles.badgeInaccurate
                      : styles.badgeUnverified,
                  ]}
                >
                  <Text style={styles.verificationBadgeText}>
                    {user.verifiedCurrentLocation?.status || 'UNVERIFIED'}
                  </Text>
                </View>
              </View>

              {user.verifiedCurrentLocation?.verifiedAt && (
                <Text style={styles.locationMetaText}>
                  Last checked: {new Date(user.verifiedCurrentLocation.verifiedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                  {user.verifiedCurrentLocation.accuracyMeters !== undefined ? `(±${user.verifiedCurrentLocation.accuracyMeters}m)` : ''}
                </Text>
              )}

              {locationVerificationMsg && (
                <Text style={styles.locationMsgText}>{locationVerificationMsg}</Text>
              )}

              {locationVerificationError && (
                <Text style={styles.locationErrorText}>{locationVerificationError}</Text>
              )}

              <View style={styles.locationActionRow}>
                <Button
                  title={isVerifyingLocation ? 'Acquiring GPS...' : 'Re-check Current Location'}
                  onPress={handleVerifyLocation}
                  variant="primary"
                  size="sm"
                  loading={isVerifyingLocation}
                />
              </View>

              <Text style={styles.locationDisclaimer}>
                Important: This verifies your device's approximate GPS position at measurement time. It establishes current location eligibility and does not prove permanent legal residence.
              </Text>
            </View>

            {/* Notification Preferences */}
            <Text style={styles.sectionHeader}>Notification Preferences</Text>
            <View style={styles.settingsCard}>
              {isLoadingPrefs ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : preferences ? (
                <>
                  <View style={styles.settingRow}>
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingLabel}>Status Changes</Text>
                      <Text style={styles.settingDescription}>
                        Notify when your reports are reviewed or resolved
                      </Text>
                    </View>
                    <Switch
                      value={preferences.notifyOnStatusChange}
                      onValueChange={(val) => togglePreference('notifyOnStatusChange', val)}
                      trackColor={{ false: colors.border, true: colors.primaryLight }}
                    />
                  </View>

                  <View style={styles.settingRow}>
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingLabel}>Discussion Comments</Text>
                      <Text style={styles.settingDescription}>
                        Notify when neighbors or staff comment on reports
                      </Text>
                    </View>
                    <Switch
                      value={preferences.notifyOnComments}
                      onValueChange={(val) => togglePreference('notifyOnComments', val)}
                      trackColor={{ false: colors.border, true: colors.primaryLight }}
                    />
                  </View>

                  <View style={styles.settingRow}>
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingLabel}>Official Assignments</Text>
                      <Text style={styles.settingDescription}>
                        Notify when assigned to a municipal department
                      </Text>
                    </View>
                    <Switch
                      value={preferences.notifyOnAssignments}
                      onValueChange={(val) => togglePreference('notifyOnAssignments', val)}
                      trackColor={{ false: colors.border, true: colors.primaryLight }}
                    />
                  </View>
                </>
              ) : (
                <Text style={styles.errorText}>Could not load preferences.</Text>
              )}
            </View>
          </>
        )}

        {/* Platform & Trust Information */}
        <Text style={styles.sectionHeader}>About CivicPulse</Text>
        <View style={styles.settingsCard}>
          <Text style={styles.aboutTitle}>CivicPulse Mobile v0.1.0</Text>
          <Text style={styles.aboutText}>
            CivicPulse is an open civic accountability network. Location data submitted by residents is securely fuzz-rounded to protect home privacy.
          </Text>
        </View>

        {/* Logout Section (Only when logged in) */}
        {user && (
          <View style={styles.logoutSection}>
            <Button
              title="Sign Out"
              onPress={handleLogout}
              variant="danger"
              size="lg"
              loading={isLoggingOut}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
  backButton: {
    paddingVertical: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  navTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.hero,
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#FFFFFF',
  },
  displayName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  emailText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  roleBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#D4E2FC',
  },
  roleText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  sectionHeader: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  settingDescription: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  aboutTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  aboutText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
  },
  logoutSection: {
    marginTop: spacing.xl,
  },
  locationCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  locationStatusTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  locationStatusDesc: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  verificationBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  badgeVerified: {
    backgroundColor: '#EDFDF5',
    borderColor: '#B9F1D4',
  },
  badgeOutside: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  badgeInaccurate: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  badgeUnverified: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSubtle,
  },
  verificationBadgeText: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  locationMetaText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  locationMsgText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
  },
  locationErrorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
  },
  locationActionRow: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  locationDisclaimer: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});


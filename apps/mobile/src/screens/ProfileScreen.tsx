import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { NotificationPreferencesDto } from '@civic-pulse/contracts';
import { useAuth } from '../context/auth-context';
import { apiClient } from '../api/api-client';
import { Button } from '../components/Button';
import { colors, radii, spacing, typography } from '../theme/tokens';

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferencesDto | null>(null);
  const [isLoadingPrefs, setIsLoadingPrefs] = useState(true);
  const [isUpdatingPrefs, setIsUpdatingPrefs] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Account & Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.displayName}>{user?.displayName || 'Resident'}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>ROLE: {user?.role.toUpperCase()}</Text>
          </View>
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

        {/* Platform & Trust Information */}
        <Text style={styles.sectionHeader}>About CivicPulse</Text>
        <View style={styles.settingsCard}>
          <Text style={styles.aboutTitle}>CivicPulse Mobile v0.1.0</Text>
          <Text style={styles.aboutText}>
            CivicPulse is an open civic accountability network. Location data submitted by residents is securely fuzz-rounded to protect home privacy.
          </Text>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="danger"
            size="lg"
            loading={isLoggingOut}
          />
        </View>
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
    paddingVertical: spacing.md,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.hero,
  },
  profileCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textInverse,
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
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.pill,
  },
  roleText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  sectionHeader: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  settingsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
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
});

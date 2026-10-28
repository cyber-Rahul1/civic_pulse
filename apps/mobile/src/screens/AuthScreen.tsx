import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/auth-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BackButton } from '../components/BackButton';
import { colors, spacing, typography, radii } from '../theme/tokens';

interface AuthScreenProps {
  initialMode?: 'welcome' | 'login' | 'register';
  onAuthenticated?: () => void;
  onCancel?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onAuthenticated,
  onCancel,
}) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>(initialMode);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  // Validation & Submission
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setDisplayNameError('');
    setGeneralError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (mode === 'register') {
      if (!displayName.trim() || displayName.trim().length < 2) {
        setDisplayNameError('Name must be at least 2 characters');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setGeneralError('');
    try {
      await login({
        email: email.trim(),
        password,
      });
      onAuthenticated?.();
    } catch (err: any) {
      setGeneralError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setGeneralError('');
    try {
      await register({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
      onAuthenticated?.();
    } catch (err: any) {
      setGeneralError(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === 'welcome') {
    return (
      <ScrollView contentContainerStyle={styles.welcomeContainer}>
        {onCancel && (
          <TouchableOpacity style={styles.topCloseBtn} onPress={onCancel}>
            <Text style={styles.topCloseText}>✕ Close</Text>
          </TouchableOpacity>
        )}

        <View style={styles.welcomeHero}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>CP</Text>
          </View>
          <Text style={styles.appTitle}>CivicPulse</Text>
          <Text style={styles.tagline}>Your community. Your voice.</Text>
          <Text style={styles.welcomeDescription}>
            Report local civic issues, track real-time authority responses, and hold municipal services accountable.
          </Text>
        </View>

        <View style={styles.welcomeActions}>
          <Button
            title="Create an Account"
            onPress={() => setMode('register')}
            size="lg"
            style={styles.actionBtn}
          />
          <Button
            title="Sign In"
            onPress={() => setMode('login')}
            variant="outline"
            size="lg"
            style={styles.actionBtn}
          />
          {onCancel && (
            <TouchableOpacity style={styles.guestLinkBtn} onPress={onCancel}>
              <Text style={styles.guestLinkText}>Continue browsing as guest →</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screenContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {onCancel && (
          <View style={{ marginBottom: spacing.md, alignSelf: 'flex-start' }}>
            <BackButton onPress={onCancel} label="Back to App" />
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.screenTitle}>
            {mode === 'login' ? 'Welcome Back' : 'Join CivicPulse'}
          </Text>
          <Text style={styles.screenSubtitle}>
            {mode === 'login'
              ? 'Sign in to report civic issues and participate in community discussions'
              : 'Empower your neighborhood with civic transparency'}
          </Text>
        </View>

        {generalError ? (
          <View style={styles.generalErrorBox}>
            <Text style={styles.generalErrorText}>{generalError}</Text>
          </View>
        ) : null}

        {mode === 'register' && (
          <Input
            label="Full Name"
            placeholder="Jane Resident"
            value={displayName}
            onChangeText={setDisplayName}
            error={displayNameError}
            autoCapitalize="words"
            autoCorrect={false}
          />
        )}

        <Input
          label="Email Address"
          placeholder="resident@example.com"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <Input
          label="Password"
          placeholder="At least 8 characters"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.submitSection}>
          <Button
            title={mode === 'login' ? 'Sign In' : 'Create Account'}
            onPress={mode === 'login' ? handleLogin : handleRegister}
            loading={isSubmitting}
            size="lg"
          />

          <Button
            title={
              mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'
            }
            onPress={() => {
              setGeneralError('');
              setMode(mode === 'login' ? 'register' : 'login');
            }}
            variant="ghost"
            style={styles.switchModeBtn}
          />

          {onCancel && (
            <TouchableOpacity style={styles.guestLinkBtn} onPress={onCancel}>
              <Text style={styles.guestLinkText}>Continue browsing as guest →</Text>
            </TouchableOpacity>
          )}
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
    padding: spacing.xl,
    justifyContent: 'center',
    flexGrow: 1,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingTop: spacing.hero,
  },
  topCloseBtn: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  topCloseText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
  },
  welcomeHero: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.action,
    marginBottom: spacing.md,
  },
  welcomeDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal,
    paddingHorizontal: spacing.md,
  },
  welcomeActions: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  actionBtn: {
    marginBottom: spacing.md,
  },
  guestLinkBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  guestLinkText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
  },
  header: {
    marginBottom: spacing.xl,
  },
  screenTitle: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  screenSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  generalErrorBox: {
    backgroundColor: colors.errorBackground,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  generalErrorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
  },
  submitSection: {
    marginTop: spacing.md,
  },
  switchModeBtn: {
    marginTop: spacing.sm,
  },
});

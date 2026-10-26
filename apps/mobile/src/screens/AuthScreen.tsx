import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/auth-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors, spacing, typography, radii } from '../theme/tokens';

interface AuthScreenProps {
  initialMode?: 'welcome' | 'login' | 'register';
  onAuthenticated?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'welcome',
  onAuthenticated,
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
          <Button
            title="Demo Resident Login"
            onPress={async () => {
              setIsSubmitting(true);
              setGeneralError('');
              try {
                await login({
                  email: 'resident.phase2@example.com',
                  password: 'ResidentPass123!',
                });
                onAuthenticated?.();
              } catch (err: any) {
                setGeneralError(err.message || 'Login error');
                setMode('login');
              } finally {
                setIsSubmitting(false);
              }
            }}
            variant="secondary"
            size="md"
            loading={isSubmitting}
            style={styles.actionBtn}
          />
          <Button
            title="Demo Authority Login"
            onPress={async () => {
              setIsSubmitting(true);
              setGeneralError('');
              try {
                await login({
                  email: 'authority.phase2@example.com',
                  password: 'AuthorityPass123!',
                });
                onAuthenticated?.();
              } catch (err: any) {
                setGeneralError(err.message || 'Login error');
                setMode('login');
              } finally {
                setIsSubmitting(false);
              }
            }}
            variant="outline"
            size="md"
            loading={isSubmitting}
            style={styles.actionBtn}
          />
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
        <View style={styles.header}>
          <Text style={styles.screenTitle}>
            {mode === 'login' ? 'Welcome Back' : 'Join CivicPulse'}
          </Text>
          <Text style={styles.screenSubtitle}>
            {mode === 'login'
              ? 'Sign in to monitor and report civic issues'
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

          <Button
            title="Back to Welcome"
            onPress={() => setMode('welcome')}
            variant="ghost"
            size="sm"
          />

          <View style={{ marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderColor: colors.borderSubtle }}>
            <Button
              title="Quick Fill: Resident"
              onPress={() => {
                setEmail('resident.phase2@example.com');
                setPassword('ResidentPass123!');
              }}
              variant="outline"
              size="sm"
              style={{ marginBottom: spacing.xs }}
            />
            <Button
              title="Quick Fill: Authority"
              onPress={() => {
                setEmail('authority.phase2@example.com');
                setPassword('AuthorityPass123!');
              }}
              variant="outline"
              size="sm"
            />
          </View>
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
    paddingTop: spacing.hero * 2,
  },
  welcomeHero: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  appTitle: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.secondary,
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
  },
  generalErrorBox: {
    backgroundColor: colors.errorBackground,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
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

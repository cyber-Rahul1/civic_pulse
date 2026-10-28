import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Button } from './Button';
import { colors, radii, shadows, spacing, typography } from '../theme/tokens';

interface StateCardProps {
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
  icon?: string;
}

export const EmptyState: React.FC<StateCardProps> = ({
  title,
  description,
  actionTitle,
  onAction,
  style,
  icon = '📭',
}) => {
  return (
    <View style={[styles.container, styles.emptyContainer, style]}>
      <Text style={styles.stateIcon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          size="sm"
          style={styles.button}
        />
      )}
    </View>
  );
};

export const ErrorState: React.FC<StateCardProps> = ({
  title,
  description,
  actionTitle = 'Try Again',
  onAction,
  style,
  icon = '⚠️',
}) => {
  return (
    <View style={[styles.container, styles.errorContainer, style]}>
      <Text style={styles.stateIcon}>{icon}</Text>
      <Text style={[styles.title, styles.errorTitle]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="primary"
          size="sm"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  emptyContainer: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    ...shadows.subtle,
    marginVertical: spacing.lg,
  },
  errorContainer: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
    margin: spacing.md,
  },
  stateIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  errorTitle: {
    color: colors.error,
  },
  description: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.body,
    marginBottom: spacing.md,
    maxWidth: 320,
  },
  button: {
    marginTop: spacing.xs,
    minWidth: 120,
  },
});


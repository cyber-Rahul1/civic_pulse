import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Button } from './Button';
import { colors, spacing, typography } from '../theme/tokens';

interface StateCardProps {
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<StateCardProps> = ({
  title,
  description,
  actionTitle,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
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
}) => {
  return (
    <View style={[styles.container, styles.errorContainer, style]}>
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
  },
  errorContainer: {
    backgroundColor: colors.errorBackground,
    borderRadius: 8,
    margin: spacing.md,
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
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.xs,
  },
});

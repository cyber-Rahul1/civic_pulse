import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, radii, spacing, typography } from '../theme/tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'tonal';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
  icon,
}) => {
  const isActionDisabled = disabled || loading;

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'danger':
        return styles.dangerContainer;
      case 'ghost':
        return styles.ghostContainer;
      case 'tonal':
        return styles.tonalContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'danger':
        return styles.dangerText;
      case 'ghost':
        return styles.ghostText;
      case 'tonal':
        return styles.tonalText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return styles.sizeSm;
      case 'lg':
        return styles.sizeLg;
      case 'md':
      default:
        return styles.sizeMd;
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: isActionDisabled, busy: loading }}
      activeOpacity={0.82}
      onPress={onPress}
      disabled={isActionDisabled}
      style={[
        styles.baseContainer,
        getContainerStyle(),
        getSizeStyle(),
        isActionDisabled && styles.disabledContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textInverse}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
          <Text style={[styles.baseText, getTextStyle(), isActionDisabled && styles.disabledText, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: spacing.xs + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    letterSpacing: 0.15,
  },
  sizeSm: {
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    minHeight: 34,
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    minHeight: 46,
  },
  sizeLg: {
    paddingVertical: 15,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    minHeight: 52,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: '#2648A5',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryText: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: '#0C836F',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryText: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  outlineContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  outlineText: {
    color: colors.textPrimary,
    fontWeight: typography.weights.semibold,
  },
  tonalContainer: {
    backgroundColor: colors.primarySubtle,
    borderWidth: 1,
    borderColor: '#D3DCF3',
  },
  tonalText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  dangerContainer: {
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: '#A82B3A',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  dangerText: {
    color: colors.textInverse,
    fontWeight: typography.weights.bold,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  disabledContainer: {
    opacity: 0.45,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledText: {
    opacity: 0.85,
  },
});

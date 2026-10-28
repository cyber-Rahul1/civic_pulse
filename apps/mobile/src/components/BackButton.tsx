import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radii, spacing, typography } from '../theme/tokens';

export interface BackButtonProps {
  onPress: () => void;
  label?: string;
  variant?: 'pill' | 'minimal' | 'circle';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  testID?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  label = 'Back',
  variant = 'pill',
  style,
  textStyle,
  iconColor = colors.primary,
  testID = 'nav-back-button',
}) => {
  if (variant === 'circle') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.circleButton, style]}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label ? `Go back, ${label}` : 'Go back'}
        testID={testID}
      >
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15 19l-7-7 7-7"
            stroke={iconColor}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  }

  if (variant === 'minimal') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.minimalButton, style]}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label ? `Go back, ${label}` : 'Go back'}
        testID={testID}
      >
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
          <Path
            d="M15 19l-7-7 7-7"
            stroke={iconColor}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        {label ? <Text style={[styles.minimalText, { color: iconColor }, textStyle]}>{label}</Text> : null}
      </TouchableOpacity>
    );
  }

  // Default: modern subtle pill button with sleek chevron icon & label
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pillButton, style]}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={label ? `Go back, ${label}` : 'Go back'}
      testID={testID}
    >
      <View style={styles.iconCircle}>
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15 19l-7-7 7-7"
            stroke={iconColor}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      {label ? <Text style={[styles.pillText, textStyle]}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // subtle slate-100 pill
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  pillText: {
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.1,
  },
  minimalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
  },
  minimalText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  circleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});

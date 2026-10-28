import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, radii, spacing, typography } from '../theme/tokens';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  /** Optional debounce delay in milliseconds for onDebouncedChange callback */
  debounceDelay?: number;
  /** Callback fired after user stops typing for debounceDelay milliseconds */
  onDebouncedChange?: (value: string) => void;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon/element */
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  containerStyle,
  style,
  onFocus,
  onBlur,
  value,
  onChangeText,
  debounceDelay = 300,
  onDebouncedChange,
  leftIcon,
  rightElement,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? '');

  // Keep internal value in sync with controlled value prop if provided
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Handle debounced callback
  useEffect(() => {
    if (!onDebouncedChange) return;

    const timer = setTimeout(() => {
      onDebouncedChange(internalValue);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [internalValue, debounceDelay, onDebouncedChange]);

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused ? styles.inputWrapperFocused : null,
          error ? styles.inputWrapperError : null,
        ]}
      >
        {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textPlaceholder}
          value={internalValue}
          onChangeText={handleChangeText}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...textInputProps}
        />
        {rightElement ? <View style={styles.rightElementContainer}>{rightElement}</View> : null}
      </View>
      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs + 2,
    letterSpacing: 0.1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: colors.error,
    backgroundColor: colors.errorBackground,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightElementContainer: {
    marginLeft: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  hintText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

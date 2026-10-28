import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from './Button';
import { radii, spacing, typography } from '../theme/tokens';

export interface LoginPromptModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  title?: string;
  message?: string;
  actionText?: string;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  visible,
  onClose,
  onLogin,
  title = 'Sign In Required',
  message = 'Sign in or create a free account to report issues, support community reports, and engage with local representatives.',
  actionText = 'Sign In / Register',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🔐</Text>
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <View style={styles.actionColumn}>
                <Button
                  title={actionText}
                  onPress={() => {
                    onClose();
                    onLogin();
                  }}
                  size="md"
                  variant="primary"
                  style={styles.primaryBtn}
                />
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelText}>Continue Browsing</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: typography.sizes.title,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: typography.sizes.sm,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  actionColumn: {
    width: '100%',
    gap: spacing.sm,
  },
  primaryBtn: {
    width: '100%',
  },
  cancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  cancelText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: '#64748B',
  },
});

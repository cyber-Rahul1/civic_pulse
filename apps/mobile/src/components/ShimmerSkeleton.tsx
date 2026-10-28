import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { radii, spacing } from '../theme/tokens';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * ShimmerSkeleton: High-contrast animated skeleton loader.
 * Uses a distinct slate-tinted base (#CBD5E1) and subtle highlight so it NEVER bleeds or looks washed out.
 */
export const ShimmerSkeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = radii.sm,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1.0, 0.6],
  });

  return (
    <View
      style={[
        styles.skeletonBase,
        {
          width: width as any,
          height: height as any,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.shimmerLayer,
          {
            borderRadius,
            opacity,
          },
        ]}
      />
    </View>
  );
};

/**
 * SkeletonReportCard: Shimmer placeholder resembling a full civic report card in feeds.
 */
export const SkeletonReportCard: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {/* Top category & status badges */}
      <View style={styles.rowBetween}>
        <ShimmerSkeleton width={80} height={18} borderRadius={radii.xs} />
        <ShimmerSkeleton width={90} height={20} borderRadius={radii.pill} />
      </View>

      {/* Main content: title + description + thumbnail */}
      <View style={[styles.row, { marginTop: spacing.sm, alignItems: 'flex-start' }]}>
        <View style={styles.flex1}>
          <ShimmerSkeleton width="85%" height={18} borderRadius={radii.xs} />
          <ShimmerSkeleton width="60%" height={14} borderRadius={radii.xs} style={{ marginTop: 6 }} />
          <ShimmerSkeleton width="95%" height={12} borderRadius={radii.xs} style={{ marginTop: 10 }} />
          <ShimmerSkeleton width="75%" height={12} borderRadius={radii.xs} style={{ marginTop: 4 }} />
        </View>
        <ShimmerSkeleton width={52} height={52} borderRadius={radii.md} style={{ marginLeft: spacing.md }} />
      </View>

      {/* Footer: location + date */}
      <View style={[styles.rowBetween, styles.cardFooter]}>
        <ShimmerSkeleton width={140} height={14} borderRadius={radii.xs} />
        <ShimmerSkeleton width={60} height={12} borderRadius={radii.xs} />
      </View>
    </View>
  );
};

/**
 * SkeletonRepresentativeCard: Shimmer placeholder for directory list items.
 */
export const SkeletonRepresentativeCard: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.cardContainer, style]}>
      <View style={styles.row}>
        <ShimmerSkeleton width={56} height={56} borderRadius={radii.pill} />
        <View style={[styles.flex1, { marginLeft: spacing.md }]}>
          <View style={styles.rowBetween}>
            <ShimmerSkeleton width={130} height={16} borderRadius={radii.xs} />
            <ShimmerSkeleton width={65} height={18} borderRadius={radii.pill} />
          </View>
          <ShimmerSkeleton width={160} height={12} borderRadius={radii.xs} style={{ marginTop: 6 }} />
          <ShimmerSkeleton width={100} height={12} borderRadius={radii.xs} style={{ marginTop: 6 }} />
        </View>
      </View>
    </View>
  );
};

/**
 * SkeletonNotificationRow: Shimmer placeholder for notifications list.
 */
export const SkeletonNotificationRow: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.notificationCard, style]}>
      <ShimmerSkeleton width={38} height={38} borderRadius={radii.pill} />
      <View style={[styles.flex1, { marginLeft: spacing.md }]}>
        <ShimmerSkeleton width="75%" height={15} borderRadius={radii.xs} />
        <ShimmerSkeleton width="95%" height={12} borderRadius={radii.xs} style={{ marginTop: 6 }} />
        <ShimmerSkeleton width="40%" height={10} borderRadius={radii.xs} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
};

/**
 * SkeletonDetailView: Shimmer placeholder for Report Detail Screen.
 */
export const SkeletonDetailView: React.FC = () => {
  return (
    <View style={styles.detailContainer}>
      {/* Top Header Card */}
      <View style={styles.cardContainer}>
        <View style={styles.rowBetween}>
          <ShimmerSkeleton width={100} height={20} borderRadius={radii.pill} />
          <ShimmerSkeleton width={80} height={20} borderRadius={radii.pill} />
        </View>
        <ShimmerSkeleton width="90%" height={24} borderRadius={radii.sm} style={{ marginTop: spacing.md }} />
        <ShimmerSkeleton width="60%" height={14} borderRadius={radii.xs} style={{ marginTop: spacing.xs }} />
        <ShimmerSkeleton width="100%" height={180} borderRadius={radii.lg} style={{ marginTop: spacing.md }} />
      </View>

      {/* Meta cards */}
      <View style={[styles.cardContainer, { marginTop: spacing.md }]}>
        <ShimmerSkeleton width={140} height={16} borderRadius={radii.xs} />
        <ShimmerSkeleton width="100%" height={14} borderRadius={radii.xs} style={{ marginTop: spacing.sm }} />
        <ShimmerSkeleton width="80%" height={14} borderRadius={radii.xs} style={{ marginTop: 4 }} />
      </View>

      {/* Representative Association */}
      <View style={[styles.cardContainer, { marginTop: spacing.md }]}>
        <View style={styles.row}>
          <ShimmerSkeleton width={48} height={48} borderRadius={radii.pill} />
          <View style={[styles.flex1, { marginLeft: spacing.md }]}>
            <ShimmerSkeleton width={140} height={16} borderRadius={radii.xs} />
            <ShimmerSkeleton width={180} height={12} borderRadius={radii.xs} style={{ marginTop: 6 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonBase: {
    backgroundColor: '#CBD5E1', // Rich slate contrast (not washed out)
    overflow: 'hidden',
  },
  shimmerLayer: {
    backgroundColor: '#E2E8F0', // Crisp secondary tint
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    marginBottom: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailContainer: {
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  cardFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});

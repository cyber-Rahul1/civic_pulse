import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type BottomNavTab = 'home' | 'map' | 'my_reports' | 'directory' | 'profile';

export interface BottomNavBarProps {
  activeTab: BottomNavTab;
  onSelectTab: (tab: BottomNavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: Array<{
    key: BottomNavTab;
    label: string;
    icon: string;
  }> = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'map', label: 'Map', icon: '🗺️' },
    { key: 'my_reports', label: 'My Reports', icon: '📋' },
    { key: 'directory', label: 'Directory', icon: '🏛️' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => onSelectTab(tab.key)}
              activeOpacity={0.75}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${tab.label} tab`}
            >
              <View style={[styles.iconPill, isActive && styles.iconPillActive]}>
                <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
                  {tab.icon}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[styles.navLabel, isActive && styles.navLabelActive]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicatorDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 14,
    position: 'relative',
  },
  navItemActive: {
    transform: [{ scale: 1.02 }],
  },
  iconPill: {
    width: 40,
    height: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    backgroundColor: 'transparent',
  },
  iconPillActive: {
    backgroundColor: '#EFF6FF', // Soft primary blue pill highlight
  },
  navIcon: {
    fontSize: 18,
    opacity: 0.7,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  navLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
  activeIndicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2563EB',
    marginTop: 3,
  },
});

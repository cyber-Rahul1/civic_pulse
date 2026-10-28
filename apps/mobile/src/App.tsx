import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './context/auth-context';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CreateReportScreen } from './screens/CreateReportScreen';
import { ReportDetailScreen } from './screens/ReportDetailScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AuthorityScreen } from './screens/AuthorityScreen';
import { RepresentativesDirectoryScreen } from './screens/RepresentativesDirectoryScreen';
import { RepresentativeProfileScreen } from './screens/RepresentativeProfileScreen';
import { MyReportsScreen } from './screens/MyReportsScreen';
import { LoginPromptModal } from './components/LoginPromptModal';
import { ReportCategory, ReportStatus } from '@civic-pulse/contracts';
import { MapRegion } from './utils/map-utils';
import { colors } from './theme/tokens';

type ScreenState =
  | { name: 'HOME' }
  | { name: 'AUTH' }
  | { name: 'MY_REPORTS' }
  | { name: 'CREATE_REPORT' }
  | { name: 'REPORT_DETAIL'; reportId: string; returnRepresentativeId?: string }
  | { name: 'NOTIFICATIONS' }
  | { name: 'PROFILE' }
  | { name: 'AUTHORITY' }
  | { name: 'REPRESENTATIVES_DIRECTORY' }
  | { name: 'REPRESENTATIVE_PROFILE'; representativeId: string; returnReportId?: string };

const MainNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenState>({ name: 'HOME' });
  const [activeHomeTab, setActiveHomeTab] = useState<'feed' | 'map'>('feed');
  const [savedMapRegion, setSavedMapRegion] = useState<MapRegion | null>(null);
  const [savedCategory, setSavedCategory] = useState<ReportCategory | undefined>(undefined);
  const [savedStatus, setSavedStatus] = useState<ReportStatus | undefined>(undefined);
  const [focusReportId, setFocusReportId] = useState<string | null>(null);
  const [homeRefreshTrigger, setHomeRefreshTrigger] = useState<number>(0);
  const [showCreateLoginModal, setShowCreateLoginModal] = useState<boolean>(false);

  const handleNavigateToReportLocation = (reportId: string, coordinates: [number, number]) => {
    const [longitude, latitude] = coordinates;
    setSavedMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setFocusReportId(reportId);
    setActiveHomeTab('map');
    setCurrentScreen({ name: 'HOME' });
  };

  const handleAttemptCreateReport = () => {
    if (!isAuthenticated) {
      setShowCreateLoginModal(true);
      return;
    }
    setCurrentScreen({ name: 'CREATE_REPORT' });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Handle deep link from notification to report detail
  const handleDeepLink = (deepLink: string) => {
    // Format: /reports/:reportId or reports/:reportId
    const match = deepLink.match(/reports\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      setCurrentScreen({ name: 'REPORT_DETAIL', reportId: match[1] });
    } else {
      setCurrentScreen({ name: 'HOME' });
    }
  };

  const renderContent = () => {
    switch (currentScreen.name) {
      case 'AUTH':
        return (
          <AuthScreen
            onAuthenticated={() => setCurrentScreen({ name: 'HOME' })}
            onCancel={() => setCurrentScreen({ name: 'HOME' })}
          />
        );

      case 'MY_REPORTS':
        return (
          <MyReportsScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onSelectReport={(reportId) =>
              setCurrentScreen({ name: 'REPORT_DETAIL', reportId })
            }
            onCreateReport={handleAttemptCreateReport}
            onNavigateToLocation={handleNavigateToReportLocation}
            onLogin={() => setCurrentScreen({ name: 'AUTH' })}
          />
        );

      case 'CREATE_REPORT':
        return (
          <CreateReportScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onSuccess={(reportId) => {
              setHomeRefreshTrigger((prev) => prev + 1);
              setCurrentScreen({ name: 'REPORT_DETAIL', reportId });
            }}
          />
        );

      case 'REPORT_DETAIL':
        return (
          <ReportDetailScreen
            reportId={currentScreen.reportId}
            onBack={() => {
              if (currentScreen.returnRepresentativeId) {
                setCurrentScreen({
                  name: 'REPRESENTATIVE_PROFILE',
                  representativeId: currentScreen.returnRepresentativeId,
                });
              } else {
                setHomeRefreshTrigger((prev) => prev + 1);
                setCurrentScreen({ name: 'HOME' });
              }
            }}
            onNavigateToLocation={handleNavigateToReportLocation}
            onSelectRepresentative={(repId) => {
              setCurrentScreen({
                name: 'REPRESENTATIVE_PROFILE',
                representativeId: repId,
                returnReportId: currentScreen.reportId,
              });
            }}
            onLogin={() => setCurrentScreen({ name: 'AUTH' })}
          />
        );

      case 'NOTIFICATIONS':
        return (
          <NotificationsScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onNavigateDeepLink={handleDeepLink}
          />
        );

      case 'PROFILE':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onLogin={() => setCurrentScreen({ name: 'AUTH' })}
          />
        );

      case 'AUTHORITY':
        return (
          <AuthorityScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onSelectReport={(reportId) =>
              setCurrentScreen({ name: 'REPORT_DETAIL', reportId })
            }
          />
        );

      case 'REPRESENTATIVES_DIRECTORY':
        return (
          <RepresentativesDirectoryScreen
            onBack={() => setCurrentScreen({ name: 'HOME' })}
            onSelectRepresentative={(repId) =>
              setCurrentScreen({ name: 'REPRESENTATIVE_PROFILE', representativeId: repId })
            }
          />
        );

      case 'REPRESENTATIVE_PROFILE':
        return (
          <RepresentativeProfileScreen
            representativeId={currentScreen.representativeId}
            onBack={() => {
              if (currentScreen.returnReportId) {
                setCurrentScreen({
                  name: 'REPORT_DETAIL',
                  reportId: currentScreen.returnReportId,
                });
              } else {
                setCurrentScreen({ name: 'REPRESENTATIVES_DIRECTORY' });
              }
            }}
            onSelectReport={(reportId) =>
              setCurrentScreen({
                name: 'REPORT_DETAIL',
                reportId,
                returnRepresentativeId: currentScreen.representativeId,
              })
            }
            onLogin={() => setCurrentScreen({ name: 'AUTH' })}
          />
        );

      case 'HOME':
      default:
        return (
          <HomeScreen
            onSelectReport={(reportId) =>
              setCurrentScreen({ name: 'REPORT_DETAIL', reportId })
            }
            onCreateReport={handleAttemptCreateReport}
            onOpenMyReports={() => setCurrentScreen({ name: 'MY_REPORTS' })}
            onOpenNotifications={() => setCurrentScreen({ name: 'NOTIFICATIONS' })}
            onOpenProfile={() => setCurrentScreen({ name: 'PROFILE' })}
            onOpenAuthorityWorkflows={() => setCurrentScreen({ name: 'AUTHORITY' })}
            onOpenRepresentatives={() => setCurrentScreen({ name: 'REPRESENTATIVES_DIRECTORY' })}
            activeTab={activeHomeTab}
            onTabChange={setActiveHomeTab}
            savedMapRegion={savedMapRegion}
            onMapRegionChange={setSavedMapRegion}
            savedCategory={savedCategory}
            onCategoryChange={setSavedCategory}
            savedStatus={savedStatus}
            onStatusChange={setSavedStatus}
            onNavigateToLocation={handleNavigateToReportLocation}
            focusReportId={focusReportId}
            refreshTrigger={homeRefreshTrigger}
          />
        );
    }
  };

  return (
    <>
      {renderContent()}
      <LoginPromptModal
        visible={showCreateLoginModal}
        title="Report a Civic Issue"
        message="Sign in or register to submit a GPS-verified civic report directly to your local municipal ward and public representatives."
        onClose={() => setShowCreateLoginModal(false)}
        onLogin={() => {
          setShowCreateLoginModal(false);
          setCurrentScreen({ name: 'AUTH' });
        }}
      />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

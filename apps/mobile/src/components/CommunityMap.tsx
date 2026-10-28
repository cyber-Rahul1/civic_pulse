import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Svg, {
  G,
  Polygon,
  Circle,
  Text as SvgText,
  Rect,
} from 'react-native-svg';
import { ReportCategory, ReportStatus, ReportDto } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { StatusBadge } from './StatusBadge';
import { colors, radii, shadows, spacing, typography } from '../theme/tokens';
import {
  MapRegion,
  LocationGroupMarker,
  buildMapMarkersFromReports,
  groupReportsByLocation,
  findNearestOfflinePlaceName,
  isCoordinateInAndhraPradesh,
  RESPONSE_THRESHOLDS_HOURS,
} from '../utils/map-utils';
import {
  ANDHRA_PRADESH_MAP_DATA,
} from '../data/andhra-pradesh-map';
import {
  saveReportsToOfflineCache,
  loadReportsFromOfflineCache,
} from '../storage/offline-cache';

// Fallback Location import
let ExpoLocation: any = null;
try {
  ExpoLocation = require('expo-location');
} catch {
  ExpoLocation = null;
}

interface CommunityMapProps {
  initialReports?: ReportDto[];
  selectedCategory?: ReportCategory;
  selectedStatus?: ReportStatus;
  onSelectReport: (reportId: string) => void;
  savedRegion?: MapRegion | null;
  onRegionChangeComplete?: (region: MapRegion) => void;
  focusReportId?: string | null;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Andhra Pradesh Bounding Box
const AP_BOUNDS = ANDHRA_PRADESH_MAP_DATA.metadata.boundingBox;

/**
 * Transforms WGS84 Geographic coordinates (lat, lon) to Cartesian canvas (x, y) coordinates.
 * Uses Equirectangular projection tuned to Andhra Pradesh latitude (center ~16°N).
 */
function projectGeoToCanvas(
  latitude: number,
  longitude: number,
  width: number,
  height: number,
  viewCenter: { latitude: number; longitude: number },
  zoom: number
): { x: number; y: number } {
  // Base scale fitting Andhra Pradesh into the screen
  const lonSpan = AP_BOUNDS.maxLongitude - AP_BOUNDS.minLongitude; // ~8.1 deg
  const latSpan = AP_BOUNDS.maxLatitude - AP_BOUNDS.minLatitude; // ~7.3 deg

  const baseScaleX = (width * 0.88) / lonSpan;
  const baseScaleY = (height * 0.72) / latSpan;
  const scale = Math.min(baseScaleX, baseScaleY) * zoom;

  // Andhra Pradesh is ~16° North
  const cosLat = Math.cos((16 * Math.PI) / 180);

  const deltaLng = longitude - viewCenter.longitude;
  const deltaLat = latitude - viewCenter.latitude;

  // Inverted Y: higher latitude is upward (negative Y on screen)
  const x = width / 2 + deltaLng * scale * cosLat;
  const y = height / 2 - deltaLat * scale;

  return { x, y };
}

export const CommunityMap: React.FC<CommunityMapProps> = ({
  initialReports = [],
  selectedCategory,
  selectedStatus,
  onSelectReport,
  savedRegion,
  onRegionChangeComplete,
  focusReportId,
}) => {
  const [canvasSize, setCanvasSize] = useState({
    width: SCREEN_WIDTH,
    height: Math.max(400, SCREEN_HEIGHT - 220),
  });

  // Map Camera State: Center & Zoom
  const [mapCenter, setMapCenter] = useState<{ latitude: number; longitude: number }>(() => {
    if (savedRegion) {
      return { latitude: savedRegion.latitude, longitude: savedRegion.longitude };
    }
    return {
      latitude: ANDHRA_PRADESH_MAP_DATA.stateCenter.latitude,
      longitude: ANDHRA_PRADESH_MAP_DATA.stateCenter.longitude,
    };
  });

  const [zoomLevel, setZoomLevel] = useState<number>(1.2); // 0.8 = whole state, 5.0 = local street area

  // Pan gesture tracking
  const panOffset = useRef({ x: 0, y: 0 });
  const centerRef = useRef(mapCenter);
  centerRef.current = mapCenter;
  const zoomRef = useRef(zoomLevel);
  zoomRef.current = zoomLevel;

  // Reports & Marker Groups
  const [rawReports, setRawReports] = useState<ReportDto[]>(initialReports);
  const [groupedMarkers, setGroupedMarkers] = useState<LocationGroupMarker[]>(() => {
    const flat = buildMapMarkersFromReports(initialReports);
    return groupReportsByLocation(flat);
  });

  const [selectedGroup, setSelectedGroup] = useState<LocationGroupMarker | null>(null);

  // Synchronize whenever initialReports prop updates (e.g. newly created reports)
  useEffect(() => {
    if (initialReports && initialReports.length > 0) {
      setRawReports(initialReports);
      const built = buildMapMarkersFromReports(initialReports);
      setGroupedMarkers(groupReportsByLocation(built));
    }
  }, [initialReports]);

  // Offline & Synchronization State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlineCacheTime, setOfflineCacheTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [showOutsideApBanner, setShowOutsideApBanner] = useState(false);

  // Active request tracking
  const latestRequestId = useRef(0);

  /**
   * Fetch reports from API Gateway with local fallback cache
   */
  const fetchReports = useCallback(
    async (
      center: { latitude: number; longitude: number },
      category?: ReportCategory,
      status?: ReportStatus
    ) => {
      const reqId = ++latestRequestId.current;
      setIsLoading(true);
      setError(null);

      try {
        // Fetch community reports across Andhra Pradesh
        const listRes = await apiClient.listReports({
          category,
          status,
          limit: 100,
        }).catch(() => null);

        let freshReports: ReportDto[] = [];
        if (listRes?.items && listRes.items.length > 0) {
          freshReports = listRes.items;
        } else {
          // Fallback to nearby search up to 50km
          freshReports = await apiClient
            .getNearbyReports(center.longitude, center.latitude, 50000, {
              category,
              status,
              limit: 100,
            })
            .catch(() => []);
        }

        if (freshReports.length === 0 && initialReports.length > 0) {
          freshReports = initialReports;
        }

        if (reqId !== latestRequestId.current) return;

        setRawReports(freshReports);
        setIsOfflineMode(false);
        const built = buildMapMarkersFromReports(freshReports);
        setGroupedMarkers(groupReportsByLocation(built));

        // Save fresh data to offline storage
        if (freshReports.length > 0) {
          await saveReportsToOfflineCache(freshReports);
        }
      } catch (err: any) {
        if (reqId !== latestRequestId.current) return;

        // Attempt to load from offline cache
        const cached = await loadReportsFromOfflineCache();
        if (cached && cached.reports.length > 0) {
          let filtered = cached.reports;
          if (category) filtered = filtered.filter((r) => r.category === category);
          if (status) filtered = filtered.filter((r) => r.status === status);

          setRawReports(filtered);
          setIsOfflineMode(true);
          setOfflineCacheTime(cached.cachedAtFormatted);
          const built = buildMapMarkersFromReports(filtered);
          setGroupedMarkers(groupReportsByLocation(built));
        } else {
          setError(err?.message || 'Could not fetch civic reports');
        }
      } finally {
        if (reqId === latestRequestId.current) {
          setIsLoading(false);
        }
      }
    },
    [initialReports]
  );

  /**
   * Initial mount and permissions check
   */
  useEffect(() => {
    let isMounted = true;
    (async () => {
      // Load offline cache immediately for instant offline render
      const cached = await loadReportsFromOfflineCache();
      if (cached && isMounted && rawReports.length === 0) {
        setRawReports(cached.reports);
        setIsOfflineMode(true);
        setOfflineCacheTime(cached.cachedAtFormatted);
        const built = buildMapMarkersFromReports(cached.reports);
        setGroupedMarkers(groupReportsByLocation(built));
      }

      // Check device location if granted
      if (ExpoLocation && typeof ExpoLocation.getForegroundPermissionsAsync === 'function') {
        try {
          const { status } = await ExpoLocation.getForegroundPermissionsAsync();
          if (!isMounted) return;
          const granted = status === 'granted';
          setHasLocationPermission(granted);

          if (granted && !savedRegion) {
            const pos = await ExpoLocation.getCurrentPositionAsync({
              accuracy: ExpoLocation.Accuracy.Balanced,
            });
            if (pos?.coords && isMounted) {
              const { latitude, longitude } = pos.coords;
              if (isCoordinateInAndhraPradesh(latitude, longitude)) {
                setMapCenter({ latitude, longitude });
                fetchReports({ latitude, longitude }, selectedCategory, selectedStatus);
                return;
              } else {
                setShowOutsideApBanner(true);
              }
            }
          }
        } catch {
          // Ignore location acquire failures
        }
      }

      // Default fetch across Andhra Pradesh
      fetchReports(mapCenter, selectedCategory, selectedStatus);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Refetch when filters change
   */
  useEffect(() => {
    fetchReports(mapCenter, selectedCategory, selectedStatus);
  }, [selectedCategory, selectedStatus]);

  /**
   * Handle focus on specific report passed via navigation
   */
  useEffect(() => {
    if (focusReportId && rawReports.length > 0) {
      const target = rawReports.find((r) => r.id === focusReportId);
      if (target && target.location?.coordinates) {
        const [lng, lat] = target.location.coordinates;
        setMapCenter({ latitude: lat, longitude: lng });
        setZoomLevel(2.5); // Zoom into local area
        // Find matching marker group
        const group = groupedMarkers.find((g) =>
          g.reports.some((r) => r.id === focusReportId)
        );
        if (group) {
          setSelectedGroup(group);
        }
      }
    }
  }, [focusReportId, rawReports, groupedMarkers]);

  /**
   * Pan Gesture Handler for smooth touch panning
   */
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3,
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3,
      onPanResponderGrant: () => {
        panOffset.current = { x: 0, y: 0 };
      },
      onPanResponderMove: (_, gestureState) => {
        const deltaX = gestureState.dx - panOffset.current.x;
        const deltaY = gestureState.dy - panOffset.current.y;
        panOffset.current = { x: gestureState.dx, y: gestureState.dy };

        const currentZoom = zoomRef.current;
        const lonSpan = AP_BOUNDS.maxLongitude - AP_BOUNDS.minLongitude;
        const latSpan = AP_BOUNDS.maxLatitude - AP_BOUNDS.minLatitude;
        const scale = Math.min((canvasSize.width * 0.88) / lonSpan, (canvasSize.height * 0.72) / latSpan) * currentZoom;
        const cosLat = Math.cos((16 * Math.PI) / 180);

        const dLng = deltaX / (scale * cosLat);
        const dLat = -deltaY / scale;

        setMapCenter((prev) => {
          const newLat = Math.max(AP_BOUNDS.minLatitude - 1, Math.min(AP_BOUNDS.maxLatitude + 1, prev.latitude - dLat));
          const newLng = Math.max(AP_BOUNDS.minLongitude - 1, Math.min(AP_BOUNDS.maxLongitude + 1, prev.longitude - dLng));
          return { latitude: newLat, longitude: newLng };
        });
      },
      onPanResponderRelease: () => {
        if (onRegionChangeComplete) {
          onRegionChangeComplete({
            latitude: centerRef.current.latitude,
            longitude: centerRef.current.longitude,
            latitudeDelta: 0.1 / zoomRef.current,
            longitudeDelta: 0.1 / zoomRef.current,
          });
        }
      },
    })
  ).current;

  /**
   * Zoom Controls
   */
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(5.0, Number((prev * 1.35).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.7, Number((prev / 1.35).toFixed(2))));
  };

  const handleResetToState = () => {
    setMapCenter(ANDHRA_PRADESH_MAP_DATA.stateCenter);
    setZoomLevel(1.2);
    setShowOutsideApBanner(false);
  };

  const handleRefreshReports = () => {
    fetchReports(mapCenter, selectedCategory, selectedStatus);
  };

  const handleLocateUser = async () => {
    if (!ExpoLocation) return;
    setIsLocatingUser(true);
    try {
      let granted = hasLocationPermission;
      if (!granted) {
        const perm = await ExpoLocation.requestForegroundPermissionsAsync();
        granted = perm.status === 'granted';
        setHasLocationPermission(granted);
      }

      if (granted) {
        const pos = await ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.High,
        });
        if (pos?.coords) {
          const { latitude, longitude } = pos.coords;
          if (isCoordinateInAndhraPradesh(latitude, longitude)) {
            setMapCenter({ latitude, longitude });
            setZoomLevel(2.2);
            setShowOutsideApBanner(false);
            fetchReports({ latitude, longitude }, selectedCategory, selectedStatus);
          } else {
            setShowOutsideApBanner(true);
          }
        }
      }
    } catch {
      // Permission rejected or GPS unavailable
    } finally {
      setIsLocatingUser(false);
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width > 0 && height > 0) {
          setCanvasSize({ width, height });
        }
      }}
    >
      {/* Offline Vector Map Canvas with Single-Finger PanResponder */}
      <View style={styles.mapCanvas} {...panResponder.panHandlers}>
        <Svg width={canvasSize.width} height={canvasSize.height}>
          {/* Background Ocean / Land base */}
          <Rect
            x="0"
            y="0"
            width={canvasSize.width}
            height={canvasSize.height}
            fill="#E0F2FE" // Bay of Bengal light blue
          />

          {/* Authentic State Boundary Outer Glow / Land Foundation */}
          {ANDHRA_PRADESH_MAP_DATA.stateBoundary && ANDHRA_PRADESH_MAP_DATA.stateBoundary.length > 0 && (
            <Polygon
              points={ANDHRA_PRADESH_MAP_DATA.stateBoundary
                .map((coord) => {
                  const pt = projectGeoToCanvas(
                    coord.latitude,
                    coord.longitude,
                    canvasSize.width,
                    canvasSize.height,
                    mapCenter,
                    zoomLevel
                  );
                  return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                })
                .join(' ')}
              fill="#FDE68A"
              stroke="#B45309"
              strokeWidth={2.4}
              opacity={0.95}
            />
          )}

          {/* Authentic OSM District Polygons (All 28 Districts with MultiPolygon Support) */}
          <G>
            {ANDHRA_PRADESH_MAP_DATA.districts.map((district) => {
              const rings = district.polygons && district.polygons.length > 0
                ? district.polygons
                : [district.polygon];

              return rings.map((ringCoords, rIdx) => {
                const pointsStr = ringCoords
                  .map((coord) => {
                    const pt = projectGeoToCanvas(
                      coord.latitude,
                      coord.longitude,
                      canvasSize.width,
                      canvasSize.height,
                      mapCenter,
                      zoomLevel
                    );
                    return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                  })
                  .join(' ');

                return (
                  <Polygon
                    key={`${district.id}-r${rIdx}`}
                    points={pointsStr}
                    fill="#FEF3C7" // Warm inland regional color
                    stroke="#D97706"
                    strokeWidth={1.2}
                    opacity={0.88}
                  />
                );
              });
            })}
          </G>

          {/* Subtle Major Cities & Regional Labels (Minimal clean place labels) */}
          <G>
            {ANDHRA_PRADESH_MAP_DATA.cities.map((city) => {
              const pt = projectGeoToCanvas(
                city.coordinate.latitude,
                city.coordinate.longitude,
                canvasSize.width,
                canvasSize.height,
                mapCenter,
                zoomLevel
              );

              // Clip off-screen labels
              if (
                pt.x < -40 ||
                pt.x > canvasSize.width + 40 ||
                pt.y < -40 ||
                pt.y > canvasSize.height + 40
              ) {
                return null;
              }

              const isTier1 = city.populationTier === 1;

              return (
                <G key={city.id}>
                  {/* Subtle small gray place dot */}
                  <Circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isTier1 ? 2.5 : 1.8}
                    fill="#64748B"
                    stroke="#FFFFFF"
                    strokeWidth={1.0}
                  />
                  <SvgText
                    x={pt.x}
                    y={pt.y - 7}
                    fill="#334155"
                    fontSize={isTier1 ? 10 : 8.5}
                    fontWeight={isTier1 ? '600' : 'normal'}
                    textAnchor="middle"
                  >
                    {city.name}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </View>

      {/* Grouped Civic Report Location Markers as Interactive Overlays */}
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 10, elevation: 4 }]} pointerEvents="box-none">
        {groupedMarkers.map((group) => {
          const pt = projectGeoToCanvas(
            group.latitude,
            group.longitude,
            canvasSize.width,
            canvasSize.height,
            mapCenter,
            zoomLevel
          );

          if (
            pt.x < -30 ||
            pt.x > canvasSize.width + 30 ||
            pt.y < -30 ||
            pt.y > canvasSize.height + 30
          ) {
            return null;
          }

          const isSelected = selectedGroup?.key === group.key;
          const markerSize = 34;

          return (
            <TouchableOpacity
              key={group.key}
              activeOpacity={0.8}
              onPress={() => setSelectedGroup(group)}
              style={[
                styles.markerBubble,
                {
                  left: pt.x - markerSize / 2,
                  top: pt.y - markerSize / 2,
                  width: markerSize,
                  height: markerSize,
                  borderRadius: markerSize / 2,
                  backgroundColor: group.semanticColor,
                  borderWidth: isSelected ? 3 : 2,
                  borderColor: isSelected ? '#0F172A' : '#FFFFFF',
                  transform: [{ scale: isSelected ? 1.25 : 1.0 }],
                  zIndex: isSelected ? 15 : 5,
                  elevation: isSelected ? 8 : 4,
                },
              ]}
            >
              <Text style={styles.markerBubbleText}>
                {group.reports.length}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Top Header Toolbar */}
      <View style={styles.topToolbar} pointerEvents="box-none">
        <View style={styles.areaInfoCard}>
          <View style={styles.areaInfoTextRow}>
            <Text style={styles.areaTitle} numberOfLines={1}>
              📍 {selectedGroup ? selectedGroup.locationLabel : (zoomLevel <= 1.3 ? 'Andhra Pradesh Overview' : findNearestOfflinePlaceName(mapCenter.latitude, mapCenter.longitude))}
            </Text>
            <TouchableOpacity
              onPress={handleRefreshReports}
              style={styles.refreshIconButton}
              accessibilityLabel="Refresh reports"
            >
              <Text style={styles.refreshIconText}>🔄</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.areaSubtitle}>
            {isLoading
              ? 'Scanning civic issues...'
              : (() => {
                  const mappedReportsCount = groupedMarkers.reduce((sum, g) => sum + g.reports.length, 0);
                  return `${groupedMarkers.length} issue location${groupedMarkers.length === 1 ? '' : 's'} (${mappedReportsCount} report${mappedReportsCount === 1 ? '' : 's'})`;
                })()}
          </Text>
        </View>

        {isOfflineMode && (
          <View style={styles.offlinePill}>
            <Text style={styles.offlinePillText}>
              📦 Offline Data ({offlineCacheTime || 'Cached'})
            </Text>
          </View>
        )}
      </View>

      {/* Error Retry Banner */}
      {error && !isLoading && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>⚠️ {error}</Text>
          <TouchableOpacity
            onPress={() => fetchReports(mapCenter, selectedCategory, selectedStatus)}
            style={styles.errorRetryAction}
          >
            <Text style={styles.errorRetryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Outside AP Device Location Alert Banner */}
      {showOutsideApBanner && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningBannerText}>
            ℹ️ Your GPS is outside Andhra Pradesh. Showing regional state coverage.
          </Text>
          <TouchableOpacity onPress={handleResetToState} style={styles.bannerAction}>
            <Text style={styles.bannerActionText}>View AP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Map Controls (Zoom +, Zoom -, Re-center, My Location, Refresh) */}
      <View style={styles.floatingControls} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomIn}
          accessibilityLabel="Zoom in"
        >
          <Text style={styles.controlButtonText}>➕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomOut}
          accessibilityLabel="Zoom out"
        >
          <Text style={styles.controlButtonText}>➖</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleLocateUser}
          disabled={isLocatingUser}
          accessibilityLabel="My Location"
        >
          {isLocatingUser ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.controlButtonText}>🎯</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleResetToState}
          accessibilityLabel="State overview"
        >
          <Text style={styles.controlButtonText}>🏛️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleRefreshReports}
          accessibilityLabel="Refresh reports"
        >
          <Text style={styles.controlButtonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Map Legend (Semantic Urgency Colors) */}
      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
          <Text style={styles.legendText}>Resolved</Text>
          <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
          <Text style={styles.legendText}>Overdue ({RESPONSE_THRESHOLDS_HOURS.CRITICAL}h)</Text>
          <View style={[styles.legendDot, { backgroundColor: '#EA580C' }]} />
          <Text style={styles.legendText}>Urgent</Text>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>Active</Text>
        </View>
      </View>

      {/* Grouped Location Report List Preview Card */}
      {selectedGroup && (
        <View style={styles.previewSheet}>
          <View style={styles.previewHeader}>
            <View style={styles.previewTitleGroup}>
              <View
                style={[
                  styles.urgencyBadge,
                  { backgroundColor: selectedGroup.semanticColor },
                ]}
              >
                <Text style={styles.urgencyBadgeText}>
                  {selectedGroup.urgencyLabel}
                </Text>
              </View>
              <Text style={styles.previewLocationText} numberOfLines={1}>
                📍 {selectedGroup.locationLabel}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedGroup(null)}
              style={styles.closeButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Close report preview"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.groupCountSub}>
            {selectedGroup.reports.length} civic issue
            {selectedGroup.reports.length === 1 ? '' : 's'} at this location
          </Text>

          {/* List of Reports at this Location */}
          <ScrollView style={styles.reportsList} nestedScrollEnabled>
            {selectedGroup.reports.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.reportListItem}
                onPress={() => onSelectReport(report.id)}
                activeOpacity={0.7}
              >
                <View style={styles.reportItemHeader}>
                  <Text style={styles.reportItemTitle} numberOfLines={1}>
                    {report.title}
                  </Text>
                  <StatusBadge status={report.status} />
                </View>
                <Text style={styles.reportItemDesc} numberOfLines={2}>
                  {report.description}
                </Text>
                <View style={styles.reportItemFooter}>
                  <Text style={styles.reportItemCategory}>
                    {report.category} • {new Date(report.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.viewDetailsText}>View Details →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* OpenStreetMap Attribution Footer */}
      <View style={styles.osmAttributionFooter}>
        <Text style={styles.osmAttributionText}>
          Regional Map data © OpenStreetMap contributors under ODbL • Andhra Pradesh Offline Package
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  mapCanvas: {
    flex: 1,
  },
  markerBubble: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
    elevation: 6,
  },
  markerBubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topToolbar: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    zIndex: 20,
  },
  areaInfoCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  areaInfoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refreshIconButton: {
    padding: 2,
  },
  refreshIconText: {
    fontSize: 14,
  },
  areaTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  areaSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  offlinePill: {
    backgroundColor: colors.primary,
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    ...shadows.subtle,
  },
  offlinePillText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.semibold,
  },
  errorBanner: {
    position: 'absolute',
    top: 76,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.errorBackground,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    borderRadius: radii.md,
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  errorBannerText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    flex: 1,
  },
  errorRetryAction: {
    backgroundColor: colors.error,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    marginLeft: spacing.xs,
  },
  errorRetryText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  warningBanner: {
    position: 'absolute',
    top: 76,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.warningBackground,
    borderWidth: 1,
    borderColor: colors.warningBorder,
    borderRadius: radii.md,
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  warningBannerText: {
    fontSize: typography.sizes.xs,
    color: colors.warning,
    flex: 1,
  },
  bannerAction: {
    backgroundColor: colors.warning,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    marginLeft: spacing.xs,
  },
  bannerActionText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  floatingControls: {
    position: 'absolute',
    right: spacing.md,
    top: 90,
    gap: spacing.sm,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  controlButtonText: {
    fontSize: 16,
  },
  legendContainer: {
    position: 'absolute',
    bottom: 26,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
  },
  legendText: {
    fontSize: typography.sizes.xxs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  previewSheet: {
    position: 'absolute',
    bottom: 28,
    left: spacing.md,
    right: spacing.md,
    maxHeight: 280,
    backgroundColor: colors.cardBackground,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
    elevation: 20,
    zIndex: 100,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  urgencyBadgeText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
  },
  previewLocationText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeButtonText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: typography.weights.bold,
  },
  groupCountSub: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.xs,
  },
  reportsList: {
    marginTop: spacing.xs,
  },
  reportListItem: {
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: radii.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  reportItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  reportItemTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.xs,
  },
  reportItemDesc: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  reportItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  reportItemCategory: {
    fontSize: 10,
    color: colors.textMuted,
  },
  viewDetailsText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
  },
  osmAttributionFooter: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  osmAttributionText: {
    fontSize: 8.5,
    color: 'rgba(30, 41, 59, 0.7)',
    fontWeight: '500',
  },
});

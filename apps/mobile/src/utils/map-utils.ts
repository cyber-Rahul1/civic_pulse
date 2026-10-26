import { ReportDto, GeoPoint, ReportCategory, ReportStatus, ReportUrgency } from '@civic-pulse/contracts';
import { ANDHRA_PRADESH_MAP_DATA } from '../data/andhra-pradesh-map';

export interface MapMarkerData {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  urgency?: ReportUrgency;
  latitude: number;
  longitude: number;
  locationDescription?: string;
  mediaThumbnailUrl?: string;
  createdAt: string;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Marker group representing one physical location with 1 or more civic reports.
 */
export interface LocationGroupMarker {
  key: string;
  latitude: number;
  longitude: number;
  reports: MapMarkerData[];
  primaryCategory: ReportCategory;
  primaryEmoji: string;
  semanticColor: string; // Green, Red, Orange, Blue
  urgencyLabel: 'Resolved' | 'Critical Overdue' | 'Urgent' | 'Active';
  locationLabel: string;
}

/**
 * Priority Response Thresholds (Configurable in hours)
 * Critical issues must be acknowledged/resolved within 24 hours.
 * High urgency issues must be handled within 72 hours.
 */
export const RESPONSE_THRESHOLDS_HOURS = {
  CRITICAL: 24,
  HIGH: 72,
};

/**
 * Validates GeoPoint and converts GeoJSON coordinates [longitude, latitude]
 * to map latitude and longitude numbers.
 * Returns null if coordinates are missing, malformed, or out of geographical bounds.
 */
export function convertGeoPointToLatLng(
  geoPoint?: GeoPoint | null
): { latitude: number; longitude: number } | null {
  if (!geoPoint || !Array.isArray(geoPoint.coordinates) || geoPoint.coordinates.length < 2) {
    return null;
  }

  const [lng, lat] = geoPoint.coordinates;

  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return null;
  }

  // Check latitude: -90 to 90, longitude: -180 to 180
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return null;
  }

  return { latitude: lat, longitude: lng };
}

/**
 * Checks if a coordinate is strictly within authentic Andhra Pradesh boundaries
 * using ray-casting point-in-polygon algorithm against the OSM state boundary polygon.
 */
export function isCoordinateInAndhraPradesh(lat: number, lng: number): boolean {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
    ANDHRA_PRADESH_MAP_DATA.metadata.boundingBox;

  // Fast bounding box check first
  if (lat < minLatitude || lat > maxLatitude || lng < minLongitude || lng > maxLongitude) {
    return false;
  }

  // Accurate ray-casting point-in-polygon algorithm against real OSM boundary
  const polygon = ANDHRA_PRADESH_MAP_DATA.stateBoundary;
  if (!polygon || polygon.length === 0) return true;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ptI = polygon[i];
    const ptJ = polygon[j];
    if (!ptI || !ptJ) continue;

    const xi = ptI.longitude;
    const yi = ptI.latitude;
    const xj = ptJ.longitude;
    const yj = ptJ.latitude;

    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Finds the nearest District or City name from local offline map data.
 */
export function findNearestOfflinePlaceName(latitude: number, longitude: number): string {
  let closestName = 'Andhra Pradesh';
  let minDistance = Infinity;

  // Check cities first
  for (const city of ANDHRA_PRADESH_MAP_DATA.cities) {
    const dist = calculateDistanceMeters(
      latitude,
      longitude,
      city.coordinate.latitude,
      city.coordinate.longitude
    );
    if (dist < minDistance) {
      minDistance = dist;
      closestName = city.name;
    }
  }

  // Check districts
  for (const district of ANDHRA_PRADESH_MAP_DATA.districts) {
    const dist = calculateDistanceMeters(
      latitude,
      longitude,
      district.center.latitude,
      district.center.longitude
    );
    if (dist < minDistance) {
      minDistance = dist;
      closestName = district.name;
    }
  }

  return closestName;
}

/**
 * Haversine formula to calculate distance in meters between two coordinates.
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Transforms an array of ReportDto into MapMarkerData items.
 * Strictly excludes any reports lacking valid public GeoJSON coordinates.
 * Deduplicates markers by report ID to prevent duplicate pins in overlapping result sets.
 */
export function buildMapMarkersFromReports(reports: ReportDto[]): MapMarkerData[] {
  if (!Array.isArray(reports)) return [];

  const markerMap = new Map<string, MapMarkerData>();

  for (const report of reports) {
    if (!report || !report.id) continue;
    if (markerMap.has(report.id)) continue;

    const latLng = convertGeoPointToLatLng(report.location);
    if (!latLng) continue;

    // Strictly exclude any reports outside authentic Andhra Pradesh boundaries
    if (!isCoordinateInAndhraPradesh(latLng.latitude, latLng.longitude)) {
      continue;
    }

    const firstImage = report.media?.find((m) => m.resourceType === 'image');
    const thumbnailUrl = firstImage?.secureUrl || firstImage?.url;

    // Check urgency if explicitly confirmed/persisted on report
    // Requirement 2: Category-based defaults CANNOT automatically designate an issue as a verified critical incident.
    // Red markers are exclusive to confirmed/verified critical unresolved reports that have exceeded the response threshold.
    let urgency: ReportUrgency | undefined = (report as any).urgency;
    if (!urgency) {
      if (
        report.category === ReportCategory.PUBLIC_SAFETY ||
        report.category === ReportCategory.ROAD_DAMAGE ||
        report.category === ReportCategory.DRAINAGE
      ) {
        urgency = ReportUrgency.HIGH; // Urgent / High attention needed (Orange marker)
      } else {
        urgency = ReportUrgency.MEDIUM;
      }
    }

    markerMap.set(report.id, {
      id: report.id,
      title: report.title,
      description: report.description,
      category: report.category,
      status: report.status,
      urgency,
      latitude: latLng.latitude,
      longitude: latLng.longitude,
      locationDescription: report.locationDescription,
      mediaThumbnailUrl: thumbnailUrl,
      createdAt: report.createdAt,
    });
  }

  return Array.from(markerMap.values());
}

/**
 * Determines marker semantic color and urgency level based on the strict rules:
 * - Green: All reports grouped at the location are resolved.
 * - Red: At least one confirmed critical, unresolved report has exceeded its configured response threshold.
 * - Orange: At least one urgent or high-priority unresolved report requires attention.
 * - Blue: Ordinary active reports without an overdue critical or urgent condition.
 */
export function calculateLocationGroupUrgency(
  reports: MapMarkerData[],
  nowMs: number = Date.now()
): { semanticColor: string; urgencyLabel: 'Resolved' | 'Critical Overdue' | 'Urgent' | 'Active' } {
  if (!reports || reports.length === 0) {
    return { semanticColor: '#2563EB', urgencyLabel: 'Active' }; // Blue default
  }

  // 1. Check if all reports are resolved
  const allResolved = reports.every(
    (r) => r.status === ReportStatus.RESOLVED || r.status === ReportStatus.REJECTED
  );
  if (allResolved) {
    return { semanticColor: '#16A34A', urgencyLabel: 'Resolved' }; // Green
  }

  const unresolvedReports = reports.filter(
    (r) => r.status !== ReportStatus.RESOLVED && r.status !== ReportStatus.REJECTED
  );

  // 2. Check for Overdue Critical reports (>24 hours)
  const hasCriticalOverdue = unresolvedReports.some((r) => {
    if (r.urgency === ReportUrgency.CRITICAL) {
      const createdTime = new Date(r.createdAt).getTime();
      const ageHours = (nowMs - createdTime) / (1000 * 60 * 60);
      return ageHours >= RESPONSE_THRESHOLDS_HOURS.CRITICAL;
    }
    return false;
  });

  if (hasCriticalOverdue) {
    return { semanticColor: '#DC2626', urgencyLabel: 'Critical Overdue' }; // Red
  }

  // 3. Check for Urgent/High Priority unresolved reports
  const hasUrgent = unresolvedReports.some((r) => {
    return (
      r.urgency === ReportUrgency.CRITICAL ||
      r.urgency === ReportUrgency.HIGH ||
      r.category === ReportCategory.PUBLIC_SAFETY
    );
  });

  if (hasUrgent) {
    return { semanticColor: '#EA580C', urgencyLabel: 'Urgent' }; // Orange
  }

  // 4. Ordinary active reports
  return { semanticColor: '#2563EB', urgencyLabel: 'Active' }; // Blue
}

/**
 * Deterministically groups reports whose public coordinates are within a distance tolerance (e.g. 50 meters).
 * Produces clean, non-overlapping LocationGroupMarker items.
 */
export function groupReportsByLocation(
  reports: MapMarkerData[],
  toleranceMeters: number = 50,
  nowMs: number = Date.now()
): LocationGroupMarker[] {
  if (!Array.isArray(reports) || reports.length === 0) return [];

  const groups: LocationGroupMarker[] = [];

  for (const report of reports) {
    // Try to find an existing group within distance tolerance
    let matchedGroup = groups.find((g) => {
      const dist = calculateDistanceMeters(g.latitude, g.longitude, report.latitude, report.longitude);
      return dist <= toleranceMeters;
    });

    if (matchedGroup) {
      matchedGroup.reports.push(report);
      // Recalculate semantic urgency & color
      const { semanticColor, urgencyLabel } = calculateLocationGroupUrgency(
        matchedGroup.reports,
        nowMs
      );
      matchedGroup.semanticColor = semanticColor;
      matchedGroup.urgencyLabel = urgencyLabel;
    } else {
      const placeName =
        report.locationDescription ||
        findNearestOfflinePlaceName(report.latitude, report.longitude);

      const singleGroupReports = [report];
      const { semanticColor, urgencyLabel } = calculateLocationGroupUrgency(
        singleGroupReports,
        nowMs
      );

      groups.push({
        key: `loc_${report.latitude.toFixed(4)}_${report.longitude.toFixed(4)}`,
        latitude: report.latitude,
        longitude: report.longitude,
        reports: singleGroupReports,
        primaryCategory: report.category,
        primaryEmoji: getCategoryEmoji(report.category),
        semanticColor,
        urgencyLabel,
        locationLabel: placeName,
      });
    }
  }

  return groups;
}

/**
 * Calculates approximate radius in meters from map latitude and longitude deltas.
 */
export function calculateRadiusFromRegion(region: MapRegion): number {
  const latDistanceMeters = region.latitudeDelta * 111000;
  const radius = Math.round(latDistanceMeters / 2);
  return Math.max(500, Math.min(50000, radius));
}

/**
 * Returns a human-friendly visual color indicator for a given issue category.
 */
export function getCategoryMarkerColor(category: ReportCategory): string {
  switch (category) {
    case ReportCategory.POTHOLE:
      return '#E11D48'; // Rose Red
    case ReportCategory.STREETLIGHT:
      return '#D97706'; // Amber / Light Gold
    case ReportCategory.GARBAGE:
      return '#16A34A'; // Forest Green
    case ReportCategory.WATER:
      return '#0284C7'; // Cyan / Sky Blue
    case ReportCategory.DRAINAGE:
      return '#7C3AED'; // Deep Violet
    case ReportCategory.PUBLIC_SAFETY:
      return '#DC2626'; // High Alert Crimson
    case ReportCategory.ROAD_DAMAGE:
      return '#EA580C'; // Bright Orange
    case ReportCategory.OTHER:
    default:
      return '#475569'; // Slate
  }
}

/**
 * Returns a recognizable category emoji icon.
 */
export function getCategoryEmoji(category: ReportCategory): string {
  switch (category) {
    case ReportCategory.POTHOLE:
      return '🕳️';
    case ReportCategory.STREETLIGHT:
      return '💡';
    case ReportCategory.GARBAGE:
      return '🗑️';
    case ReportCategory.WATER:
      return '💧';
    case ReportCategory.DRAINAGE:
      return '🌊';
    case ReportCategory.PUBLIC_SAFETY:
      return '⚠️';
    case ReportCategory.ROAD_DAMAGE:
      return '🚧';
    case ReportCategory.OTHER:
    default:
      return '📌';
  }
}

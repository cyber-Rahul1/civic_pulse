import { ReportCategory, ReportStatus, ReportDto, ReportUrgency } from '@civic-pulse/contracts';
import {
  convertGeoPointToLatLng,
  buildMapMarkersFromReports,
  groupReportsByLocation,
  calculateLocationGroupUrgency,
  calculateDistanceMeters,
  findNearestOfflinePlaceName,
  isCoordinateInAndhraPradesh,
} from '../utils/map-utils';
import {
  saveReportsToOfflineCache,
  loadReportsFromOfflineCache,
} from '../storage/offline-cache';
import { secureStorage } from '../storage/secure-storage';

describe('Andhra Pradesh Regional Offline Map & Location Grouping Unit Tests', () => {
  beforeEach(() => {
    secureStorage.clearMemory();
  });

  const sampleReport1: ReportDto = {
    id: 'rep-1',
    authorId: 'usr-1',
    title: 'Damaged storm drain in Vijayawada',
    description: 'Deep road crater damaging vehicles during peak traffic.',
    category: ReportCategory.DRAINAGE,
    status: ReportStatus.SUBMITTED,
    location: {
      type: 'Point',
      coordinates: [80.6480, 16.5062], // Vijayawada: [lng, lat]
    },
    locationDescription: 'Near Benz Circle, Vijayawada',
    media: [
      {
        mediaId: 'med-1',
        publicId: 'civic_pulse/reports/rep-1/sample',
        url: 'https://res.cloudinary.com/test/image/upload/sample.jpg',
        secureUrl: 'https://res.cloudinary.com/test/image/upload/sample.jpg',
        format: 'jpg',
        resourceType: 'image',
        bytes: 10240,
        uploadedByUserId: 'usr-1',
        createdAt: '2026-10-25T10:00:00Z',
      },
    ],
    statusHistory: [],
    createdAt: '2026-10-25T10:00:00Z',
    updatedAt: '2026-10-25T10:00:00Z',
  };

  const sampleReport2: ReportDto = {
    id: 'rep-2',
    authorId: 'usr-2',
    title: 'Broken Streetlamp at Benz Circle',
    description: 'Dark corner at Benz Circle, light fixture broken.',
    category: ReportCategory.STREETLIGHT,
    status: ReportStatus.RESOLVED,
    location: {
      type: 'Point',
      coordinates: [80.6482, 16.5064], // ~30 meters away from rep-1
    },
    locationDescription: 'Benz Circle East Corner',
    media: [],
    statusHistory: [],
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z',
  };

  const sampleReport3: ReportDto = {
    id: 'rep-3',
    authorId: 'usr-3',
    title: 'Open Live Wire Hazard',
    description: 'Dangerous exposed electrical wire near bus stop.',
    category: ReportCategory.PUBLIC_SAFETY,
    status: ReportStatus.SUBMITTED,
    location: {
      type: 'Point',
      coordinates: [83.2185, 17.6868], // Visakhapatnam: [lng, lat]
    },
    locationDescription: 'Near RK Beach Road, Visakhapatnam',
    media: [],
    statusHistory: [],
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), // 36 hours ago (Exceeds 24h threshold)
    updatedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    ...({ urgency: ReportUrgency.CRITICAL } as any), // Confirmed critical incident
  };

  describe('1. GeoJSON Coordinate Conversion & Bounds Validation', () => {
    it('should correctly convert [lng, lat] GeoJSON coordinates to { latitude, longitude }', () => {
      const result = convertGeoPointToLatLng({
        type: 'Point',
        coordinates: [80.6480, 16.5062],
      });

      expect(result).not.toBeNull();
      expect(result?.latitude).toBe(16.5062);
      expect(result?.longitude).toBe(80.6480);
    });

    it('should reject missing or malformed GeoJSON coordinates', () => {
      expect(convertGeoPointToLatLng(null)).toBeNull();
      expect(convertGeoPointToLatLng(undefined)).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [] as any })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [80.648] as any })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [NaN, 16.5] })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [80.6, 'invalid' as any] })).toBeNull();
    });

    it('should reject out-of-bounds geographic coordinates', () => {
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [80.648, 91.0] })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [80.648, -95.0] })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [185.0, 16.5] })).toBeNull();
      expect(convertGeoPointToLatLng({ type: 'Point', coordinates: [-185.0, 16.5] })).toBeNull();
    });
  });

  describe('2. Andhra Pradesh Regional Boundaries & Place Resolution', () => {
    it('should verify coordinates inside and outside Andhra Pradesh', () => {
      expect(isCoordinateInAndhraPradesh(16.5062, 80.6480)).toBe(true); // Vijayawada
      expect(isCoordinateInAndhraPradesh(17.6868, 83.2185)).toBe(true); // Visakhapatnam
      expect(isCoordinateInAndhraPradesh(13.6288, 79.4192)).toBe(true); // Tirupati
      expect(isCoordinateInAndhraPradesh(15.8281, 78.0373)).toBe(true); // Kurnool

      // Outside AP
      expect(isCoordinateInAndhraPradesh(28.6139, 77.2090)).toBe(false); // New Delhi
      expect(isCoordinateInAndhraPradesh(12.9716, 77.5946)).toBe(false); // Bengaluru
      expect(isCoordinateInAndhraPradesh(19.0760, 72.8777)).toBe(false); // Mumbai
    });

    it('should resolve the nearest district or town from offline package without geocoding API', () => {
      const place1 = findNearestOfflinePlaceName(16.5062, 80.6480);
      expect(place1).toBe('Vijayawada');

      const place2 = findNearestOfflinePlaceName(17.6868, 83.2185);
      expect(place2).toBe('Visakhapatnam');

      const place3 = findNearestOfflinePlaceName(13.6288, 79.4192);
      expect(place3).toBe('Tirupati');
    });
  });

  describe('3. Location Grouping & Distance Tolerance', () => {
    it('should calculate distance accurately between coordinates using Haversine', () => {
      // Distance between rep-1 and rep-2 is ~30m
      const dist = calculateDistanceMeters(16.5062, 80.6480, 16.5064, 80.6482);
      expect(dist).toBeGreaterThan(20);
      expect(dist).toBeLessThan(50);
    });

    it('should group closely positioned reports within 50m tolerance into a single location marker', () => {
      const markers = buildMapMarkersFromReports([sampleReport1, sampleReport2, sampleReport3]);
      const groups = groupReportsByLocation(markers, 50);

      // rep-1 and rep-2 are ~30m apart and should be grouped together
      // rep-3 is in Visakhapatnam and should form its own group
      expect(groups).toHaveLength(2);

      const benzCircleGroup = groups.find((g) => g.reports.length === 2);
      expect(benzCircleGroup).toBeDefined();
      expect(benzCircleGroup?.reports.map((r) => r.id).sort()).toEqual(['rep-1', 'rep-2']);
    });

    it('should safely handle reports without coordinates without adding synthetic pins', () => {
      const noLocReport: ReportDto = {
        ...sampleReport1,
        id: 'no-loc',
        location: undefined,
        locationDescription: 'Descriptive landmark only',
      };

      const markers = buildMapMarkersFromReports([sampleReport1, noLocReport]);
      expect(markers).toHaveLength(1);
      expect(markers[0]!.id).toBe('rep-1');
    });
  });

  describe('4. Semantic Urgency & Marker Color Rules', () => {
    it('should assign Green when all reports grouped at a location are resolved', () => {
      const resolvedMarkers = buildMapMarkersFromReports([sampleReport2]);
      const urgency = calculateLocationGroupUrgency(resolvedMarkers);

      expect(urgency.semanticColor).toBe('#16A34A'); // Green
      expect(urgency.urgencyLabel).toBe('Resolved');
    });

    it('should assign Red when an unresolved confirmed critical report exceeds response threshold (24h)', () => {
      const overdueMarkers = buildMapMarkersFromReports([sampleReport3]);
      const urgency = calculateLocationGroupUrgency(overdueMarkers);

      expect(urgency.semanticColor).toBe('#DC2626'); // Red
      expect(urgency.urgencyLabel).toBe('Critical Overdue');
    });

    it('should NOT assign Red for unconfirmed PUBLIC_SAFETY reports based on category default alone', () => {
      // Unconfirmed category-based report (no explicit urgency: CRITICAL)
      const unconfirmedSafetyReport: ReportDto = {
        ...sampleReport1,
        id: 'rep-safety',
        category: ReportCategory.PUBLIC_SAFETY,
        createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), // 48h old
      };
      const markers = buildMapMarkersFromReports([unconfirmedSafetyReport]);
      const urgency = calculateLocationGroupUrgency(markers);

      // Category heuristic gives HIGH (Orange), never auto-promoted to verified CRITICAL (Red)
      expect(urgency.semanticColor).toBe('#EA580C'); // Orange
      expect(urgency.urgencyLabel).toBe('Urgent');
    });

    it('should assign Orange when at least one urgent or high-priority report is unresolved', () => {
      // Rep-1 is DRAINAGE (High priority) and unresolved
      const urgentMarkers = buildMapMarkersFromReports([sampleReport1]);
      const urgency = calculateLocationGroupUrgency(urgentMarkers);

      expect(urgency.semanticColor).toBe('#EA580C'); // Orange
      expect(urgency.urgencyLabel).toBe('Urgent');
    });

    it('should assign Blue for ordinary active reports without urgent condition', () => {
      const ordinaryReport: ReportDto = {
        ...sampleReport1,
        id: 'rep-ord',
        category: ReportCategory.OTHER,
        ...({ urgency: ReportUrgency.MEDIUM } as any),
      };
      const ordinaryMarkers = buildMapMarkersFromReports([ordinaryReport]);
      const urgency = calculateLocationGroupUrgency(ordinaryMarkers);

      expect(urgency.semanticColor).toBe('#2563EB'); // Blue
      expect(urgency.urgencyLabel).toBe('Active');
    });

    it('should evaluate mixed groups to the most serious unresolved report (never Green if unresolved)', () => {
      // Group containing rep-1 (urgent unresolved) and rep-2 (resolved)
      const mixedMarkers = buildMapMarkersFromReports([sampleReport1, sampleReport2]);
      const urgency = calculateLocationGroupUrgency(mixedMarkers);

      expect(urgency.semanticColor).not.toBe('#16A34A'); // NOT green
      expect(urgency.semanticColor).toBe('#EA580C'); // Urgent orange dominates
    });
  });

  describe('5. Offline Cache Storage Persistence', () => {
    beforeEach(async () => {
      const { clearOfflineReportsCache } = await import('../storage/offline-cache');
      await clearOfflineReportsCache();
    });

    it('should save and load reports from offline cache bundle', async () => {
      await saveReportsToOfflineCache([sampleReport1, sampleReport2]);

      const bundle = await loadReportsFromOfflineCache();
      expect(bundle).not.toBeNull();
      expect(bundle?.reports).toHaveLength(2);
      expect(bundle?.reports[0]?.id).toBe('rep-1');
      expect(bundle?.cachedAtFormatted).toBeTruthy();
    });

    it('should return null when cache is empty', async () => {
      const bundle = await loadReportsFromOfflineCache();
      expect(bundle).toBeNull();
    });
  });
});

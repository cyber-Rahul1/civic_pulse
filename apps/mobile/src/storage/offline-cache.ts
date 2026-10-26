import { secureStorage } from './secure-storage';
import { ReportDto } from '@civic-pulse/contracts';

const OFFLINE_REPORTS_CACHE_KEY = 'civic_offline_reports_cache_v2';
const OFFLINE_REPORTS_TIMESTAMP_KEY = 'civic_offline_reports_timestamp_v2';

// In-memory runtime cache for the current session and test environments
let inMemoryReportsCache: { reports: ReportDto[]; cachedAt: number } | null = null;

export interface CachedReportsBundle {
  reports: ReportDto[];
  cachedAt: number; // unix ms
  cachedAtFormatted: string;
}

/**
 * Prunes non-essential fields to keep cached items lightweight and well within 2KB limit if stored,
 * preserving all fields required by map grouping, urgency calculation, and preview list.
 */
function pruneReportsForCache(reports: ReportDto[]): ReportDto[] {
  return reports.map((r) => ({
    id: r.id,
    authorId: r.authorId,
    title: r.title,
    description: r.description,
    category: r.category,
    status: r.status,
    priority: (r as any).priority,
    urgencyConcern: (r as any).urgencyConcern,
    location: r.location,
    locationDescription: r.locationDescription,
    media: r.media ? r.media.slice(0, 1) : [],
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    statusHistory: [],
  } as unknown as ReportDto));
}

/**
 * Saves successfully fetched reports to offline storage.
 * Maintains an in-memory copy and persists lightweight reports.
 */
export async function saveReportsToOfflineCache(reports: ReportDto[]): Promise<void> {
  try {
    if (!Array.isArray(reports)) return;
    const now = Date.now();
    const lightweight = pruneReportsForCache(reports);
    inMemoryReportsCache = { reports: lightweight, cachedAt: now };

    // Also persist timestamp
    await secureStorage.setItemAsync(OFFLINE_REPORTS_TIMESTAMP_KEY, String(now));

    // Try persisting serialized bundle if size is reasonable, otherwise rely on in-memory / session cache
    const serialized = JSON.stringify(lightweight);
    // If under 2000 chars, write to storage; otherwise slice to top reports or keep in-memory
    if (serialized.length <= 2048) {
      await secureStorage.setItemAsync(OFFLINE_REPORTS_CACHE_KEY, serialized);
    } else {
      // Keep most recent reports within 2048 bytes
      const sliceSize = Math.max(1, Math.floor(lightweight.length / 2));
      const trimmed = lightweight.slice(0, sliceSize);
      const trimmedSerialized = JSON.stringify(trimmed);
      if (trimmedSerialized.length <= 2048) {
        await secureStorage.setItemAsync(OFFLINE_REPORTS_CACHE_KEY, trimmedSerialized);
      }
    }
  } catch (err) {
    // Non-fatal, gracefully handle offline cache write failures
  }
}

/**
 * Prepends a newly submitted report to the offline cache immediately,
 * avoiding duplicate entries and ensuring immediate map synchronization.
 */
export async function prependReportToOfflineCache(newReport: ReportDto): Promise<void> {
  try {
    if (!newReport || !newReport.id) return;
    const existing = inMemoryReportsCache?.reports || [];
    // Filter out if already present to guarantee uniqueness
    const filtered = existing.filter((r) => r.id !== newReport.id);
    const updated = [newReport, ...filtered];
    await saveReportsToOfflineCache(updated);
  } catch (err) {
    // Non-fatal
  }
}

/**
 * Loads cached reports from offline storage.
 * Returns in-memory cache if available, or persisted cache from storage.
 */
export async function loadReportsFromOfflineCache(): Promise<CachedReportsBundle | null> {
  try {
    if (inMemoryReportsCache && inMemoryReportsCache.reports.length > 0) {
      const date = new Date(inMemoryReportsCache.cachedAt);
      const formatted = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      return {
        reports: inMemoryReportsCache.reports,
        cachedAt: inMemoryReportsCache.cachedAt,
        cachedAtFormatted: formatted,
      };
    }

    const rawData = await secureStorage.getItemAsync(OFFLINE_REPORTS_CACHE_KEY);
    if (!rawData) return null;

    const reports = JSON.parse(rawData);
    if (!Array.isArray(reports)) return null;

    const rawTs = await secureStorage.getItemAsync(OFFLINE_REPORTS_TIMESTAMP_KEY);
    const cachedAt = rawTs ? parseInt(rawTs, 10) : Date.now();

    const date = new Date(cachedAt);
    const formatted = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    inMemoryReportsCache = { reports, cachedAt };

    return {
      reports,
      cachedAt,
      cachedAtFormatted: formatted,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Resets offline cache (for testing or explicit cache clearing).
 */
export async function clearOfflineReportsCache(): Promise<void> {
  inMemoryReportsCache = null;
  await secureStorage.deleteItemAsync(OFFLINE_REPORTS_CACHE_KEY);
  await secureStorage.deleteItemAsync(OFFLINE_REPORTS_TIMESTAMP_KEY);
}


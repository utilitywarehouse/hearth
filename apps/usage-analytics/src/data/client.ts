import type { Snapshot, UsageIndex } from './types';

// Vite serves public/ at BASE_URL; data/ is synced there by scripts/copy-data.js.
const BASE = import.meta.env.BASE_URL;

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}data/${path}`);
  if (!res.ok) throw new Error(`Failed to load data/${path} (${res.status})`);
  return (await res.json()) as T;
}

export function fetchIndex(): Promise<UsageIndex> {
  return getJson<UsageIndex>('index.json');
}

const snapshotCache = new Map<string, Promise<Snapshot>>();

export function fetchSnapshot(date: string): Promise<Snapshot> {
  let p = snapshotCache.get(date);
  if (!p) {
    p = getJson<Snapshot>(`snapshots/${date}.json`);
    snapshotCache.set(date, p);
  }
  return p;
}

/** Load every snapshot referenced by the index (used for symbol-level trends). */
export async function fetchAllSnapshots(index: UsageIndex): Promise<Snapshot[]> {
  return Promise.all(index.snapshots.map(s => fetchSnapshot(s.date)));
}

import { useEffect, useState } from 'react';
import type { Snapshot, UsageIndex } from './types';
import { fetchAllSnapshots, fetchIndex, fetchSnapshot } from './client';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fn()
      .then(data => !cancelled && setState({ data, loading: false, error: null }))
      .catch(err => !cancelled && setState({ data: null, loading: false, error: String(err) }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export function useIndex() {
  return useAsync<UsageIndex>(fetchIndex, []);
}

export function useSnapshot(date: string | null) {
  return useAsync<Snapshot | null>(() => (date ? fetchSnapshot(date) : Promise.resolve(null)), [date]);
}

export function useAllSnapshots(index: UsageIndex | null) {
  return useAsync<Snapshot[]>(
    () => (index ? fetchAllSnapshots(index) : Promise.resolve([])),
    [index]
  );
}

/** The most recent snapshot date in the index, or null. */
export function latestDate(index: UsageIndex | null): string | null {
  if (!index || index.snapshots.length === 0) return null;
  return index.snapshots[index.snapshots.length - 1]!.date;
}

import type { Snapshot } from '../../src/data/types.ts';

/**
 * Returns an error message if `next` covers far fewer repos than `previous` —
 * a sign discovery or cloning silently came back partial — or null if it's fine.
 */
export function checkRepoCountDrop(
  previous: Snapshot | null,
  next: Snapshot,
  minRetention: number
): string | null {
  if (!previous) return null;
  const prevCount = Object.keys(previous.repos).length;
  const nextCount = Object.keys(next.repos).length;
  if (prevCount === 0 || nextCount >= prevCount * minRetention) return null;
  return (
    `Snapshot ${next.date} covers ${nextCount} repos, down from ${prevCount} on ${previous.date} ` +
    `(below the ${Math.round(minRetention * 100)}% retention threshold). This usually means code ` +
    `search returned partial results. Re-run later, or pass --allow-drop if the drop is real.`
  );
}

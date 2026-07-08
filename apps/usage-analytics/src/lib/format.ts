const nf = new Intl.NumberFormat('en-GB');

export function num(n: number): string {
  return nf.format(n);
}

/** Compact form for big numbers on cards/axes: 11083 -> 11.1k. */
export function compact(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
  return `${(n / 1_000_000).toFixed(1)}m`;
}

export function pct(part: number, whole: number): string {
  if (!whole) return '0%';
  return `${Math.round((part / whole) * 100)}%`;
}

/** owner/repo -> repo (drop the org prefix for display). */
export function repoLabel(fullName: string): string {
  const i = fullName.indexOf('/');
  return i >= 0 ? fullName.slice(i + 1) : fullName;
}

export function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

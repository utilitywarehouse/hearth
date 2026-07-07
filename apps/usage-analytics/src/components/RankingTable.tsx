import { useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { num } from '../lib/format';

export interface RankRow {
  name: string;
  refCount: number;
  repoCount: number;
  fileCount: number;
}

type SortKey = 'refCount' | 'repoCount' | 'fileCount';

/**
 * Sortable, virtualized ranking table (desc by default). Renders a proportional
 * bar behind each row so the distribution reads at a glance. Handles thousands
 * of rows via @tanstack/react-virtual.
 */
export function RankingTable({
  rows,
  unit,
  color,
  onSelect,
}: {
  rows: RankRow[];
  unit: string;
  color: string;
  onSelect?: (name: string) => void;
}) {
  const [sort, setSort] = useState<SortKey>('refCount');
  const parentRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => b[sort] - a[sort] || b.refCount - a.refCount),
    [rows, sort]
  );
  const max = sorted.length ? Math.max(...sorted.map(r => r.refCount)) : 0;

  const rowVirtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 12,
  });

  const header = (key: SortKey, label: string) => (
    <button
      type="button"
      className={`rt__sort ${sort === key ? 'is-active' : ''}`}
      onClick={() => setSort(key)}
    >
      {label}
      {sort === key ? ' ↓' : ''}
    </button>
  );

  if (!rows.length) return <p className="muted">No symbols recorded.</p>;

  return (
    <div className="rt">
      <div className="rt__row rt__row--head">
        <span className="rt__rank">#</span>
        <span className="rt__name">{unit}</span>
        <span className="rt__col">{header('refCount', 'Refs')}</span>
        <span className="rt__col">{header('repoCount', 'Repos')}</span>
        <span className="rt__col">{header('fileCount', 'Files')}</span>
      </div>
      <div ref={parentRef} className="rt__body">
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map(vi => {
            const row = sorted[vi.index]!;
            const width = max ? `${Math.max(2, (row.refCount / max) * 100)}%` : '0%';
            return (
              <div
                key={row.name}
                className={`rt__row ${onSelect ? 'rt__row--link' : ''}`}
                style={{ transform: `translateY(${vi.start}px)`, height: vi.size }}
                onClick={onSelect ? () => onSelect(row.name) : undefined}
                role={onSelect ? 'button' : undefined}
                tabIndex={onSelect ? 0 : undefined}
              >
                <span className="rt__rank">{vi.index + 1}</span>
                <span className="rt__name" title={row.name}>
                  <span className="rt__bar" style={{ width, background: color }} />
                  <span className="rt__label">{row.name}</span>
                </span>
                <span className="rt__col rt__col--strong">{num(row.refCount)}</span>
                <span className="rt__col">{num(row.repoCount)}</span>
                <span className="rt__col">{num(row.fileCount)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

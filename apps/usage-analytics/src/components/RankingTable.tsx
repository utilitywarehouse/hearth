import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { num } from '../lib/format';

export interface RankRow {
  name: string;
  refCount: number;
  repoCount: number;
  fileCount: number;
}

type SortKey = 'refCount' | 'repoCount' | 'fileCount';

export interface RankColumn {
  key: SortKey;
  label: string;
}

const DEFAULT_COLUMNS: RankColumn[] = [
  { key: 'refCount', label: 'Refs' },
  { key: 'repoCount', label: 'Repos' },
  { key: 'fileCount', label: 'Files' },
];

/**
 * Sortable, virtualized ranking table (desc by default). Renders a proportional
 * bar behind each row so the distribution reads at a glance. Handles thousands
 * of rows via @tanstack/react-virtual. `columns` lets callers relabel/reorder
 * the numeric columns for contexts where "repoCount" holds something other than
 * a literal repo count (e.g. distinct symbols used).
 */
export function RankingTable({
  rows,
  unit,
  color,
  onSelect,
  columns = DEFAULT_COLUMNS,
}: {
  rows: RankRow[];
  unit: string;
  color: string;
  onSelect?: (name: string) => void;
  columns?: RankColumn[];
}) {
  const [sort, setSort] = useState<SortKey>(columns[0]?.key ?? 'refCount');
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

  const header = (col: RankColumn) => (
    <button
      type="button"
      className={`rt__sort ${sort === col.key ? 'is-active' : ''}`}
      onClick={() => setSort(col.key)}
    >
      {col.label}
      {sort === col.key ? ' ↓' : ''}
    </button>
  );

  if (!rows.length) return <p className="muted">No symbols recorded.</p>;

  return (
    <div className="rt">
      <div className="rt__row rt__row--head" style={gridStyle(columns.length)}>
        <span className="rt__rank">#</span>
        <span className="rt__name">{unit}</span>
        {columns.map(col => (
          <span className="rt__col" key={col.key}>
            {header(col)}
          </span>
        ))}
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
                style={{ ...gridStyle(columns.length), transform: `translateY(${vi.start}px)`, height: vi.size }}
                onClick={onSelect ? () => onSelect(row.name) : undefined}
                role={onSelect ? 'button' : undefined}
                tabIndex={onSelect ? 0 : undefined}
              >
                <span className="rt__rank">{vi.index + 1}</span>
                <span className="rt__name" title={row.name}>
                  <span className="rt__bar" style={{ width, background: color }} />
                  <span className="rt__label">{row.name}</span>
                </span>
                {columns.map((col, i) => (
                  <span className={`rt__col ${i === 0 ? 'rt__col--strong' : ''}`} key={col.key}>
                    {num(row[col.key])}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function gridStyle(colCount: number): CSSProperties {
  return { gridTemplateColumns: `40px 1fr ${'70px '.repeat(colCount).trim()}` };
}

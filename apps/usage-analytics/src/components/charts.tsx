import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react';
import { compact, formatDate, num } from '../lib/format';

export interface Series {
  key: string;
  label: string;
  color: string;
}

export interface TrendPoint {
  date: string;
  [series: string]: number | string;
}

const AXIS = 'var(--h-text-secondary)';
const GRID = 'var(--h-border-subtle)';

/**
 * The three usage metrics every trend is tracked by (see `orgTrend`/`packageTrend`
 * in `lib/series.ts`). Repo counts change far less often than refs or files, so
 * refs is the more useful default view.
 */
export type TrendMetric = 'refs' | 'files' | 'repos';

export const TREND_METRIC_LABELS: Record<TrendMetric, string> = {
  refs: 'References',
  files: 'File imports',
  repos: 'Repos',
};

/** Switches which metric a single-series TrendChart displays. Defaults belong to the caller. */
export function TrendMetricSwitcher({
  value,
  onChange,
}: {
  value: TrendMetric;
  onChange: (metric: TrendMetric) => void;
}) {
  return (
    <SegmentedControl
      size="sm"
      value={[value]}
      onValueChange={([next]) => {
        // multiple=false toggle groups can emit [] when the pressed option is
        // clicked again — ignore that so a metric is always selected.
        if (next) onChange(next as TrendMetric);
      }}
    >
      {(Object.keys(TREND_METRIC_LABELS) as Array<TrendMetric>).map(metric => (
        <SegmentedControlOption key={metric} value={metric} label={TREND_METRIC_LABELS[metric]} />
      ))}
    </SegmentedControl>
  );
}

/** Multi-series line chart for weekly usage-over-time. */
export function TrendChart({
  data,
  series,
  height = 280,
}: {
  data: Array<TrendPoint>;
  series: Array<Series>;
  height?: number;
}) {
  if (data.length < 2) {
    return (
      <p className="muted">
        Trend needs at least two weekly snapshots — {data.length} available so far.
      </p>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 4 }}>
        <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          stroke={AXIS}
          fontSize={12}
          tickMargin={8}
        />
        <YAxis stroke={AXIS} fontSize={12} tickFormatter={compact} width={44} />
        <Tooltip
          formatter={(v: number) => num(v)}
          labelFormatter={formatDate}
          contentStyle={{
            background: 'var(--h-background-primary)',
            border: `1px solid ${GRID}`,
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        {series.length > 1 ? <Legend wrapperStyle={{ fontSize: 12 }} /> : null}
        {series.map(s => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Coverage donut: used vs unused exported symbols. */
export function CoverageDonut({ used, total, color }: { used: number; total: number; color: string }) {
  const data = [
    { name: 'Used', value: used },
    { name: 'Unused', value: Math.max(0, total - used) },
  ];
  return (
    <div className="donut">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={48} outerRadius={68} startAngle={90} endAngle={-270} stroke="none">
            <Cell fill={color} />
            <Cell fill="var(--h-border-subtle)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="donut__center">
        <strong>{total ? Math.round((used / total) * 100) : 0}%</strong>
        <span className="muted">
          {used}/{total}
        </span>
      </div>
    </div>
  );
}

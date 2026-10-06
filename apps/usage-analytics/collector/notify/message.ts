import type { IndexEntry } from '../../src/data/types.ts';

/** Packages called out on their own, separately from the org-wide totals. */
const HIGHLIGHTED_PACKAGES: Array<{ name: string; label: string; emoji: string }> = [
  { name: '@utilitywarehouse/hearth-react', label: 'hearth-react', emoji: ':atom_symbol:' },
  {
    name: '@utilitywarehouse/hearth-react-native',
    label: 'hearth-react-native',
    emoji: ':iphone:',
  },
];

interface Metric {
  label: string;
  current: number;
  previous: number | undefined;
}

export interface SlackMessage {
  text: string;
  blocks: Array<Record<string, unknown>>;
}

const fmt = (n: number) => n.toLocaleString('en-GB');

/**
 * `+85 (+2.4%)`-style change vs the previous value. `trend` picks the emoji:
 * for hearth, up is good; for legacy packages, down is good.
 */
export function formatDelta(
  current: number,
  previous: number | undefined,
  trend: 'up-is-good' | 'down-is-good' = 'up-is-good'
): string {
  if (previous === undefined) return ':new: first snapshot';
  const diff = current - previous;
  if (diff === 0) return ':heavy_minus_sign: no change';
  const sign = diff > 0 ? '+' : '−';
  const pct = previous === 0 ? '' : ` (${sign}${((Math.abs(diff) / previous) * 100).toFixed(1)}%)`;
  const good = trend === 'up-is-good' ? diff > 0 : diff < 0;
  const emoji = good
    ? diff > 0
      ? ':chart_with_upwards_trend:'
      : ':tada:'
    : diff > 0
      ? ':warning:'
      : ':chart_with_downwards_trend:';
  return `${emoji} ${sign}${fmt(Math.abs(diff))}${pct}`;
}

function metricLines(metrics: Array<Metric>, trend: 'up-is-good' | 'down-is-good'): string {
  return metrics
    .map(m => `• *${m.label}:* ${fmt(m.current)}  ${formatDelta(m.current, m.previous, trend)}`)
    .join('\n');
}

function section(text: string): Record<string, unknown> {
  return { type: 'section', text: { type: 'mrkdwn', text } };
}

/** Build the weekly Slack summary comparing the latest index entry to the one before it. */
export function buildSlackMessage(
  current: IndexEntry,
  previous: IndexEntry | undefined,
  opts: { prUrl?: string; dashboardUrl?: string } = {}
): SlackMessage {
  const since = previous ? ` vs ${previous.date}` : '';
  const header = `:fire: Hearth usage snapshot — ${current.date}`;

  const overall = metricLines(
    [
      {
        label: 'Repos using Hearth',
        current: current.orgTotals.reposUsingAnyHearth,
        previous: previous?.orgTotals.reposUsingAnyHearth,
      },
      {
        label: 'Files importing Hearth',
        current: current.orgTotals.totalHearthFiles,
        previous: previous?.orgTotals.totalHearthFiles,
      },
      {
        label: 'References',
        current: current.orgTotals.totalHearthRefs,
        previous: previous?.orgTotals.totalHearthRefs,
      },
    ],
    'up-is-good'
  );

  const packageSections = HIGHLIGHTED_PACKAGES.map(({ name, label, emoji }) => {
    const cur = current.packages[name];
    const prev = previous?.packages[name];
    if (!cur) return section(`${emoji} *${label}*\n_No data in this snapshot._`);
    return section(
      `${emoji} *${label}*\n` +
        metricLines(
          [
            { label: 'Repos', current: cur.repoCount, previous: prev?.repoCount },
            { label: 'Files', current: cur.fileCount, previous: prev?.fileCount },
            { label: 'References', current: cur.refCount, previous: prev?.refCount },
          ],
          'up-is-good'
        )
    );
  });

  const legacy = metricLines(
    [
      {
        label: 'Repos still on legacy',
        current: current.legacyTotals.reposUsingAnyLegacy,
        previous: previous?.legacyTotals.reposUsingAnyLegacy,
      },
      {
        label: 'Files',
        current: current.legacyTotals.totalLegacyFiles,
        previous: previous?.legacyTotals.totalLegacyFiles,
      },
      {
        label: 'References',
        current: current.legacyTotals.totalLegacyRefs,
        previous: previous?.legacyTotals.totalLegacyRefs,
      },
    ],
    'down-is-good'
  );

  const links = [
    opts.prUrl ? `:mag: <${opts.prUrl}|Review the snapshot PR>` : undefined,
    opts.dashboardUrl ? `:bar_chart: <${opts.dashboardUrl}|Open the dashboard>` : undefined,
  ].filter(Boolean);

  const blocks: Array<Record<string, unknown>> = [
    { type: 'header', text: { type: 'plain_text', text: header, emoji: true } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `Week-on-week change${since}` }] },
    section(`:rocket: *Overall Hearth adoption*\n${overall}`),
    { type: 'divider' },
    ...packageSections,
    { type: 'divider' },
    section(`:broom: *Legacy packages* _(lower is better)_\n${legacy}`),
  ];
  if (links.length > 0) {
    blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text: links.join('  •  ') }] });
  }

  const text =
    `${header}: ${fmt(current.orgTotals.reposUsingAnyHearth)} repos, ` +
    `${fmt(current.orgTotals.totalHearthRefs)} references ` +
    `(${formatDelta(current.orgTotals.totalHearthRefs, previous?.orgTotals.totalHearthRefs)})`;

  return { text, blocks };
}

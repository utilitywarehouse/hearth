import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Empty, Loading, PageHeader, Section } from '../components/ui';
import { StatTile } from '../components/cards';
import { CoverageDonut, TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, num } from '../lib/format';
import { packageTrend, packageVersionTrend, reposUsingPackage } from '../lib/series';
import {
  packageColor,
  pkgFromSlug,
  pkgSlug,
  RANK_UNIT,
  shortName,
  TYPE_LABELS,
} from '../lib/packages';
import { bucketColor, compareBucketsDesc, compareVersionsDesc, isOutdated } from '../lib/versions';

// Each row IS a repo; "repoCount" is repurposed to hold the number of distinct
// symbols that repo uses from this package.
const REPO_COLUMNS: Array<RankColumn> = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
  { key: 'repoCount', label: 'Symbols' },
];

// Rows here are version ranges; "refCount" is repurposed to hold repo count
// (also drives the ranking table's bar width) — same reuse pattern as above.
const VERSION_COLUMNS: Array<RankColumn> = [{ key: 'refCount', label: 'Repos' }];

export function PackagePage() {
  const { slug = '' } = useParams();
  const pkg = pkgFromSlug(slug);
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const navigate = useNavigate();

  const trend = useMemo(() => (index.data ? packageTrend(index.data, pkg) : []), [index.data, pkg]);
  const versionTrend = useMemo(
    () => (index.data ? packageVersionTrend(index.data, pkg) : []),
    [index.data, pkg]
  );
  const versionBuckets = useMemo(() => {
    const keys = new Set<string>();
    for (const point of versionTrend) {
      for (const key of Object.keys(point)) if (key !== 'date') keys.add(key);
    }
    return [...keys].sort(compareBucketsDesc);
  }, [versionTrend]);

  if (index.loading || snap.loading) return <Loading />;
  if (index.error) return <ErrorBox error={index.error} />;
  if (!snap.data) return <ErrorBox error="No snapshot found." />;

  const usage = snap.data.packages[pkg];
  if (!usage) return <ErrorBox error={`Unknown package: ${pkg}`} />;

  const color = packageColor(pkg);
  const usedNames = new Set(Object.keys(usage.symbols));
  const rows: Array<RankRow> = [
    ...Object.entries(usage.symbols).map(([name, s]) => ({
      name,
      refCount: s.refCount,
      repoCount: s.repoCount,
      fileCount: s.fileCount,
    })),
    // Exported but never observed in use — shown as zero-value rows so they
    // surface in the same ranking (sorted to the bottom by default).
    ...(usage.coverage?.unusedExports ?? [])
      .filter(name => !usedNames.has(name))
      .map(name => ({ name, refCount: 0, repoCount: 0, fileCount: 0 })),
  ];
  const unit = RANK_UNIT[usage.type];
  const isAsset = usage.type === 'asset';

  const repoUsage = reposUsingPackage(snap.data, pkg);
  const repoRows: Array<RankRow> = repoUsage.map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: r.symbolCount,
    fileCount: r.files,
  }));

  const versionEntries = Object.entries(usage.versions ?? {}).sort((a, b) =>
    compareVersionsDesc(a[0], b[0])
  );
  const versionRows: Array<RankRow> = versionEntries.map(([range, repoCount]) => ({
    name: range,
    refCount: repoCount,
    repoCount: 0,
    fileCount: 0,
  }));
  const reposBehind = versionEntries
    .filter(([range]) => isOutdated(range, usage.latestVersion))
    .reduce((a, [, repoCount]) => a + repoCount, 0);
  const reposOnVersion = versionEntries.reduce((a, [, repoCount]) => a + repoCount, 0);

  return (
    <div>
      <PageHeader
        title={shortName(pkg)}
        subtitle={
          <>
            <span className="badge" style={{ background: color }} /> {TYPE_LABELS[usage.type]}
          </>
        }
      />

      <div className="tiles">
        <StatTile label="Repos" value={num(usage.repoCount)} hint="external adopters" />
        <StatTile label="File imports" value={compact(usage.fileCount)} />
        <StatTile label="References" value={compact(usage.refCount)} />
        {usage.coverage ? (
          <StatTile
            label="Export coverage"
            value={`${usage.coverage.used}/${usage.coverage.totalExported}`}
            hint="symbols used somewhere"
          />
        ) : null}
        {usage.latestVersion ? (
          <StatTile
            label="On latest major"
            value={reposOnVersion ? `${reposOnVersion - reposBehind}/${reposOnVersion}` : '—'}
            hint={`latest published: v${usage.latestVersion}`}
          />
        ) : null}
      </div>

      <div className={usage.coverage ? 'two-col two-col--wide' : ''}>
        <Section title="Usage over time">
          <TrendChart data={trend} series={[{ key: 'refs', label: 'References', color }]} />
        </Section>
        {usage.coverage ? (
          <Section title="Coverage">
            <CoverageDonut
              used={usage.coverage.used}
              total={usage.coverage.totalExported}
              color={color}
            />
            <p className="muted" style={{ textAlign: 'center' }}>
              {usage.coverage.unusedExports.length} exported symbols unused across the org
            </p>
          </Section>
        ) : null}
      </div>

      {versionEntries.length > 0 ? (
        <div className="two-col">
          <Section
            title="Version adoption over time"
            aside={<span className="muted">repos per version</span>}
          >
            <TrendChart
              data={versionTrend}
              series={versionBuckets.map((bucket, i) => ({
                key: bucket,
                label: bucket,
                color: bucketColor(i),
              }))}
            />
          </Section>
          <Section
            title="Versions in use"
            aside={
              <span className="muted">
                {usage.latestVersion
                  ? `${reposBehind} repo${reposBehind === 1 ? '' : 's'} behind latest major`
                  : `${versionRows.length} distinct ranges declared`}
              </span>
            }
          >
            <RankingTable
              rows={versionRows}
              unit="Version"
              color={color}
              columns={VERSION_COLUMNS}
            />
          </Section>
        </div>
      ) : null}

      <Section
        title={isAsset ? 'Symbol usage' : `${unit} usage`}
        aside={<span className="muted">sorted by references</span>}
      >
        {isAsset ? (
          <Empty>
            {shortName(pkg)} is an asset package — usage is tracked at the package/file level (see
            tiles above), not by individual symbol.
          </Empty>
        ) : (
          <RankingTable
            rows={rows}
            unit={unit}
            color={color}
            onSelect={name => void navigate(`/symbol/${pkgSlug(pkg)}/${encodeURIComponent(name)}`)}
          />
        )}
      </Section>

      <Section
        title="Repositories using this package"
        aside={<span className="muted">{repoRows.length} repos</span>}
      >
        <RankingTable
          rows={repoRows}
          unit="Repository"
          color={color}
          columns={REPO_COLUMNS}
          onSelect={repo => void navigate(`/repo/${repo}`)}
        />
      </Section>
    </div>
  );
}

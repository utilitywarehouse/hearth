import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Empty, Loading, PageHeader, Section } from '../components/ui';
import { StatTile } from '../components/cards';
import { CoverageDonut, TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, num } from '../lib/format';
import { packageTrend, reposUsingPackage } from '../lib/series';
import { packageColor, pkgFromSlug, pkgSlug, RANK_UNIT, shortName, TYPE_LABELS } from '../lib/packages';

// Each row IS a repo; "repoCount" is repurposed to hold the number of distinct
// symbols that repo uses from this package.
const REPO_COLUMNS: RankColumn[] = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
  { key: 'repoCount', label: 'Symbols' },
];

export function PackagePage() {
  const { slug = '' } = useParams();
  const pkg = pkgFromSlug(slug);
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const navigate = useNavigate();

  const trend = useMemo(() => (index.data ? packageTrend(index.data, pkg) : []), [index.data, pkg]);

  if (index.loading || snap.loading) return <Loading />;
  if (index.error) return <ErrorBox error={index.error} />;
  if (!snap.data) return <ErrorBox error="No snapshot found." />;

  const usage = snap.data.packages[pkg];
  if (!usage) return <ErrorBox error={`Unknown package: ${pkg}`} />;

  const color = packageColor(pkg);
  const rows: RankRow[] = Object.entries(usage.symbols).map(([name, s]) => ({
    name,
    refCount: s.refCount,
    repoCount: s.repoCount,
    fileCount: s.fileCount,
  }));
  const unit = RANK_UNIT[usage.type];
  const isAsset = usage.type === 'asset';

  const repoUsage = reposUsingPackage(snap.data, pkg);
  const repoRows: RankRow[] = repoUsage.map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: r.symbolCount,
    fileCount: r.files,
  }));

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
      </div>

      <div className={usage.coverage ? 'two-col two-col--wide' : ''}>
        <Section title="Usage over time">
          <TrendChart data={trend} series={[{ key: 'refs', label: 'References', color }]} />
        </Section>
        {usage.coverage ? (
          <Section title="Coverage">
            <CoverageDonut used={usage.coverage.used} total={usage.coverage.totalExported} color={color} />
            <p className="muted" style={{ textAlign: 'center' }}>
              {usage.coverage.totalExported - usage.coverage.used} exported symbols unused across the org
            </p>
          </Section>
        ) : null}
      </div>

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
            onSelect={name => navigate(`/symbol/${pkgSlug(pkg)}/${encodeURIComponent(name)}`)}
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
          onSelect={repo => navigate(`/repo/${repo}`)}
        />
      </Section>
    </div>
  );
}

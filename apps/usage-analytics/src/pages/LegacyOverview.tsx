import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile, PackageCard } from '../components/cards';
import { TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, num } from '../lib/format';
import { legacyTrend, reposUsingLegacy } from '../lib/series';
import { packageColor, pkgSlug, shortName } from '../lib/packages';

const COMPONENT_TYPES = new Set(['component-lib', 'icons']);

const LEGACY_TREND_COLOR = 'var(--h-color-red-500)';

// Each row IS a repo; "repoCount" is repurposed to hold the number of distinct
// legacy packages that repo still uses, so relabel it rather than call it "Repos".
const REPO_ROW_COLUMNS: Array<RankColumn> = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
  { key: 'repoCount', label: 'Packages' },
];

export function LegacyOverview() {
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const navigate = useNavigate();

  const trend = useMemo(() => (index.data ? legacyTrend(index.data) : []), [index.data]);

  if (index.loading || snap.loading) return <Loading />;
  if (index.error) return <ErrorBox error={index.error} />;
  if (snap.error) return <ErrorBox error={snap.error} />;
  if (!index.data || !snap.data) return <ErrorBox error="No snapshots found." />;

  const snapshot = snap.data;
  const packages = Object.entries(snapshot.packages)
    .filter(([, p]) => p.legacy)
    .sort((a, b) => b[1].refCount - a[1].refCount);
  const stillActive = packages.filter(([, p]) => p.repoCount > 0).length;

  const repoUsage = reposUsingLegacy(snapshot);
  const repoRows: Array<RankRow> = repoUsage.map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: r.pkgCount,
    fileCount: r.files,
  }));

  const componentPackages = packages.filter(([, p]) => COMPONENT_TYPES.has(p.type));
  const componentRows: Array<RankRow> = componentPackages.flatMap(([pkg, usage]) =>
    Object.entries(usage.symbols).map(([name, s]) => ({
      name,
      refCount: s.refCount,
      repoCount: s.repoCount,
      fileCount: s.fileCount,
      color: packageColor(pkg),
      pkg,
    }))
  );
  const componentLegend = componentPackages.filter(([, p]) => p.repoCount > 0);

  return (
    <div>
      <PageHeader
        title="Legacy packages"
        subtitle={
          <>
            Predecessor packages from{' '}
            <a
              className="link"
              href="https://github.com/utilitywarehouse/icons"
              target="_blank"
              rel="noreferrer"
            >
              utilitywarehouse/icons
            </a>{' '}
            and{' '}
            <a
              className="link"
              href="https://github.com/utilitywarehouse/design-systems"
              target="_blank"
              rel="noreferrer"
            >
              utilitywarehouse/design-systems
            </a>
            , tracked here so we can watch adoption fall to zero as repos finish migrating to
            hearth — not to measure hearth adoption itself.
          </>
        }
      />

      <div className="tiles">
        <StatTile label="Repos still on legacy" value={num(repoRows.length)} />
        <StatTile label="Total references" value={compact(sumRefs(packages))} />
        <StatTile label="File imports" value={compact(totalFiles(packages))} />
        <StatTile label="Packages still active" value={`${stillActive} / ${packages.length}`} />
      </div>

      <Section title="Adoption over time" aside={<span className="muted">watch this go to zero</span>}>
        <TrendChart
          data={trend}
          series={[{ key: 'repos', label: 'Repos still on legacy', color: LEGACY_TREND_COLOR }]}
        />
      </Section>

      <Section title="Legacy packages" aside={<span className="muted">click a package for detail</span>}>
        <div className="pkg-grid">
          {packages.map(([name, usage]) => (
            <PackageCard key={name} name={name} usage={usage} />
          ))}
        </div>
      </Section>

      <div className="two-col">
        <Section title="Repositories still on legacy">
          <RankingTable
            rows={repoRows}
            unit="Repository"
            color={LEGACY_TREND_COLOR}
            columns={REPO_ROW_COLUMNS}
            onSelect={repo => void navigate(`/repo/${repo}`)}
          />
        </Section>
        <Section
          title="Components/icons still in use"
          aside={
            <span className="legend">
              {componentLegend.map(([pkg]) => (
                <span key={pkg} className="legend__item">
                  <span className="legend__dot" style={{ background: packageColor(pkg) }} />
                  {shortName(pkg)}
                </span>
              ))}
            </span>
          }
        >
          <RankingTable
            rows={componentRows}
            unit="Component / icon"
            color={LEGACY_TREND_COLOR}
            onSelect={(name, row) => void navigate(`/symbol/${pkgSlug(row.pkg!)}/${encodeURIComponent(name)}`)}
          />
        </Section>
      </div>

      <p className="muted footnote">
        Counts reflect direct dependents (declared in <code>package.json</code>) of the 8 legacy
        packages above; the hearth repo itself is excluded. A repo can appear both here and on the
        main Overview when mid-migration — {repoRows.length} repos still reference at least one
        legacy package.
      </p>
    </div>
  );
}

function sumRefs(packages: Array<[string, { refCount: number }]>): number {
  return packages.reduce((a, [, p]) => a + p.refCount, 0);
}
function totalFiles(packages: Array<[string, { fileCount: number }]>): number {
  return packages.reduce((a, [, p]) => a + p.fileCount, 0);
}

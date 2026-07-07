import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile, PackageCard } from '../components/cards';
import { TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, formatDate, num } from '../lib/format';
import { orgTrend } from '../lib/series';
import { packageColor, pkgSlug } from '../lib/packages';

const HEARTH_REACT = '@utilitywarehouse/hearth-react';

// Each row IS a repo; "repoCount" is repurposed to hold the number of distinct
// hearth packages that repo uses, so relabel it rather than call it "Repos".
const REPO_ROW_COLUMNS: RankColumn[] = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
  { key: 'repoCount', label: 'Packages' },
];

export function Overview() {
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const navigate = useNavigate();

  const orgData = useMemo(() => (index.data ? orgTrend(index.data) : []), [index.data]);

  if (index.loading || snap.loading) return <Loading />;
  if (index.error) return <ErrorBox error={index.error} />;
  if (snap.error) return <ErrorBox error={snap.error} />;
  if (!index.data || !snap.data) return <ErrorBox error="No snapshots found." />;

  const snapshot = snap.data;
  const packages = Object.entries(snapshot.packages).sort((a, b) => b[1].refCount - a[1].refCount);
  const inUse = packages.filter(([, p]) => p.repoCount > 0).length;

  // Repo -> usage count (sorted desc), the requested summary table.
  const repoRows: RankRow[] = Object.entries(snapshot.repos)
    .map(([repo, u]) => ({
      name: repo,
      refCount: u.totalRefs,
      repoCount: Object.keys(u.packages).length,
      fileCount: Object.values(u.packages).reduce((a, p) => a + p.fileCount, 0),
    }))
    .sort((a, b) => b.refCount - a.refCount);

  // Component -> usage count across the org (from hearth-react).
  const reactPkg = snapshot.packages[HEARTH_REACT];
  const componentRows: RankRow[] = reactPkg
    ? Object.entries(reactPkg.symbols).map(([name, s]) => ({
        name,
        refCount: s.refCount,
        repoCount: s.repoCount,
        fileCount: s.fileCount,
      }))
    : [];

  return (
    <div>
      <PageHeader
        title="Hearth usage across the org"
        subtitle={
          <>
            External adopters of <code>@utilitywarehouse/hearth-*</code> in the{' '}
            <code>utilitywarehouse</code> org. Snapshot {formatDate(snapshot.date)} · manifest v
            {snapshot.collection.manifestVersion} · {snapshot.collection.reposCloned} repos scanned
            {snapshot.collection.reposFailed ? ` · ${snapshot.collection.reposFailed} failed` : ''}.
          </>
        }
      />

      <div className="tiles">
        <StatTile label="Repos using hearth" value={num(Object.keys(snapshot.repos).length)} />
        <StatTile label="Total references" value={compact(snapshot.repos ? sumRefs(snapshot) : 0)} />
        <StatTile label="File imports" value={compact(totalFiles(snapshot))} />
        <StatTile label="Packages in use" value={`${inUse} / ${packages.length}`} />
      </div>

      <Section title="Adoption over time">
        <TrendChart
          data={orgData}
          series={[
            { key: 'repos', label: 'Repos using hearth', color: 'var(--h-color-blue-600)' },
          ]}
        />
      </Section>

      <Section title="Packages" aside={<span className="muted">click a package for detail</span>}>
        <div className="pkg-grid">
          {packages.map(([name, usage]) => (
            <PackageCard key={name} name={name} usage={usage} />
          ))}
        </div>
      </Section>

      <div className="two-col">
        <Section title="Repositories by usage">
          <RankingTable
            rows={repoRows}
            unit="Repository"
            color="var(--h-color-green-600)"
            columns={REPO_ROW_COLUMNS}
            onSelect={repo => navigate(`/repo/${repo}`)}
          />
        </Section>
        <Section
          title="Top components"
          aside={
            <a className="link" href={`#/package/${pkgSlug(HEARTH_REACT)}`}>
              hearth-react →
            </a>
          }
        >
          <RankingTable
            rows={componentRows}
            unit="Component"
            color={packageColor(HEARTH_REACT)}
            onSelect={name => navigate(`/symbol/${pkgSlug(HEARTH_REACT)}/${encodeURIComponent(name)}`)}
          />
        </Section>
      </div>

      <p className="muted footnote">
        Counts reflect direct dependents (declared in <code>package.json</code>); the hearth repo
        itself is excluded. Ranked by references — {repoRows.length} repos, showing{' '}
        {compact(componentRows.length)} distinct components. Repos with heavy monorepo usage inflate
        file/ref counts; repo counts show adoption breadth.
      </p>
    </div>
  );
}

function sumRefs(snapshot: { packages: Record<string, { refCount: number }> }): number {
  return Object.values(snapshot.packages).reduce((a, p) => a + p.refCount, 0);
}
function totalFiles(snapshot: { packages: Record<string, { fileCount: number }> }): number {
  return Object.values(snapshot.packages).reduce((a, p) => a + p.fileCount, 0);
}

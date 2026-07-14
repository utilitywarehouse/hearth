import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile, PackageCard } from '../components/cards';
import { TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, formatDate, num, pct } from '../lib/format';
import { orgTrend, orgVersionHealth, reposBehindLatest, reposUsingHearth } from '../lib/series';
import { packageColor, pkgSlug, shortName } from '../lib/packages';

// Package types whose symbols are visual components a user drops into a UI —
// combining them gives one "what do people actually render" ranking.
const COMPONENT_TYPES = new Set(['component-lib', 'icons']);

// Each row IS a repo; "repoCount" is repurposed to hold the number of distinct
// hearth packages that repo uses, so relabel it rather than call it "Repos".
const REPO_ROW_COLUMNS: Array<RankColumn> = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
  { key: 'repoCount', label: 'Packages' },
];

// Rows here are repos; "refCount" holds count of outdated packages, "repoCount"
// holds total version-tracked packages in that repo — reuses RankingTable's
// generic column config rather than a bespoke table.
const REPO_BEHIND_COLUMNS: Array<RankColumn> = [
  { key: 'refCount', label: 'Outdated' },
  { key: 'repoCount', label: 'Tracked' },
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
  // Legacy predecessor packages get their own section/page (see LegacyOverview)
  // so they don't dilute "current hearth adoption" here.
  const packages = Object.entries(snapshot.packages)
    .filter(([, p]) => !p.legacy)
    .sort((a, b) => b[1].refCount - a[1].refCount);
  const inUse = packages.filter(([, p]) => p.repoCount > 0).length;

  // Repo -> hearth usage count (sorted desc), the requested summary table.
  const repoRows: Array<RankRow> = reposUsingHearth(snapshot).map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: r.pkgCount,
    fileCount: r.files,
  }));

  // Component -> usage count across the org, combined from every component
  // library AND icon package so one ranking answers "what's actually rendered".
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

  const versionHealth = orgVersionHealth(snapshot);
  const versionHealthTotal = versionHealth.onLatest + versionHealth.behind;
  const behindRows: Array<RankRow> = reposBehindLatest(snapshot).map(r => ({
    name: r.repo,
    refCount: r.outdatedCount,
    repoCount: r.trackedCount,
    fileCount: 0,
  }));

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
        <StatTile label="Repos using hearth" value={num(repoRows.length)} />
        <StatTile label="Total references" value={compact(sumRefs(packages))} />
        <StatTile label="File imports" value={compact(totalFiles(packages))} />
        <StatTile label="Packages in use" value={`${inUse} / ${packages.length}`} />
      </div>

      <Section title="Adoption over time">
        <TrendChart
          data={orgData}
          series={[{ key: 'repos', label: 'Repos using hearth', color: 'var(--h-color-blue-600)' }]}
        />
      </Section>

      <Section title="Packages" aside={<span className="muted">click a package for detail</span>}>
        <div className="pkg-grid">
          {packages.map(([name, usage]) => (
            <PackageCard key={name} name={name} usage={usage} />
          ))}
        </div>
      </Section>

      {versionHealthTotal > 0 ? (
        <Section
          title="Version health"
          aside={
            <span className="muted">
              {pct(versionHealth.onLatest, versionHealthTotal)} of tracked installs on the latest
              breaking version version
            </span>
          }
        >
          {behindRows.length ? (
            <RankingTable
              rows={behindRows}
              unit="Repository"
              color="var(--h-color-red-600)"
              columns={REPO_BEHIND_COLUMNS}
              onSelect={repo => void navigate(`/repo/${repo}`)}
            />
          ) : (
            <p className="muted">
              Every tracked repo is on the latest breaking version of every package it uses.
            </p>
          )}
        </Section>
      ) : null}

      <div className="two-col">
        <Section title="Repositories by usage">
          <RankingTable
            rows={repoRows}
            unit="Repository"
            color="var(--h-color-green-600)"
            columns={REPO_ROW_COLUMNS}
            onSelect={repo => void navigate(`/repo/${repo}`)}
          />
        </Section>
        <Section
          title="Top components"
          aside={
            <span className="legend">
              {componentLegend.map(([pkg]) => (
                <span key={pkg} className="legend__item">
                  <span className="legend__dot" style={{ background: packageColor(pkg) }} />
                  {shortName(pkg).replace('hearth-', '')}
                </span>
              ))}
            </span>
          }
        >
          <RankingTable
            rows={componentRows}
            unit="Component / icon"
            color={packageColor('@utilitywarehouse/hearth-react')}
            onSelect={(name, row) =>
              void navigate(`/symbol/${pkgSlug(row.pkg!)}/${encodeURIComponent(name)}`)
            }
          />
        </Section>
      </div>

      <p className="muted footnote">
        Counts reflect direct dependents (declared in <code>package.json</code>); the hearth repo
        itself is excluded. Ranked by references — {repoRows.length} repos, showing{' '}
        {compact(componentRows.length)} distinct components/icons across {componentLegend.length}{' '}
        packages. Repos with heavy monorepo usage inflate file/ref counts; repo counts show adoption
        breadth.
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

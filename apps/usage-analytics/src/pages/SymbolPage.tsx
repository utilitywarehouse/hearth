import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIndex, useSnapshot, useAllSnapshots, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile } from '../components/cards';
import { TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, num } from '../lib/format';
import { reposUsingSymbol, symbolTrend } from '../lib/series';
import { packageColor, pkgFromSlug, shortName } from '../lib/packages';

// Each row here IS a repo, so a "repos" column is meaningless — show files + refs.
const REPO_COLUMNS: RankColumn[] = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
];

export function SymbolPage() {
  const { slug = '', symbol = '' } = useParams();
  const pkg = pkgFromSlug(slug);
  const name = decodeURIComponent(symbol);
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const all = useAllSnapshots(index.data);
  const navigate = useNavigate();

  const trend = useMemo(
    () => (all.data ? symbolTrend(all.data, pkg, name) : []),
    [all.data, pkg, name]
  );

  if (index.loading || snap.loading) return <Loading />;
  if (!snap.data) return <ErrorBox error="No snapshot found." />;

  const usage = snap.data.packages[pkg]?.symbols[name];
  const repos = reposUsingSymbol(snap.data, pkg, name);
  const color = packageColor(pkg);

  const repoRows: RankRow[] = repos.map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: 1,
    fileCount: r.files,
  }));

  return (
    <div>
      <PageHeader
        title={name}
        subtitle={
          <>
            in{' '}
            <a className="link" href={`#/package/${slug}`}>
              {shortName(pkg)}
            </a>
          </>
        }
      />

      <div className="tiles">
        <StatTile label="References" value={compact(usage?.refCount ?? 0)} />
        <StatTile label="Repos" value={num(usage?.repoCount ?? 0)} />
        <StatTile label="Files" value={compact(usage?.fileCount ?? 0)} />
      </div>

      <Section title="Usage over time">
        <TrendChart data={trend} series={[{ key: 'refs', label: `${name} references`, color }]} />
      </Section>

      <Section title="Repositories using it">
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

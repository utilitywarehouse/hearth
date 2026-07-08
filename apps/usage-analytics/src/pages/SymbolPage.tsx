import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIndex, useSnapshot, useAllSnapshots, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile } from '../components/cards';
import { TrendChart } from '../components/charts';
import { RankingTable, type RankColumn, type RankRow } from '../components/RankingTable';
import { compact, num } from '../lib/format';
import { propsForSymbol, reposUsingSymbol, symbolTrend } from '../lib/series';
import { packageColor, pkgFromSlug, shortName } from '../lib/packages';

// Each row here IS a repo, so a "repos" column is meaningless — show files + refs.
const REPO_COLUMNS: Array<RankColumn> = [
  { key: 'refCount', label: 'Refs' },
  { key: 'fileCount', label: 'Files' },
];

// Each row here IS a prop name — "Times passed" is the only meaningful count.
const PROP_COLUMNS: Array<RankColumn> = [{ key: 'refCount', label: 'Times passed' }];

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
  if (index.error) return <ErrorBox error={index.error} />;
  if (snap.error) return <ErrorBox error={snap.error} />;
  if (!snap.data) return <ErrorBox error="No snapshot found." />;

  const usage = snap.data.packages[pkg]?.symbols[name];
  const repos = reposUsingSymbol(snap.data, pkg, name);
  const props = propsForSymbol(snap.data, pkg, name);
  const color = packageColor(pkg);

  const repoRows: Array<RankRow> = repos.map(r => ({
    name: r.repo,
    refCount: r.refs,
    repoCount: 1,
    fileCount: r.files,
  }));

  const propRows: Array<RankRow> = props.map(p => ({
    name: p.name,
    refCount: p.count,
    repoCount: 0,
    fileCount: 0,
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

      {propRows.length > 0 ? (
        <Section title="Props used">
          <RankingTable rows={propRows} unit="Prop" color={color} columns={PROP_COLUMNS} />
        </Section>
      ) : null}

      <Section title="Repositories using it">
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

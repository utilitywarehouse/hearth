import { useNavigate, useParams } from 'react-router-dom';
import { useIndex, useSnapshot, latestDate } from '../data/hooks';
import { ErrorBox, Loading, PageHeader, Section } from '../components/ui';
import { StatTile } from '../components/cards';
import { RankingTable, type RankRow } from '../components/RankingTable';
import { compact, num, repoLabel } from '../lib/format';
import { packageColor, pkgSlug, shortName } from '../lib/packages';

export function RepoPage() {
  const params = useParams();
  const fullName = params['*'] ?? '';
  const index = useIndex();
  const date = latestDate(index.data);
  const snap = useSnapshot(date);
  const navigate = useNavigate();

  if (index.loading || snap.loading) return <Loading />;
  if (snap.error) return <ErrorBox error={snap.error} />;
  if (!snap.data) return <ErrorBox error="No snapshot found." />;

  const repo = snap.data.repos[fullName];
  if (!repo) return <ErrorBox error={`No hearth usage recorded for ${fullName}`} />;

  const pkgEntries = Object.entries(repo.packages).sort((a, b) => b[1].refCount - a[1].refCount);
  const totalFiles = pkgEntries.reduce((a, [, p]) => a + p.fileCount, 0);

  return (
    <div>
      <PageHeader
        title={repoLabel(fullName)}
        subtitle={
          <>
            <a className="link" href={`https://github.com/${fullName}`} target="_blank" rel="noreferrer">
              {fullName} ↗
            </a>{' '}
            · {pkgEntries.length} hearth packages · commit{' '}
            <code>{repo.clonedSha.slice(0, 7)}</code>
          </>
        }
      />

      <div className="tiles">
        <StatTile label="Packages used" value={num(pkgEntries.length)} />
        <StatTile label="File imports" value={compact(totalFiles)} />
        <StatTile label="Total references" value={compact(repo.totalRefs)} />
      </div>

      {pkgEntries.map(([pkg, u]) => {
        const rows: RankRow[] = Object.entries(u.symbols).map(([name, refs]) => ({
          name,
          refCount: refs,
          repoCount: 1,
          fileCount: 0,
        }));
        return (
          <Section
            key={pkg}
            title={shortName(pkg)}
            aside={
              <span className="muted">
                {compact(u.refCount)} refs · {u.fileCount} files
              </span>
            }
          >
            {rows.length ? (
              <RankingTable
                rows={rows}
                unit="Symbol"
                color={packageColor(pkg)}
                onSelect={name =>
                  navigate(`/symbol/${pkgSlug(pkg)}/${encodeURIComponent(name)}`)
                }
              />
            ) : (
              <p className="muted">Imported at the package level (no tracked symbols).</p>
            )}
          </Section>
        );
      })}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Card } from '@utilitywarehouse/hearth-react';
import type { PackageUsage } from '../data/types';
import { compact, num } from '../lib/format';
import { packageColor, pkgSlug, shortName, TYPE_LABELS } from '../lib/packages';

export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="tile" variant="subtle">
      <span className="tile__label">{label}</span>
      <span className="tile__value">{value}</span>
      {hint ? <span className="tile__hint muted">{hint}</span> : null}
    </Card>
  );
}

export function PackageCard({ name, usage }: { name: string; usage: PackageUsage }) {
  const color = packageColor(name);
  const unused = usage.repoCount === 0;
  return (
    <Link to={`/package/${pkgSlug(name)}`} className={`pkg-card ${unused ? 'is-empty' : ''}`}>
      <span className="pkg-card__accent" style={{ background: color }} />
      <span className="pkg-card__type">{TYPE_LABELS[usage.type]}</span>
      <span className="pkg-card__name">{shortName(name)}</span>
      <span className="pkg-card__stats">
        <span>
          <strong>{num(usage.repoCount)}</strong> repos
        </span>
        <span>
          <strong>{compact(usage.fileCount)}</strong> files
        </span>
        <span>
          <strong>{compact(usage.refCount)}</strong> refs
        </span>
      </span>
      {usage.coverage ? (
        <span className="pkg-card__coverage muted">
          {usage.coverage.used}/{usage.coverage.totalExported} exports used
        </span>
      ) : null}
    </Link>
  );
}

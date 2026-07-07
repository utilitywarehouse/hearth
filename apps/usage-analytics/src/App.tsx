import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useIndex, latestDate } from './data/hooks';
import { Overview } from './pages/Overview';
import { PackagePage } from './pages/PackagePage';
import { RepoPage } from './pages/RepoPage';
import { SymbolPage } from './pages/SymbolPage';
import { packageColor, pkgSlug, shortName } from './lib/packages';
import { compact } from './lib/format';

function Sidebar() {
  const index = useIndex();
  const date = latestDate(index.data);
  const entry = index.data?.snapshots.find(s => s.date === date);
  const packages = entry
    ? Object.entries(entry.packages).sort((a, b) => b[1].refCount - a[1].refCount)
    : [];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark" aria-hidden />
        <div>
          <div className="brand__title">Hearth</div>
          <div className="brand__sub">Usage analytics</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" end className="nav__link">
          Overview
        </NavLink>
        <div className="nav__section">Packages</div>
        {packages.map(([name, totals]) => (
          <NavLink key={name} to={`/package/${pkgSlug(name)}`} className="nav__link nav__link--pkg">
            <span className="nav__dot" style={{ background: packageColor(name) }} />
            <span className="nav__pkgname">{shortName(name).replace('hearth-', '')}</span>
            <span className="nav__count">{compact(totals.refCount)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__foot muted">
        {date ? `Latest: ${date}` : 'No data yet'}
        <br />
        Updated weekly
      </div>
    </aside>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/package/:slug" element={<PackagePage />} />
          <Route path="/symbol/:slug/:symbol" element={<SymbolPage />} />
          <Route path="/repo/*" element={<RepoPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

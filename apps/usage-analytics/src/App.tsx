import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import logo from '../../../shared/storybook/assets/logo.svg';
import { useIndex, latestDate } from './data/hooks';
import { Overview } from './pages/Overview';
import { LegacyOverview } from './pages/LegacyOverview';
import { PackagePage } from './pages/PackagePage';
import { RepoPage } from './pages/RepoPage';
import { SymbolPage } from './pages/SymbolPage';
import { packageColor, pkgSlug, shortName } from './lib/packages';
import { compact } from './lib/format';

function Sidebar() {
  const index = useIndex();
  const date = latestDate(index.data);
  const entry = index.data?.snapshots.find(s => s.date === date);
  const allPackages = entry
    ? Object.entries(entry.packages).sort((a, b) => b[1].refCount - a[1].refCount)
    : [];
  const packages = allPackages.filter(([, totals]) => !totals.legacy);
  const legacyPackages = allPackages.filter(([, totals]) => totals.legacy);

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={logo} alt="Hearth" className="brand__logo" />
        <div className="brand__sub">Usage analytics</div>
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

        {legacyPackages.length > 0 ? (
          <>
            <div className="nav__section">Legacy</div>
            <NavLink to="/legacy" className="nav__link">
              Legacy overview
            </NavLink>
            {legacyPackages.map(([name, totals]) => (
              <NavLink
                key={name}
                to={`/package/${pkgSlug(name)}`}
                className="nav__link nav__link--pkg"
              >
                <span className="nav__dot" style={{ background: packageColor(name) }} />
                <span className="nav__pkgname">{shortName(name)}</span>
                <span className="nav__count">{compact(totals.refCount)}</span>
              </NavLink>
            ))}
          </>
        ) : null}
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
          <Route path="/legacy" element={<LegacyOverview />} />
          <Route path="/package/:slug" element={<PackagePage />} />
          <Route path="/symbol/:slug/:symbol" element={<SymbolPage />} />
          <Route path="/repo/*" element={<RepoPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

/**
 * Build the per-package symbol allow-list from hearth's OWN exports in this
 * workspace. Run via `pnpm --filter usage-analytics gen:manifests`.
 *
 * The allow-list is the accuracy lever: when parsing downstream repos we only
 * count symbols that hearth actually exports, which drops typos / same-named
 * imports from other libraries, and lets us report coverage (used / exported).
 */
import fs from 'node:fs';
import path from 'node:path';
import { MANIFEST_FILE, PACKAGES, REPO_ROOT, type PackageType } from '../config.ts';
import { collectExportSurface } from './ast.ts';

export interface PackageManifest {
  type: PackageType;
  symbols: Array<string>;
  legacy: boolean;
  /** This package's own currently-published version, read from its package.json. Absent for legacy packages (no local source). */
  version?: string;
}

export interface SymbolManifest {
  /** Version of @utilitywarehouse/hearth-react — a proxy for the workspace version. */
  manifestVersion: string;
  generatedAt: string;
  packages: Record<string, PackageManifest>;
}

function readWorkspaceVersion(): string {
  return readPackageVersion('packages/react/package.json') ?? 'unknown';
}

/** Read the `version` field from a package.json relative to `REPO_ROOT`, or undefined if unreadable. */
function readPackageVersion(relativePath: string): string | undefined {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, relativePath), 'utf8')) as {
      version?: unknown;
    };
    return typeof pkg.version === 'string' ? pkg.version : undefined;
  } catch {
    return undefined;
  }
}

export function buildManifest(): SymbolManifest {
  const packages: Record<string, PackageManifest> = {};

  for (const pkg of PACKAGES) {
    const version = pkg.localPackageJson ? readPackageVersion(pkg.localPackageJson) : undefined;

    if (pkg.manifest.kind === 'none') {
      packages[pkg.name] = { type: pkg.type, symbols: [], legacy: pkg.legacy ?? false, version };
      continue;
    }
    const abs = path.join(REPO_ROOT, pkg.manifest.file);
    let symbols: Array<string> = [];
    if (fs.existsSync(abs)) {
      symbols = collectExportSurface(abs).sort();
    } else {
      console.warn(`  ! ${pkg.manifest.file} not found for ${pkg.name} (build packages first?)`);
    }
    packages[pkg.name] = { type: pkg.type, symbols, legacy: pkg.legacy ?? false, version };
    console.log(`  ${pkg.name}: ${symbols.length} symbols${version ? ` (v${version})` : ''}`);
  }

  return {
    manifestVersion: readWorkspaceVersion(),
    generatedAt: new Date().toISOString(),
    packages,
  };
}

function main() {
  console.log('Building hearth symbol manifests…');
  const manifest = buildManifest();
  fs.mkdirSync(path.dirname(MANIFEST_FILE), { recursive: true });
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nWrote ${MANIFEST_FILE} (version ${manifest.manifestVersion})`);
}

// Run only when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { countEntries, isVersion, parseChangelog, selectReleases } from './changelog.js';
import { formatChanges } from './changes-output.js';
import {
  EXIT,
  UsageError,
  stringFlag,
  type CommandGroup,
  type Io,
  type Values,
} from './command-group.js';
import { formatNotFound } from './output.js';
import { suggestSimilar } from './suggest.js';

const SCOPE = '@utilitywarehouse/hearth-';

/** Every published Hearth package, by short name. Each one's changelog is `packages/<short name>/CHANGELOG.md`. */
export const PACKAGES = [
  'cli',
  'codemod',
  'css-reset',
  'fonts',
  'json-assets',
  'react',
  'react-icons',
  'react-native',
  'react-native-icons',
  'svg-assets',
  'svg-icons',
  'tokens',
];

const REGISTRY = 'https://registry.npmjs.org';
const CHANGELOGS = 'https://raw.githubusercontent.com/utilitywarehouse/hearth/main/packages';
const TIMEOUT_MS = 15_000;

const USAGE = `  hearth changes <package> [--from <version>] [--to <version>] [--json]
`;

/** A fetch that failed; the message says what could not be read and why. */
class FetchError extends Error {}

/** The version installed in `cwd`'s `node_modules` or a parent's, the way Node resolves packages. */
const installedVersion = (name: string, cwd: string): string | undefined => {
  for (let dir = cwd; ; dir = dirname(dir)) {
    const path = join(dir, 'node_modules', ...name.split('/'), 'package.json');
    if (existsSync(path)) {
      try {
        const { version } = JSON.parse(readFileSync(path, 'utf8')) as { version?: unknown };
        // build metadata (`1.2.3+abc`) does not affect precedence
        const base = typeof version === 'string' ? version.split('+')[0] : undefined;
        return base !== undefined && isVersion(base) ? base : undefined;
      } catch {
        return undefined;
      }
    }
    if (dirname(dir) === dir) return undefined;
  }
};

const describe = (error: unknown) => {
  const { name, message, cause } = error as Error & { cause?: { code?: string } };
  return name === 'TimeoutError' ? `no answer in ${TIMEOUT_MS / 1000}s` : (cause?.code ?? message);
};

const fetchText = async (io: Io, url: string, what: string): Promise<string> => {
  const { host } = new URL(url);
  let response: Response;
  try {
    response = await (io.fetch ?? fetch)(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (error) {
    throw new FetchError(`Could not reach ${host} for ${what} (${describe(error)}).`);
  }
  if (response.ok) {
    try {
      return await response.text();
    } catch (error) {
      throw new FetchError(
        `Could not read the response from ${host} for ${what} (${describe(error)}).`
      );
    }
  }
  const reason =
    response.status === 403 || response.status === 429
      ? 'refused or rate-limited'
      : response.status === 404
        ? 'not found'
        : 'failed';
  throw new FetchError(`${host} ${reason} for ${what} (HTTP ${response.status}).`);
};

const latestVersion = async (io: Io, name: string) => {
  const body = await fetchText(
    io,
    `${REGISTRY}/${name.replace('/', '%2F')}/latest`,
    `the latest version of ${name}`
  );
  let version: unknown;
  try {
    ({ version } = JSON.parse(body) as { version?: unknown });
  } catch {
    // an HTML page from a proxy or captive portal
  }
  if (typeof version !== 'string' || !isVersion(version)) {
    throw new FetchError(`${new URL(REGISTRY).host} gave no usable latest version for ${name}.`);
  }
  return version;
};

const NETWORK_HINT =
  'hearth changes reads the latest version from registry.npmjs.org (unless --to is given) and the changelog from raw.githubusercontent.com. If you are offline, rate-limited or in a sandbox, allow those hosts or run it again where they can be reached.\n';

const changes = async (
  name: string,
  short: string,
  from: string,
  toFlag: string | undefined,
  values: Values,
  io: Io
) => {
  let to: string;
  let markdown: string;
  try {
    [to, markdown] = await Promise.all([
      toFlag ?? latestVersion(io, name),
      fetchText(io, `${CHANGELOGS}/${short}/CHANGELOG.md`, `the ${name} changelog`),
    ]);
  } catch (error) {
    if (!(error instanceof FetchError)) throw error;
    io.stderr(`${error.message} ${NETWORK_HINT}`);
    return EXIT.unavailable;
  }
  const releases = selectReleases(parseChangelog(markdown), from, to);
  const counts = countEntries(releases);
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: { name, version: from }, from, to, counts, versions: releases }, null, 2)}\n`
      : formatChanges({ name, from, to, counts, releases })
  );
  return EXIT.ok;
};

const versionFlag = (values: Values, flag: 'from' | 'to') => {
  const value = stringFlag(values, flag);
  if (value !== undefined && !isVersion(value)) {
    throw new UsageError(`--${flag} must be a version such as 0.37.0, not "${value}"`);
  }
  return value;
};

export const changesCommand: CommandGroup = {
  name: 'changes',
  usage: USAGE,
  options: {
    json: { type: 'boolean' },
    from: { type: 'string' },
    to: { type: 'string' },
  },
  run: ([requested, extra], values, io) => {
    if (requested === undefined) {
      throw new UsageError('hearth changes needs a package, for example "hearth changes react"');
    }
    if (extra !== undefined) throw new UsageError(`Unexpected argument "${extra}"`);
    const fromFlag = versionFlag(values, 'from');
    const toFlag = versionFlag(values, 'to');
    const short = requested.startsWith(SCOPE) ? requested.slice(SCOPE.length) : requested;
    if (!PACKAGES.includes(short)) {
      io.stderr(
        formatNotFound(`No Hearth package "${requested}"`, suggestSimilar(short, PACKAGES))
      );
      return EXIT.notFound;
    }
    const name = `${SCOPE}${short}`;
    const from = fromFlag ?? installedVersion(name, io.cwd);
    if (from === undefined) {
      io.stderr(
        `${name} is not installed in this project (or its version could not be read), so there is no version to compare from. Pass the version to start from, for example "hearth changes ${short} --from 0.30.0".\n`
      );
      return EXIT.unavailable;
    }
    return changes(name, short, from, toFlag, values, io);
  },
};

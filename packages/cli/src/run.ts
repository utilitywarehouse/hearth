import { parseArgs } from 'node:util';
import pkg from '../package.json' with { type: 'json' };
import {
  formatGroup,
  formatNotFound,
  formatToken,
  formatTokens,
  formatUnavailable,
} from './output.js';
import { resolveManifest } from './resolve-manifest.js';
import {
  DEFAULT_LIMIT,
  getToken,
  listTokens,
  searchTokens,
  type Layer,
  type Platform,
} from './tokens.js';

export type Io = {
  cwd: string;
  stdout: (text: string) => void;
  stderr: (text: string) => void;
};

export const EXIT = { ok: 0, notFound: 1, usage: 2, unavailable: 3 } as const;

const TOKENS_PACKAGE = '@utilitywarehouse/hearth-tokens';

const PLATFORMS: ReadonlyArray<Platform> = ['web', 'native'];
const LAYERS: ReadonlyArray<Layer> = ['semantic', 'primitive', 'component'];

const USAGE = `Usage:
  hearth tokens search <query> [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
  hearth tokens list [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
  hearth tokens get <path> [--platform web|native] [--json]

Options:
  --help       Show this help
  --version    Show the CLI version
`;

class UsageError extends Error {}

const oneOf = <T extends string>(
  flag: string,
  value: string | undefined,
  allowed: ReadonlyArray<T>,
  fallback: T
): T => {
  if (value === undefined) return fallback;
  const match = allowed.find(candidate => candidate === value);
  if (!match)
    throw new UsageError(`${flag} must be ${allowed.map(item => `"${item}"`).join(' or ')}`);
  return match;
};

type ListValues = {
  layer?: string;
  type?: string;
  platform?: string;
  limit?: string;
  json?: boolean;
};

/** `search` when given a query, `list` when not. */
const searchCommand = (query: string | undefined, values: ListValues, io: Io) => {
  const platform = oneOf('--platform', values.platform, PLATFORMS, 'web');
  const layer = oneOf('--layer', values.layer, LAYERS, 'semantic');
  const limit = values.limit === undefined ? DEFAULT_LIMIT : Number(values.limit);
  if (!Number.isInteger(limit) || limit < 0) {
    throw new UsageError('--limit must be a non-negative whole number');
  }
  const resolved = resolveManifest(TOKENS_PACKAGE, io.cwd, 'tokens');
  if (resolved.status !== 'ok') {
    io.stderr(formatUnavailable(resolved));
    return EXIT.unavailable;
  }
  const { type } = values;
  const options = { layer, platform, limit, ...(type !== undefined ? { type } : {}) };
  const { tokens, total } =
    query === undefined
      ? listTokens(resolved.manifest, options)
      : searchTokens(resolved.manifest, { ...options, query });
  const { package: info } = resolved.manifest;
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, platform, layer, ...(type !== undefined ? { type } : {}), total, tokens }, null, 2)}\n`
      : formatTokens(info, tokens, total)
  );
  return total === 0 ? EXIT.notFound : EXIT.ok;
};

const getCommand = (path: string, values: { platform?: string; json?: boolean }, io: Io) => {
  const platform = oneOf('--platform', values.platform, PLATFORMS, 'web');
  const resolved = resolveManifest(TOKENS_PACKAGE, io.cwd, 'tokens');
  if (resolved.status !== 'ok') {
    io.stderr(formatUnavailable(resolved));
    return EXIT.unavailable;
  }
  const result = getToken(resolved.manifest, path, { platform });
  if (result.status === 'not-found') {
    io.stderr(formatNotFound(result.path, result.suggestions));
    return EXIT.notFound;
  }
  const { package: info } = resolved.manifest;
  const [json, human] =
    result.status === 'found'
      ? [{ token: result.token }, formatToken([result.token])]
      : [{ path: result.path, tokens: result.tokens }, formatGroup(result.tokens)];
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, platform, ...json }, null, 2)}\n`
      : `${info.name} ${info.version}\n\n${human}\n`
  );
  return EXIT.ok;
};

export const run = (argv: Array<string>, io: Io): number => {
  if (argv.includes('--version')) {
    io.stdout(`${pkg.version}\n`);
    return EXIT.ok;
  }
  if (argv.includes('--help')) {
    io.stdout(USAGE);
    return EXIT.ok;
  }
  try {
    const { positionals, values } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        json: { type: 'boolean' },
        layer: { type: 'string' },
        type: { type: 'string' },
        platform: { type: 'string' },
        limit: { type: 'string' },
      },
    });
    const [command, subcommand, query, extra] = positionals;
    const takesQuery = subcommand === 'search' || subcommand === 'get';
    const surplus = takesQuery ? extra : query;
    if (command === 'tokens' && (takesQuery || subcommand === 'list') && surplus !== undefined) {
      throw new UsageError(`Unexpected argument "${surplus}"`);
    }
    if (command === 'tokens' && subcommand === 'list') {
      return searchCommand(undefined, values, io);
    }
    if (command === 'tokens' && subcommand === 'search' && query !== undefined) {
      return searchCommand(query, values, io);
    }
    if (command === 'tokens' && subcommand === 'get' && query !== undefined) {
      for (const flag of ['layer', 'limit', 'type'] as const) {
        if (values[flag] !== undefined) {
          throw new UsageError(`--${flag} is only valid for "tokens search" and "tokens list"`);
        }
      }
      return getCommand(query, values, io);
    }
    io.stderr(`Unknown command "${argv[0]}"\n\n${USAGE}`);
    return EXIT.usage;
  } catch (error) {
    if (error instanceof UsageError) {
      io.stderr(`${error.message}\n\n${USAGE}`);
      return EXIT.usage;
    }
    if ((error as NodeJS.ErrnoException).code?.startsWith('ERR_PARSE_ARGS')) {
      // parseArgs appends a hint about `--` that does not apply to this CLI
      io.stderr(`${(error as Error).message.split('. ')[0]}\n\n${USAGE}`);
      return EXIT.usage;
    }
    throw error;
  }
};

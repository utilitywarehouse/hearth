import {
  EXIT,
  UsageError,
  oneOf,
  parseLimit,
  stringFlag,
  type CommandGroup,
  type Io,
  type Values,
} from './command-group.js';
import { formatNotFound, formatUnavailable, header } from './output.js';
import { resolveManifest } from './resolve-manifest.js';
import {
  DEFAULT_LIMIT,
  getToken,
  listTokens,
  searchTokens,
  type Layer,
  type Platform,
} from './tokens.js';
import { formatGroup, formatToken, formatTokens } from './tokens-output.js';

const TOKENS_PACKAGE = '@utilitywarehouse/hearth-tokens';

const PLATFORMS: ReadonlyArray<Platform> = ['web', 'native'];
const LAYERS: ReadonlyArray<Layer> = ['semantic', 'primitive', 'component'];

const USAGE = `  hearth tokens search <query> [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
  hearth tokens list [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
  hearth tokens get <path> [--platform web|native] [--json]
`;

/** `search` when given a query, `list` when not. */
const searchCommand = (query: string | undefined, values: Values, io: Io) => {
  const platform = oneOf('--platform', stringFlag(values, 'platform'), PLATFORMS, 'web');
  const layer = oneOf('--layer', stringFlag(values, 'layer'), LAYERS, 'semantic');
  const limit = parseLimit(stringFlag(values, 'limit'), DEFAULT_LIMIT);
  const resolved = resolveManifest(TOKENS_PACKAGE, io.cwd, 'tokens');
  if (resolved.status !== 'ok') {
    io.stderr(formatUnavailable(resolved));
    return EXIT.unavailable;
  }
  const type = stringFlag(values, 'type');
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

const getCommand = (path: string, values: Values, io: Io) => {
  const platform = oneOf('--platform', stringFlag(values, 'platform'), PLATFORMS, 'web');
  const resolved = resolveManifest(TOKENS_PACKAGE, io.cwd, 'tokens');
  if (resolved.status !== 'ok') {
    io.stderr(formatUnavailable(resolved));
    return EXIT.unavailable;
  }
  const result = getToken(resolved.manifest, path, { platform });
  if (result.status === 'not-found') {
    io.stderr(formatNotFound(`No token at "${result.path}"`, result.suggestions));
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
      : `${header(info)}\n\n${human}\n`
  );
  return EXIT.ok;
};

export const tokensCommand: CommandGroup = {
  name: 'tokens',
  usage: USAGE,
  options: {
    json: { type: 'boolean' },
    layer: { type: 'string' },
    type: { type: 'string' },
    platform: { type: 'string' },
    limit: { type: 'string' },
  },
  run: ([subcommand, query, extra], values, io) => {
    const takesQuery = subcommand === 'search' || subcommand === 'get';
    const surplus = takesQuery ? extra : query;
    if ((takesQuery || subcommand === 'list') && surplus !== undefined) {
      throw new UsageError(`Unexpected argument "${surplus}"`);
    }
    if (subcommand === 'list') return searchCommand(undefined, values, io);
    if (subcommand === 'search' && query !== undefined) return searchCommand(query, values, io);
    if (subcommand === 'get' && query !== undefined) {
      for (const flag of ['layer', 'limit', 'type'] as const) {
        if (values[flag] !== undefined) {
          throw new UsageError(`--${flag} is only valid for "tokens search" and "tokens list"`);
        }
      }
      return getCommand(query, values, io);
    }
    return undefined;
  },
};

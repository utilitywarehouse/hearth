import { dirname } from 'node:path';
import { ASSET_KINDS, type AssetEntry, type AssetKind } from './asset-kinds.js';
import { DEFAULT_LIMIT, getAsset, listAssets, searchAssets } from './assets.js';
import { formatAsset, formatAssets } from './assets-output.js';
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
import { formatNotFound, formatUnavailable } from './output.js';
import { readAsset } from './read-asset.js';

const usageFor = ({ name, categories }: AssetKind) => {
  const category = `[--category ${categories.join('|')}]`;
  return [
    `  hearth assets ${name} search <query> ${category} [--limit <n>] [--json]`,
    `  hearth assets ${name} list ${category} [--limit <n>] [--json]`,
    `  hearth assets ${name} get <name> [--print] [--json]`,
  ].join('\n');
};

const USAGE = `${ASSET_KINDS.map(usageFor).join('\n')}\n`;

/** The manifest of the kind's package, or the message for why there is none. */
const resolve = (kind: AssetKind, io: Io) => {
  const resolved = kind.resolve(io.cwd);
  if (resolved.status === 'ok') return resolved;
  io.stderr(formatUnavailable(resolved));
  return undefined;
};

/** `search` when given a query, `list` when not. */
const searchCommand = (kind: AssetKind, query: string | undefined, values: Values, io: Io) => {
  const categoryFlag = stringFlag(values, 'category');
  const category =
    categoryFlag === undefined
      ? undefined
      : oneOf('--category', categoryFlag, kind.categories, kind.categories[0]);
  const limit = parseLimit(stringFlag(values, 'limit'), DEFAULT_LIMIT);
  const resolved = resolve(kind, io);
  if (!resolved) return EXIT.unavailable;
  const { manifest } = resolved;
  const options = { limit, ...(category !== undefined ? { category } : {}) };
  const { assets, total } =
    query === undefined
      ? listAssets(manifest.entries, options)
      : searchAssets(manifest.entries, { ...options, query });
  const { package: info } = manifest;
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, kind: kind.name, ...(category !== undefined ? { category } : {}), total, assets }, null, 2)}\n`
      : formatAssets(info, assets, total, query)
  );
  return total === 0 ? EXIT.notFound : EXIT.ok;
};

/** The raw file from the installed package, unless it is too big to print. */
const printCommand = (asset: AssetEntry, packageDir: string, io: Io) => {
  const result = readAsset(packageDir, asset.file);
  switch (result.status) {
    case 'ok':
      io.stdout(result.content);
      return EXIT.ok;
    case 'too-large':
      io.stderr(
        `${asset.name} is ${result.bytes} bytes, too big to print: the --print limit is ${result.limit}. Read it from ${result.path}.\n`
      );
      return EXIT.notFound;
    case 'outside-package':
      io.stderr(`${asset.name} lists "${result.file}", which is outside the package.\n`);
      return EXIT.unavailable;
    case 'missing':
      io.stderr(
        `${asset.name} lists ${asset.file}, which is missing from the installed package (${result.path}).\n`
      );
      return EXIT.unavailable;
  }
};

const getCommand = (kind: AssetKind, name: string, values: Values, io: Io) => {
  const resolved = resolve(kind, io);
  if (!resolved) return EXIT.unavailable;
  const { manifest, path: manifestPath } = resolved;
  const result = getAsset(manifest.entries, name);
  if (result.status === 'not-found') {
    io.stderr(formatNotFound(`No ${kind.name} asset named "${result.name}"`, result.suggestions));
    return EXIT.notFound;
  }
  if (values.print) return printCommand(result.asset, dirname(manifestPath), io);
  const { package: info } = manifest;
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, kind: kind.name, asset: result.asset }, null, 2)}\n`
      : formatAsset(info, result.asset)
  );
  return EXIT.ok;
};

export const assetsCommand: CommandGroup = {
  name: 'assets',
  usage: USAGE,
  options: {
    json: { type: 'boolean' },
    category: { type: 'string' },
    limit: { type: 'string' },
    print: { type: 'boolean' },
  },
  run: ([kindName, subcommand, query, extra], values, io) => {
    const kind = ASSET_KINDS.find(candidate => candidate.name === kindName);
    if (!kind) return undefined;
    const takesQuery = subcommand === 'search' || subcommand === 'get';
    const surplus = takesQuery ? extra : query;
    if ((takesQuery || subcommand === 'list') && surplus !== undefined) {
      throw new UsageError(`Unexpected argument "${surplus}"`);
    }
    if (values.print && (subcommand === 'list' || subcommand === 'search')) {
      throw new UsageError(`--print is only valid for "assets ${kind.name} get"`);
    }
    if (values.print && values.json) {
      throw new UsageError('--print cannot be combined with --json');
    }
    if (subcommand === 'list') return searchCommand(kind, undefined, values, io);
    if (subcommand === 'search' && query !== undefined) {
      return searchCommand(kind, query, values, io);
    }
    if (subcommand === 'get' && query !== undefined) {
      for (const flag of ['category', 'limit'] as const) {
        if (values[flag] !== undefined) {
          throw new UsageError(
            `--${flag} is only valid for "assets ${kind.name} search" and "assets ${kind.name} list"`
          );
        }
      }
      return getCommand(kind, query, values, io);
    }
    return undefined;
  },
};

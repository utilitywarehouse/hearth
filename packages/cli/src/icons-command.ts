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
import { DEFAULT_LIMIT, getIcon, listIcons, searchIcons, type IconSize } from './icons.js';
import { formatIcon, formatIcons, formatNoIconsPackage, usageFor } from './icons-output.js';
import { formatNotFound, formatUnavailable } from './output.js';
import { resolveIconsManifest } from './resolve-icons.js';

const SIZES: ReadonlyArray<IconSize> = ['small', 'medium', 'large'];

const USAGE = `  hearth icons search <query> [--size small|medium|large] [--limit <n>] [--json]
  hearth icons list [--size small|medium|large] [--limit <n>] [--json]
  hearth icons get <name> [--json]
`;

/** The icons manifest of whichever icons package is installed, or the message for why there is none. */
const resolve = (io: Io) => {
  const resolved = resolveIconsManifest(io.cwd);
  if (resolved.status === 'ok') return resolved.manifest;
  io.stderr(
    resolved.status === 'none-installed'
      ? formatNoIconsPackage(resolved.packageNames)
      : formatUnavailable(resolved)
  );
  return undefined;
};

/** `search` when given a query, `list` when not. */
const searchCommand = (query: string | undefined, values: Values, io: Io) => {
  const sizeFlag = stringFlag(values, 'size');
  const size = sizeFlag === undefined ? undefined : oneOf('--size', sizeFlag, SIZES, 'medium');
  const limit = parseLimit(stringFlag(values, 'limit'), DEFAULT_LIMIT);
  const manifest = resolve(io);
  if (!manifest) return EXIT.unavailable;
  const options = { limit, ...(size !== undefined ? { size } : {}) };
  const { icons, total } =
    query === undefined
      ? listIcons(manifest, options)
      : searchIcons(manifest, { ...options, query });
  const { package: info, usage } = manifest;
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, platform: usage.platform, ...(size !== undefined ? { size } : {}), total, usage: { import: usage.import, example: usage.example }, icons }, null, 2)}\n`
      : formatIcons(info, icons, total, query)
  );
  return total === 0 ? EXIT.notFound : EXIT.ok;
};

const getCommand = (name: string, values: Values, io: Io) => {
  const manifest = resolve(io);
  if (!manifest) return EXIT.unavailable;
  const result = getIcon(manifest, name);
  if (result.status === 'not-found') {
    io.stderr(formatNotFound(`No icon named "${result.name}"`, result.suggestions));
    return EXIT.notFound;
  }
  const { package: info, usage } = manifest;
  io.stdout(
    values.json
      ? `${JSON.stringify({ package: info, platform: usage.platform, icon: result.icon, usage: usageFor(usage, result.icon) }, null, 2)}\n`
      : formatIcon(info, result.icon, usage)
  );
  return EXIT.ok;
};

export const iconsCommand: CommandGroup = {
  name: 'icons',
  usage: USAGE,
  options: {
    json: { type: 'boolean' },
    size: { type: 'string' },
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
      for (const flag of ['size', 'limit'] as const) {
        if (values[flag] !== undefined) {
          throw new UsageError(`--${flag} is only valid for "icons search" and "icons list"`);
        }
      }
      return getCommand(query, values, io);
    }
    return undefined;
  },
};

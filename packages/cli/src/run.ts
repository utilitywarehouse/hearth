import { parseArgs } from 'node:util';
import pkg from '../package.json' with { type: 'json' };
import { assetsCommand } from './assets-command.js';
import { EXIT, UsageError, type CommandGroup, type Io } from './command-group.js';
import { iconsCommand } from './icons-command.js';
import { tokensCommand } from './tokens-command.js';

export { EXIT, type Io };

/** Every top-level command. A new command group is a module plus an entry here. */
const GROUPS: ReadonlyArray<CommandGroup> = [tokensCommand, iconsCommand, assetsCommand];

const USAGE = `Usage:
${GROUPS.map(group => group.usage).join('')}
Options:
  --help       Show this help
  --version    Show the CLI version
`;

const ALL_OPTIONS = GROUPS.reduce<CommandGroup['options']>(
  (options, group) => ({ ...options, ...group.options }),
  {}
);

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
      options: ALL_OPTIONS,
    });
    const [command, ...args] = positionals;
    const group = GROUPS.find(candidate => candidate.name === command);
    if (group) {
      for (const flag of Object.keys(values)) {
        if (!(flag in group.options)) {
          throw new UsageError(`--${flag} is not valid for "${group.name}"`);
        }
      }
      const code = group.run(args, values, io);
      if (code !== undefined) return code;
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

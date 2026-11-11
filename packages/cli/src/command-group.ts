export type Io = {
  cwd: string;
  stdout: (text: string) => void;
  stderr: (text: string) => void;
};

export const EXIT = { ok: 0, notFound: 1, usage: 2, unavailable: 3 } as const;

/** A mistake in how the command was called; `run` reports it with the usage and exits 2. */
export class UsageError extends Error {}

/** What `parseArgs` returns for flags not known at compile time (the groups' options are merged at run time). */
export type Values = { [flag: string]: string | boolean | Array<string | boolean> | undefined };

/** A flag's value when it was given a value, `undefined` otherwise. */
export const stringFlag = (values: Values, flag: string): string | undefined => {
  const value = values[flag];
  return typeof value === 'string' ? value : undefined;
};

export const oneOf = <T extends string>(
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

export const parseLimit = (value: string | undefined, fallback: number): number => {
  const limit = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(limit) || limit < 0) {
    throw new UsageError('--limit must be a non-negative whole number');
  }
  return limit;
};

/** A top-level command (`hearth <name> ...`). Adding one is a new module plus an entry in `GROUPS` in `run.ts`. */
export type CommandGroup = {
  name: string;
  /** Lines for the usage text, each starting `  hearth <name> ...` and ending in a newline. */
  usage: string;
  /** The flags the group accepts; a flag given to a group that does not list it is a usage error. */
  options: { [flag: string]: { type: 'string' | 'boolean' } };
  /** `args` are the positionals after the command name. Returns `undefined` for a subcommand or arguments the group does not know. */
  run: (args: Array<string>, values: Values, io: Io) => number | undefined;
};

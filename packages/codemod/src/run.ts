import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, 'bin', 'jscodeshift.js');

export interface RunFlags {
  dry: boolean;
  print: boolean;
  force: boolean;
}

export interface RunArgv extends RunFlags {
  codemod: string;
  paths: Array<string>;
}

function stderrOf(error: unknown): string {
  const stderr = (error as { stderr?: Buffer | string }).stderr ?? '';
  return Buffer.isBuffer(stderr) ? stderr.toString('utf8') : stderr;
}

/** Checks the repository containing each target, not the CLI's own working directory. */
export function checkGitStatus(files: Array<string>, force: boolean): void {
  let clean = true;
  let errorMessage = 'Git directory is not clean';
  let gitError = '';
  const roots = new Set<string>();

  try {
    for (const file of files) {
      const cwd = statSync(file).isDirectory() ? file : path.dirname(file);
      try {
        roots.add(
          execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' }).trim()
        );
      } catch (error) {
        // a target outside any repository has nothing to protect
        if (!stderrOf(error).toLowerCase().includes('not a git repository')) {
          throw error;
        }
      }
    }
    for (const root of roots) {
      const output = execFileSync('git', ['status', '--porcelain'], {
        cwd: root,
        encoding: 'utf8',
      });
      if (output.trim() !== '') {
        clean = false;
      }
    }
  } catch (error) {
    // `execFileSync` can fail before git writes anything (e.g. git can't be spawned)
    clean = false;
    errorMessage = 'Unable to determine if git directory is clean';
    gitError = stderrOf(error).trim() || (error as Error).message;
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using @utilitywarehouse/hearth-codemod!');
      if (gitError) {
        console.log(`\n${errorMessage}: ${gitError}`);
      } else {
        console.log('\nBut before we continue, please stash or commit your git changes.');
      }
      console.log('\nYou may use the --force flag to override this safety check.');
      process.exit(1);
    }
  }
}

export function runJscodeshiftTransform(
  codemod: string,
  files: Array<string>,
  flags: RunFlags
): void {
  const transformsDirectory = path.resolve(__dirname, '..', 'src', 'transforms');
  const transformPath = path.resolve(transformsDirectory, `${codemod}.ts`);
  const relativePath = path.relative(transformsDirectory, transformPath);

  // Only bundled codemods may run: reject absolute or `..` names that resolve outside the
  // transforms directory, and anything under the test directories
  if (
    relativePath.startsWith('..') ||
    path.isAbsolute(relativePath) ||
    /__test(s|fixtures)__/.test(relativePath)
  ) {
    throw new Error(
      `Codemod '${codemod}' not found. See README.md for a list of available codemods.`
    );
  }

  if (!existsSync(transformPath)) {
    throw new Error(
      `Codemod '${codemod}' not found. See README.md for a list of available codemods.`
    );
  }

  // `.ts` files may contain `<T>value` assertions, which only parse without JSX enabled, while
  // `.tsx`/`.js`/`.jsx` need the `tsx` parser. Directories are walked by both passes; explicit
  // files go to the pass matching their extension
  const isTsFile = (file: string): boolean => path.extname(file) === '.ts';
  const isDirectory = (file: string): boolean => statSync(file).isDirectory();
  const passes = [
    { parser: 'ts', extensions: 'ts', targets: files.filter(f => isDirectory(f) || isTsFile(f)) },
    {
      parser: 'tsx',
      extensions: 'tsx,js,jsx',
      targets: files.filter(f => isDirectory(f) || !isTsFile(f)),
    },
  ];

  for (const { parser, extensions, targets } of passes) {
    if (targets.length === 0) {
      continue;
    }

    const args = [
      // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
      jscodeshiftExecutable,
      '--transform',
      transformPath,
      '--extensions',
      extensions,
      '--parser',
      parser,
      '--ignore-pattern',
      '**/node_modules/**',
      // jscodeshift exits 0 when a file fails to parse unless told otherwise
      '--fail-on-error',
    ];

    if (flags.dry) {
      args.push('--dry');
    }
    if (flags.print) {
      args.push('--print');
    }

    args.push(...targets);

    console.log(`Executing command: jscodeshift ${args.join(' ')}`);
    const result = spawnSync('node', args, { stdio: 'inherit' });

    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      // `status` is null when the child was killed by a signal
      process.exitCode = result.status ?? 1;
    }
  }
}

export function run(argv: RunArgv): void {
  const { codemod, paths, force, ...flags } = argv;
  const files = paths.map(filePath => path.resolve(filePath));

  const missing = files.filter(file => !existsSync(file));
  if (missing.length > 0) {
    console.error(`Path not found: ${missing.join(', ')}`);
    process.exit(1);
  }

  if (!flags.dry) {
    checkGitStatus(files, force);
  }

  runJscodeshiftTransform(codemod, files, { force, ...flags });
}

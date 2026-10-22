import { execSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
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

export function checkGitStatus(force: boolean): void {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  let gitError = '';
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    clean = output.trim() === '';
    errorMessage = 'Git directory is not clean';
  } catch (error) {
    const stderr = (error as { stderr?: Buffer | string }).stderr ?? '';
    const stderrText = Buffer.isBuffer(stderr) ? stderr.toString('utf8') : stderr;
    if (stderrText.toLowerCase().includes('not a git repository')) {
      clean = true;
    } else {
      // `execSync` can fail before git writes anything (e.g. git can't be spawned)
      gitError = stderrText.trim() || (error as Error).message;
    }
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

  const args = [
    // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
    jscodeshiftExecutable,
    '--transform',
    transformPath,
    '--extensions',
    'ts,tsx,js,jsx',
    '--parser',
    'tsx',
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

  args.push(...files);

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

export function run(argv: RunArgv): void {
  const { codemod, paths, force, ...flags } = argv;
  const files = paths.map(filePath => path.resolve(filePath));

  const missing = files.filter(file => !existsSync(file));
  if (missing.length > 0) {
    console.error(`Path not found: ${missing.join(', ')}`);
    process.exit(1);
  }

  if (!flags.dry) {
    checkGitStatus(force);
  }

  runJscodeshiftTransform(codemod, files, { force, ...flags });
}

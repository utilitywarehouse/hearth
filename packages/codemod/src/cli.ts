#!/usr/bin/env node
import { execSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, 'bin', 'jscodeshift.js');

interface RunFlags {
  dry: boolean;
  print: boolean;
  force: boolean;
  jscodeshift?: string;
}

interface RunArgv extends RunFlags {
  codemod: string;
  paths: Array<string>;
}

function checkGitStatus(force: boolean): void {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    clean = output.trim() === '';
    errorMessage = 'Git directory is not clean';
  } catch (error) {
    const stderr = (error as { stderr?: Buffer | string }).stderr ?? '';
    const stderrText = Buffer.isBuffer(stderr) ? stderr.toString('utf8') : stderr;
    if (stderrText.toLowerCase().includes('not a git repository')) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using @utilitywarehouse/hearth-codemod!');
      console.log('\nBut before we continue, please stash or commit your git changes.');
      console.log('\nYou may use the --force flag to override this safety check.');
      process.exit(1);
    }
  }
}

function runJscodeshiftTransform(codemod: string, files: Array<string>, flags: RunFlags): void {
  const transformPath = path.resolve(__dirname, '..', 'src', 'transforms', `${codemod}.ts`);

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
  ];

  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
  }
  if (flags.jscodeshift) {
    args.push(flags.jscodeshift);
  }

  args.push(...files);

  console.log(`Executing command: jscodeshift ${args.join(' ')}`);
  const result = spawnSync('node', args, { stdio: 'inherit' });

  if (result.error) {
    throw result.error;
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    process.exitCode = result.status;
  }
}

function run(argv: RunArgv): void {
  const { codemod, paths, force, ...flags } = argv;
  const files = paths.map(filePath => path.resolve(filePath));

  if (!flags.dry) {
    checkGitStatus(force);
  }

  runJscodeshiftTransform(codemod, files, { force, ...flags });
}

void yargs(hideBin(process.argv))
  .command<RunArgv>({
    command: '$0 <codemod> <paths...>',
    describe: 'Applies a `@utilitywarehouse/hearth-codemod` to the specified paths',
    builder: command =>
      command
        .positional('codemod', {
          description: 'The name of the codemod, e.g. react/v1/remove-modal-loading-text',
          type: 'string',
          demandOption: true,
        })
        .positional('paths', {
          array: true,
          description: 'Paths forwarded to `jscodeshift`',
          type: 'string',
          demandOption: true,
        })
        .option('dry', {
          description: 'Dry run (no changes are made to files)',
          default: false,
          type: 'boolean',
        })
        .option('force', {
          description: 'Bypass Git safety checks and forcibly run codemods',
          default: false,
          type: 'boolean',
        })
        .option('print', {
          description: 'Print transformed files to stdout, useful for development',
          default: false,
          type: 'boolean',
        }),
    handler: run,
  })
  .scriptName('npx @utilitywarehouse/hearth-codemod')
  .example(
    '$0 react/v1/remove-modal-loading-text src',
    "Remove Modal's deprecated loadingText prop"
  )
  .help()
  .parse();

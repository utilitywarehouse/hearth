#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run, type RunArgv } from './run';

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
  .strict()
  .scriptName('npx @utilitywarehouse/hearth-codemod')
  .example(
    '$0 react/v1/remove-modal-loading-text src',
    "Remove Modal's deprecated loadingText prop"
  )
  .help()
  .parse();

# Sandbox and fresh-worktree gotchas

Failures you hit when running commands in the agent sandbox or in a new worktree. When one blocks you, stop and ask the user to run the command outside the sandbox.

## Node version

`.nvmrc` pins Node 24; a non-interactive shell can default to an older Node (the agent sandbox defaults to Node 18), where `tsc` crashes. Run `source ~/.nvm/nvm.sh && nvm use` in the same command, and check `node -v` before reporting a typecheck or test result.

## npm cache `EPERM`

- `npx` fails with an npm cache `EPERM`. Call the local binary directly instead, for example `node_modules/.bin/eslint`.
- `npm pack` fails the same way, so `pnpm check:manifests` (its `--tarball` step) can't run. Ask the user to run it.

## Fresh worktree

- A fresh worktree has no `node_modules` or build output. Ask the user to run `nvm use && pnpm install`, then build the workspace packages the touched package imports (`pnpm --filter <package> build`) before running its tests. A `TS2307` or `ERR_MODULE_NOT_FOUND` on a `@utilitywarehouse/hearth-*` import means an unbuilt package, not a code bug.
- Adding a workspace package needs `pnpm install` to link it, and `pnpm install` aborts in the sandbox (it wants to purge `node_modules` without a TTY). Ask the user to run `nvm use && pnpm install`.
- A workspace package such as `packages/manifest` can have no `node_modules/.bin`. Run the root binaries from the package directory, for example `../../node_modules/.bin/vitest`.

## Git

Every git command prints `unable to access '~/.gitignore'`. The warning is harmless: read git stderr unfiltered. Writes to the shared `.git/config` (`git branch -m`, `--set-upstream-to`) or to `.claude/skills` (branch switches) can fail. Ask the user to run the blocked write.

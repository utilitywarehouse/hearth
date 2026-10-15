---
name: create-codemod
description: "Use when: adding a new codemod to packages/codemod for a breaking change in Hearth React or Hearth React Native. Covers writing a jscodeshift transform, fixture tests, registering it in a version's composed migration, and documenting it in the version's migration docs page."
metadata:
  author: Utility Warehouse
  tags: codemod, jscodeshift, migration, breaking-change, packages/codemod
---

# Creating a codemod

## Overview

`@utilitywarehouse/hearth-codemod` (`packages/codemod`) ships codemods that
apply Hearth breaking changes to consumer code deterministically, instead of
via hand-editing or an LLM. Write a codemod any time you land a breaking
change in `hearth-react` (or, in future, `hearth-react-native`) that consumers
need to update usages for — a prop removal, a rename, a restructured API.

This skill was written using the `react/v1/remove-modal-loading-text` codemod
(removing `Modal`'s deprecated `loadingText` prop) as the worked example —
read the files under `packages/codemod/src/transforms/react/v1/` alongside
this skill.

## Where things live

```
packages/codemod/src/
  cli.ts                              # yargs CLI — do not touch for a new codemod
  transforms/
    react/
      v1/
        migration.ts                  # composed: runs every react/v1/* transform
        <your-transform>.ts
        __tests__/
          <your-transform>.test.ts
        __testfixtures__/
          <your-transform>.input.tsx
          <your-transform>.output.tsx
```

Transforms are nested `<package>/<version>/<name>.ts` — `package` is the
Hearth package the change belongs to (`react`, and eventually
`react-native`), `version` is the upcoming major version the breaking change
is heading towards (currently `v1`).

Transforms are plain `.ts` files, not compiled — jscodeshift loads them
directly via its own `@babel/register`-based transform loader (it advertises
first-class TypeScript transform support). Only `cli.ts` is built (with
`tsup`) to produce the published `hearth-codemod` binary.

## Writing the transform

A transform is a function with the signature
`(file: FileInfo, api: API) => string`, exported as the default export:

```ts
import type { API, FileInfo, JSXAttribute } from 'jscodeshift';

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  // ...find and mutate JSX nodes on `root`...

  return root.toSource({ quote: 'single' });
}

export default transformer;
```

Guidelines, taken from `remove-modal-loading-text.ts`:

- **Gate on the import source.** Only transform JSX elements imported from
  `@utilitywarehouse/hearth-react` (check `root.find(j.ImportDeclaration)`
  for the source and `ImportSpecifier` for the imported name), so the codemod
  doesn't touch unrelated same-named components.
- **Use `root.findJSXElements('ComponentName')`** to locate usages, then
  inspect `element.node.openingElement.attributes` for the prop(s) you care
  about.
- **Preserve the leading-comment attachment.** If the transform might modify
  or delete the first node in the file, save its `.comments` before making
  changes and reattach them afterwards if the first node identity changed —
  see the `getFirstNode()` / reattach pattern in `remove-modal-loading-text.ts`.
  Without this, a leading file comment can get silently dropped.
- **Prefer a rename over a blind removal** when there's a direct replacement
  prop — e.g. `loadingText` becomes `loadingHeading` via
  `attribute.name = j.jsxIdentifier('newName')` when no conflicting prop is
  already present, and is simply filtered out when one is.
- **Loosely-typed jscodeshift internals** (e.g. `NodePath#get(...).node`
  resolving to `any`) are expected — cast to a small local interface capturing
  only the fields you use, rather than disabling type-checking broadly.

## Writing fixture tests

Add `__testfixtures__/<name>.input.tsx` and `<name>.output.tsx`, then a test
using the shared `runTransformFixtureTest` helper from `src/test-utils.ts`:

```ts
import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../<your-transform>';

describe('<your-transform>', () => {
  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, '<your-transform>');
  });
});
```

**Don't hand-guess the `.output.tsx` formatting.** jscodeshift's underlying
printer (`recast`) preserves the original source layout for untouched nodes
but reprints modified nodes with its own formatting — this does not
necessarily match Prettier's output. Run the transform for real first (e.g.
via the CLI's `--dry --print` flags against a scratch file, or by running the
test once and reading the diff in the failure output) and copy the actual
output into the fixture, rather than authoring it by hand.

`__testfixtures__/**` is excluded from both linting and formatting
(`eslint.config.js` and `.prettierignore` at the repo root) — fixture content
must stay byte-for-byte what the transform actually produces, not what a
formatter would prefer.

## Registering it in the version's migration

Add your transform to that version's composed `migration.ts` so it runs as
part of "the complete vX migration":

```ts
import type { API, FileInfo } from 'jscodeshift';
import yourTransform from './your-transform';

function transformer(file: FileInfo, api: API): string {
  file.source = yourTransform(file, api);
  return file.source;
}

export default transformer;
```

Chain it after any transforms it depends on (e.g. a rename that must happen
before a later restructuring reads the renamed prop).

## Documenting it

Add a row to the relevant `packages/react/docs/migration/vX.docs.mdx` page
under "Individual codemods": the codemod's invocation, and a before/after
`diff` snippet. See `docs/migration/v1.docs.mdx` for the existing format.

Also add an entry to `packages/codemod/README.md`'s "Available codemods"
table.

## Verifying end-to-end

Don't rely on the fixture test alone — it exercises the transform function
directly, not the CLI's argument parsing, git-clean check, or process
spawning:

```sh
pnpm --dir packages/codemod run build
pnpm --dir packages/codemod run test
node packages/codemod/dist/cli.js <package>/<version>/<your-transform> --dry --print <scratch-file>
```

## Changeset

The breaking change itself needs a changeset for `@utilitywarehouse/hearth-react`
(see the `add-changeset` skill) pointing consumers at the codemod command. The
codemod addition itself does not need its own changeset unless it's the first
release of `packages/codemod` or otherwise changes its published behaviour.

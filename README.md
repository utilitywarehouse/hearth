# hearth

## Prerequisites

You need to have `pnpm` installed ([see docs](https://pnpm.io/installation#using-npm)) and NPM token set up locally ([see docs](https://wiki.uw.systems/posts/npm-tokens-16f6l31h)).

## Developing React library

Install everything in the root of the repo:

```console
pnpm install
```

You then need to build all the libraries so that internal dependencies will be
found:

```console
pnpm build
```

The following command will then run the React Storybook and build the React
library in watch mode:

```console
pnpm dev:react
```

### Code formatting

We are running linting checks on every PR. If on your PR `Code Checks / Code Checks (push)` is failing, format code by using this command in your package root:

 ```console
pnpm format
```

### Deploying changes
The libraries are deployed by semi-automatic script that creates the release based on Changesets merged into `main`.

Run following command and include the output files in the PR:
```console
pnpm changeset
```
Once the changeset is merged into `main`, the GH Action will run that will create a PR for release (or add your changes to existing PR, as sometimes we may want to wait for more work to release). Once that PR is merged, the release process will fire and new versions of the libs will be ready to use.

### Integration with Hearth Tokens

The `hearth-tokens` library is not marked as a dependency, instead we copy the
CSS tokens directly into the `hearth-react` library. If you need to include new
tokens changes you need to run the following command in the root of the repo:

```console
pnpm generate:tokens:react
```

You can then import any necessary CSS files in your CSS, and the root `build`
command will include it in the global `styles.css` output.

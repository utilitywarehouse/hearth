[![Lint](https://github.com/utilitywarehouse/hearth/actions/workflows/lint.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/lint.yml)
[![Build](https://github.com/utilitywarehouse/hearth/actions/workflows/build.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/build.yml)
[![Build Storybook](https://github.com/utilitywarehouse/hearth/actions/workflows/build-storybook.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/build-storybook.yml)
[![Figma Code Connect publish](https://github.com/utilitywarehouse/hearth/actions/workflows/figma-code-connect.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/figma-code-connect.yml)
[![Release](https://github.com/utilitywarehouse/hearth/actions/workflows/release.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/release.yml)
[![Docker Build & Push](https://github.com/utilitywarehouse/hearth/actions/workflows/storybook-docker.yml/badge.svg)](https://github.com/utilitywarehouse/hearth/actions/workflows/storybook-docker.yml)


# Hearth - Utility Warehouse Design Systems

Hearth is a set of systems for designing and building coherent, scalable and
accessible UIs across all our platforms. Hearth provides a shared visual
language and a single source of truth so teams can build with confidence.

## Prerequisites

You need to have `npm` & [`nvm`](https://github.com/nvm-sh/nvm) installed.

### Setting up the project

Run the following commands in your terminal to set the correct Node version, set
up `pnpm`, install dependencies and build the libraries:

```console
nvm use
npm run setup
```

If at any time you need to do a refresh of the dependencies, you can run:

```console
pnpm refresh
```

This will clean all the package dependencies, reinstall them and rebuild the
libraries.

## Developing React library

You need to have installed everything in the root of the repo, and built all the
libraries so that internal dependencies will be found.

The following command will then run the React Storybook and build the React
library in watch mode:

```console
pnpm dev:react
```

## Developing React Native library

You need to have installed everything in the root of the repo, and built all the
libraries so that internal dependencies will be found.

The following command will then run the React Native Storybook:

```console
pnpm dev:react-native
```

If you want to run the Storybook app on a native device, you need to run the following command:

```console
pnpm dev:react-native:prebuild
```

For iOS:
```console
pnpm dev:react-native:ios
```

For Android:
```console
pnpm dev:react-native:android
```

### Code formatting

We are running linting checks on every PR. If on your PR `Code Checks / Code Checks (push)`
is failing, format code by using this command in your package root:

```console
pnpm format
```

And/or this command in your package:

```console
pnpm lint:fix
```

To run all checks use the following command:

```console
pnpm check
```

### Deploying changes

The libraries are deployed by semi-automatic script that creates the release
based on Changesets merged into `main`.

Run following command and include the output files in the PR:

```console
pnpm changeset
```

Once the changeset is merged into `main`, GitHub Actions will run that will
create a PR for release (or add your changes to existing PR, as sometimes we may
want to wait for more work to release). Once that PR is merged, the release
process will fire and new versions of the libs will be ready to use.

### Integration with Hearth Tokens

The `hearth-tokens` library is not marked as a dependency, instead we copy the
CSS tokens directly into the `hearth-react` library. If you need to include new
tokens changes you need to run the following command in the root of the repo:

```console
pnpm generate:tokens:react
```

You can then import any necessary CSS files in your CSS, and the root `build`
command will include it in the global `styles.css` output.

## AI Skills

Internal AI skills are available in `.agents/skills`, this is symlinked to both
`.claude/skills` and `.github/skills`.

The `hearth-react` SKILL.md is within the `react` package.

# hearth

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

### Integration with Hearth Tokens

The `hearth-tokens` library is not marked as a dependency, instead we copy the
CSS tokens directly into the `hearth-react` library. If you need to include new
tokens changes you need to run the following command in the root of the repo:

```console
pnpm generate:tokens:react
```

You can then import any necessary CSS files in your CSS, and the root `build`
command will include it in the global `styles.css` output.

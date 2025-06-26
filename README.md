# hearth

## Developing React library

Before you start developing the React library, if you are making any changes to
the underlying CSS tokens, you will need to change the `hearth-tokens`
dependency in the React `package.json`. This will ensure you pull in your changes,
rather than sticking to what is in the pinned release.

```diff
- "@utilitywarehouse/hearth-tokens": "0.0.4",
+ "@utilitywarehouse/hearth-tokens": "workspace:*",
```

Please make sure you revert this change before merging your work into main!

Now, install everything in the root of the repo:

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

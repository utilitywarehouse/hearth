# Storybook Assets

A Storybook app to browse and download assets from `@utilitywarehouse/hearth-svg-assets` & `@utilitywarehouse/hearth-json-assets`.

## Generate

Run the following from the root to re-generate the asset lists and stories:

```console
pnpm generate:storybook:assets
```

This will read `packages/svg-assets/manifest.json` and `packages/json-assets/manifest.json` and generate:

- `utils/svg-assets.ts` – imports and lists all assets with name, path, and bundled src
- `utils/json-assets.ts` – imports and lists all JSON assets with name, path, and bundled src
- `stories/{SVG,JSON}/*.stories.ts` – individual story per asset

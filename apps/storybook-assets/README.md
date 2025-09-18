# Storybook Assets

A Storybook app to browse and download SVG assets from `@utilitywarehouse/hearth-svg-assets`.

- Search and preview assets
- Download individual SVGs
- Docs on installation and usage

## Scripts

- `pnpm dev` – start Storybook on port 6010
- `pnpm generate` – generate utils and stories from the svg-assets manifest
- `pnpm build:storybook` – build a static Storybook

## Codegen

This app reads `packages/svg-assets/manifest.json` and generates:
- `utils/svg-assets.ts` – imports and lists all assets with name, path, and bundled src
- `utils/assets.ts` – lightweight metadata list
- `stories/IndividualAssets/*.stories.ts` – one story per asset
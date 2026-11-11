import { z } from 'zod';

export const SCHEMA_VERSION = 2;

const tokenValue = z.union([z.string(), z.number()]);

const tokenEntry = z
  .object({
    path: z.string().min(1),
    layer: z.enum(['primitive', 'semantic', 'component']),
    type: z.string().min(1),
    // device-dependent tokens have one entry per device, each with its own value and surfaces
    device: z.enum(['mobile', 'tablet', 'desktop']).optional(),
    description: z.string().optional(),
    values: z.object({ default: tokenValue, dark: tokenValue.optional() }),
    alias: z.object({ default: z.string(), dark: z.string().optional() }).optional(),
    surfaces: z.object({
      // `value` is what the stylesheet declares (`8px`), which can differ from the JS value
      css: z.object({ variable: z.string(), value: z.string().optional() }).optional(),
      browser: z.object({ import: z.string(), path: z.string() }).optional(),
      js: z.object({ import: z.string(), path: z.string(), darkPath: z.string().optional() }),
    }),
  })
  .superRefine((entry, ctx) => {
    if (entry.values.dark !== undefined && entry.surfaces.js.darkPath === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['surfaces', 'js', 'darkPath'],
        message:
          'darkPath is required when a dark value is present (dark exists on the JS surface only)',
      });
    }
    if (entry.values.dark === undefined && entry.surfaces.js.darkPath !== undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['values', 'dark'],
        message: 'a dark value is required when darkPath is present',
      });
    }
  });

const header = {
  schemaVersion: z.literal(SCHEMA_VERSION),
  package: z.object({ name: z.string().min(1), version: z.string().min(1) }),
};

/** Flags a second entry with the same key; `describe` turns an entry into its unique key. */
const rejectDuplicates =
  <E>(describe: (entry: E) => string, field: string) =>
  (manifest: { entries: Array<E> }, ctx: z.RefinementCtx) => {
    const seen = new Set<string>();
    manifest.entries.forEach((entry, index) => {
      const key = describe(entry);
      if (seen.has(key)) {
        ctx.addIssue({
          code: 'custom',
          path: ['entries', index, field],
          message: `duplicate entry ${field} "${key}"`,
        });
      }
      seen.add(key);
    });
  };

const tokensManifest = z
  .object({ ...header, type: z.literal('tokens'), entries: z.array(tokenEntry) })
  .superRefine(
    rejectDuplicates<TokenEntry>(
      entry => (entry.device ? `${entry.path} (${entry.device})` : entry.path),
      'path'
    )
  );

const iconEntry = z.object({
  name: z.string().min(1),
  size: z.enum(['small', 'medium', 'large']),
  /** the SVG file in `@utilitywarehouse/hearth-svg-icons`, for example `add-small-icon.svg` */
  svg: z.string().min(1),
  /** the component exported by the React and React Native icon packages */
  component: z.string().min(1),
});

const iconsManifest = z
  .object({
    ...header,
    type: z.literal('icons'),
    // the same icon list ships in three packages; `usage` is how to use them from this one
    usage: z.object({
      platform: z.enum(['svg', 'react', 'react-native']),
      import: z.string().min(1),
      example: z.string().min(1),
    }),
    entries: z.array(iconEntry),
  })
  .superRefine(rejectDuplicates<IconEntry>(entry => entry.name, 'name'));

const svgAssetEntry = z.object({
  name: z.string().min(1),
  category: z.enum(['logo', 'mascot', 'spot', 'scene', 'technical', 'other']),
  /** the file path within the package, for example `lib/logo-full-purple.svg` */
  file: z.string().min(1),
  /** what to import to use the asset, for example `@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg` */
  import: z.string().min(1),
});

const svgAssetsManifest = z
  .object({ ...header, type: z.literal('svg-assets'), entries: z.array(svgAssetEntry) })
  .superRefine(rejectDuplicates<SvgAssetEntry>(entry => entry.name, 'name'));

/** Every manifest type this version can read. Add a type by adding a member here. */
export const manifestSchema = z.discriminatedUnion('type', [
  tokensManifest,
  iconsManifest,
  svgAssetsManifest,
]);

export const MANIFEST_TYPES = manifestSchema.options.map(option => option.shape.type.value);

// Cross-field rules (dark values, unique paths) are enforced by `validateManifest`
// and cannot be expressed in JSON Schema.
export const manifestJsonSchema = z.toJSONSchema(manifestSchema);

export type TokenEntry = z.infer<typeof tokenEntry>;
export type IconEntry = z.infer<typeof iconEntry>;
export type SvgAssetEntry = z.infer<typeof svgAssetEntry>;
export type SvgAssetsManifest = z.infer<typeof svgAssetsManifest>;
export type TokensManifest = z.infer<typeof tokensManifest>;
export type IconsManifest = z.infer<typeof iconsManifest>;
export type Manifest = z.infer<typeof manifestSchema>;

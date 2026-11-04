import { z } from 'zod';

export const SCHEMA_VERSION = 1;

const tokenValue = z.union([z.string(), z.number()]);

const tokenEntry = z
  .object({
    path: z.string().min(1),
    layer: z.enum(['primitive', 'semantic', 'component']),
    type: z.string().min(1),
    description: z.string().optional(),
    values: z.object({ default: tokenValue, dark: tokenValue.optional() }),
    alias: z.object({ default: z.string(), dark: z.string().optional() }).optional(),
    surfaces: z.object({
      css: z.object({ variable: z.string() }).optional(),
      browser: z.object({ import: z.string(), path: z.string() }).optional(),
      js: z.object({ import: z.string(), path: z.string(), darkPath: z.string().optional() }),
    }),
  })
  .superRefine((entry, ctx) => {
    if (entry.values.dark !== undefined && entry.surfaces.js.darkPath === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['surfaces', 'js', 'darkPath'],
        message: 'darkPath is required when a dark value is present (dark exists on the JS surface only)',
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

export const manifestSchema = z
  .object({
    schemaVersion: z.literal(SCHEMA_VERSION),
    package: z.object({ name: z.string().min(1), version: z.string().min(1) }),
    type: z.literal('tokens'),
    entries: z.array(tokenEntry),
  })
  .superRefine((manifest, ctx) => {
    const seen = new Set<string>();
    manifest.entries.forEach((entry, index) => {
      if (seen.has(entry.path)) {
        ctx.addIssue({
          code: 'custom',
          path: ['entries', index, 'path'],
          message: `duplicate entry path "${entry.path}"`,
        });
      }
      seen.add(entry.path);
    });
  });

// Cross-field rules (dark values, unique paths) are enforced by `validateManifest`
// and cannot be expressed in JSON Schema.
export const manifestJsonSchema = z.toJSONSchema(manifestSchema);

export type TokenEntry = z.infer<typeof tokenEntry>;
export type Manifest = z.infer<typeof manifestSchema>;

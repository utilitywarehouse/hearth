import { z } from 'zod';

/**
 * The shape of every `--json` output. Strict, so a key added or dropped fails a test: changing
 * the output is a decision, not a side effect. Keep in step with the README's `--json` section.
 */
const pkg = z.strictObject({ name: z.string(), version: z.string() });
const value = z.union([z.string(), z.number()]);
const device = z.enum(['mobile', 'tablet', 'desktop']);

const token = z.strictObject({
  path: z.string(),
  device: device.optional(),
  layer: z.enum(['primitive', 'semantic', 'component']),
  type: z.string(),
  description: z.string().optional(),
  values: z.strictObject({ default: value, dark: value.optional() }),
  alias: z.strictObject({ default: z.string(), dark: z.string().optional() }).optional(),
  css: z.strictObject({ variable: z.string() }).optional(),
  browser: z.strictObject({ import: z.string(), path: z.string() }).optional(),
  js: z
    .strictObject({ import: z.string(), path: z.string(), darkPath: z.string().optional() })
    .optional(),
});

const platform = z.enum(['web', 'native']);

const icon = z.strictObject({
  name: z.string(),
  size: z.enum(['small', 'medium', 'large']),
  svg: z.string(),
  component: z.string(),
});
const iconPlatform = z.enum(['svg', 'react', 'react-native']);
const iconUsage = z.strictObject({ import: z.string(), example: z.string() });

const svgAsset = z.strictObject({
  name: z.string(),
  category: z.enum(['logo', 'mascot', 'spot', 'scene', 'technical', 'other']),
  file: z.string(),
  import: z.string(),
});
const jsonAsset = z.strictObject({
  name: z.string(),
  category: z.enum(['spot', 'logo', 'other']),
  type: z.literal('animated'),
  file: z.string(),
  import: z.string(),
});

export const JSON_CONTRACT = {
  'tokens search/list': z.strictObject({
    package: pkg,
    platform,
    layer: z.enum(['primitive', 'semantic', 'component']),
    type: z.string().optional(),
    total: z.number().int(),
    tokens: z.array(token),
  }),
  'tokens get (one token)': z.strictObject({ package: pkg, platform, token }),
  'tokens get (a group)': z.strictObject({
    package: pkg,
    platform,
    path: z.string(),
    tokens: z.array(token),
  }),
  'icons search/list': z.strictObject({
    package: pkg,
    platform: iconPlatform,
    size: z.enum(['small', 'medium', 'large']).optional(),
    total: z.number().int(),
    usage: iconUsage,
    icons: z.array(icon),
  }),
  'icons get': z.strictObject({
    package: pkg,
    platform: iconPlatform,
    icon,
    usage: iconUsage,
  }),
  'assets svg search/list': z.strictObject({
    package: pkg,
    kind: z.literal('svg'),
    category: svgAsset.shape.category.optional(),
    total: z.number().int(),
    assets: z.array(svgAsset),
  }),
  'assets svg get': z.strictObject({ package: pkg, kind: z.literal('svg'), asset: svgAsset }),
  'assets json search/list': z.strictObject({
    package: pkg,
    kind: z.literal('json'),
    category: jsonAsset.shape.category.optional(),
    total: z.number().int(),
    assets: z.array(jsonAsset),
  }),
  'assets json get': z.strictObject({ package: pkg, kind: z.literal('json'), asset: jsonAsset }),
} as const;

export type ContractName = keyof typeof JSON_CONTRACT;

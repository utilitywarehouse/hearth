import { describe, expect, it } from 'vitest';
import { manifestJsonSchema, validateManifest } from '../index.js';

const validTokensManifest = {
  schemaVersion: 2,
  package: { name: '@utilitywarehouse/hearth-tokens', version: '0.4.8' },
  type: 'tokens',
  entries: [
    {
      path: 'semantic.background.brand',
      layer: 'semantic',
      type: 'color',
      values: { default: '#7a42c8', dark: '#442484' },
      alias: { default: 'color.purple.700', dark: 'color.purple.900' },
      surfaces: {
        css: { variable: '--h-background-brand' },
        browser: {
          import: '@utilitywarehouse/hearth-tokens/browser',
          path: 'semantic.background.brand',
        },
        js: {
          import: '@utilitywarehouse/hearth-tokens',
          path: 'semanticLight.background.brand',
          darkPath: 'semanticDark.background.brand',
        },
      },
    },
  ],
};

describe('validateManifest', () => {
  it('accepts a valid tokens manifest', () => {
    const result = validateManifest(validTokensManifest);

    expect(result.success).toBe(true);
  });

  // Characterisation of the structural schema: these hold by construction rather than driving new code.
  it('rejects a manifest with no schemaVersion', () => {
    const withoutVersion: Partial<typeof validTokensManifest> = { ...validTokensManifest };
    delete withoutVersion.schemaVersion;
    const result = validateManifest(withoutVersion);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/schemaVersion/);
  });

  it('rejects an unknown layer', () => {
    const [entry] = validTokensManifest.entries;
    const result = validateManifest({
      ...validTokensManifest,
      entries: [{ ...entry, layer: 'global' }],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/layer/);
  });

  it('rejects a dark value that has no JS dark path (dark exists on the JS surface only)', () => {
    const [entry] = validTokensManifest.entries;
    const result = validateManifest({
      ...validTokensManifest,
      entries: [
        {
          ...entry,
          surfaces: { ...entry.surfaces, js: { ...entry.surfaces.js, darkPath: undefined } },
        },
      ],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/darkPath/);
  });

  it('rejects a JS dark path that has no dark value', () => {
    const [entry] = validTokensManifest.entries;
    const result = validateManifest({
      ...validTokensManifest,
      entries: [{ ...entry, values: { default: '#7a42c8' } }],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/dark/);
  });

  it('rejects two entries with the same path', () => {
    const [entry] = validTokensManifest.entries;
    const result = validateManifest({ ...validTokensManifest, entries: [entry, entry] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/semantic\.background\.brand/);
  });
});

describe('device variants and CSS values', () => {
  const spacing = (device: string) => ({
    path: 'layout.spacing.md',
    layer: 'semantic',
    type: 'number',
    device,
    values: { default: 12 },
    surfaces: {
      css: { variable: `--h-spacing-md-${device}`, value: 'var(--h-space-150)' },
      js: { import: '@utilitywarehouse/hearth-tokens', path: `layout.${device}.spacing.md` },
    },
  });
  const withEntries = (entries: Array<unknown>) => ({ ...validTokensManifest, entries });

  it('accepts one entry per device for the same path', () => {
    const result = validateManifest(withEntries([spacing('mobile'), spacing('desktop')]));

    expect(result.success).toBe(true);
  });

  it('rejects two entries with the same path and device', () => {
    const result = validateManifest(withEntries([spacing('mobile'), spacing('mobile')]));

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/layout\.spacing\.md.*mobile/);
  });

  it('rejects an unknown device', () => {
    const result = validateManifest(withEntries([spacing('watch')]));

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/device/);
  });

  it('keeps the CSS value the stylesheet declares', () => {
    const result = validateManifest(withEntries([spacing('mobile')]));

    expect(result.success).toBe(true);
    if (result.success && result.manifest.type === 'tokens') {
      expect(result.manifest.entries[0].surfaces.css?.value).toBe('var(--h-space-150)');
    }
  });
});

const validIconsManifest = {
  schemaVersion: 2,
  package: { name: '@utilitywarehouse/hearth-react-icons', version: '0.10.0' },
  type: 'icons',
  usage: {
    platform: 'react',
    import: '@utilitywarehouse/hearth-react-icons',
    example: "import { {component} } from '@utilitywarehouse/hearth-react-icons';",
  },
  entries: [
    { name: 'AddSmallIcon', size: 'small', svg: 'add-small-icon.svg', component: 'AddSmallIcon' },
    {
      name: 'AddMediumIcon',
      size: 'medium',
      svg: 'add-medium-icon.svg',
      component: 'AddMediumIcon',
    },
  ],
};

describe('icons manifest', () => {
  it('accepts a valid icons manifest', () => {
    const result = validateManifest(validIconsManifest);

    expect(result.success).toBe(true);
  });

  it('still accepts a tokens manifest', () => {
    expect(validateManifest(validTokensManifest).success).toBe(true);
  });

  it('rejects a manifest with no usage block', () => {
    const withoutUsage: Partial<typeof validIconsManifest> = { ...validIconsManifest };
    delete withoutUsage.usage;
    const result = validateManifest(withoutUsage);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/usage/);
  });

  it('rejects an unknown platform', () => {
    const result = validateManifest({
      ...validIconsManifest,
      usage: { ...validIconsManifest.usage, platform: 'flutter' },
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/platform/);
  });

  it('rejects two icons with the same name', () => {
    const [entry] = validIconsManifest.entries;
    const result = validateManifest({ ...validIconsManifest, entries: [entry, entry] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/AddSmallIcon/);
  });

  it('rejects an unknown icon size', () => {
    const [entry] = validIconsManifest.entries;
    const result = validateManifest({
      ...validIconsManifest,
      entries: [{ ...entry, size: 'huge' }],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/size/);
  });
});

const validSvgAssetsManifest = {
  schemaVersion: 2,
  package: { name: '@utilitywarehouse/hearth-svg-assets', version: '0.6.7' },
  type: 'svg-assets',
  entries: [
    {
      name: 'LogoFullPurple',
      category: 'logo',
      file: 'lib/logo-full-purple.svg',
      import: '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg',
    },
    {
      name: 'SpotBill',
      category: 'spot',
      file: 'lib/spot-bill.svg',
      import: '@utilitywarehouse/hearth-svg-assets/lib/spot-bill.svg',
    },
  ],
};

describe('svg assets manifest', () => {
  it('accepts a valid svg assets manifest', () => {
    expect(validateManifest(validSvgAssetsManifest).success).toBe(true);
  });

  it('rejects two assets with the same name', () => {
    const [entry] = validSvgAssetsManifest.entries;
    const result = validateManifest({ ...validSvgAssetsManifest, entries: [entry, entry] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/LogoFullPurple/);
  });

  it('rejects an unknown category', () => {
    const [entry] = validSvgAssetsManifest.entries;
    const result = validateManifest({
      ...validSvgAssetsManifest,
      entries: [{ ...entry, category: 'banner' }],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/category/);
  });

  it('rejects an entry with no import path', () => {
    const [entry] = validSvgAssetsManifest.entries;
    const withoutImport: Partial<typeof entry> = { ...entry };
    delete withoutImport.import;
    const result = validateManifest({ ...validSvgAssetsManifest, entries: [withoutImport] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/import/);
  });
});

const validJsonAssetsManifest = {
  schemaVersion: 2,
  package: { name: '@utilitywarehouse/hearth-json-assets', version: '0.6.0' },
  type: 'json-assets',
  entries: [
    {
      name: 'AnimatedSpotAccountDark',
      category: 'spot',
      type: 'animated',
      file: 'lib/animated-spot-account-dark.json',
      import: '@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-dark.json',
    },
    {
      name: 'AnimatedUwMonoPurpleLight',
      category: 'logo',
      type: 'animated',
      file: 'lib/animated-uw-mono-purple-light.json',
      import: '@utilitywarehouse/hearth-json-assets/lib/animated-uw-mono-purple-light.json',
    },
  ],
};

describe('json assets manifest', () => {
  it('accepts a valid json assets manifest', () => {
    expect(validateManifest(validJsonAssetsManifest).success).toBe(true);
  });

  it('rejects two assets with the same name', () => {
    const [entry] = validJsonAssetsManifest.entries;
    const result = validateManifest({ ...validJsonAssetsManifest, entries: [entry, entry] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/AnimatedSpotAccountDark/);
  });

  it.each(['category', 'type'])('rejects an unknown %s', field => {
    const [entry] = validJsonAssetsManifest.entries;
    const result = validateManifest({
      ...validJsonAssetsManifest,
      entries: [{ ...entry, [field]: 'nope' }],
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(new RegExp(field));
  });

  it('rejects an entry with no file path', () => {
    const [entry] = validJsonAssetsManifest.entries;
    const withoutFile: Partial<typeof entry> = { ...entry };
    delete withoutFile.file;
    const result = validateManifest({ ...validJsonAssetsManifest, entries: [withoutFile] });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/file/);
  });
});

describe('unknown manifest types', () => {
  it('rejects a type this version does not know, naming it', () => {
    const result = validateManifest({ ...validIconsManifest, type: 'sounds' });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.join('\n')).toMatch(/sounds/);
  });
});

describe('manifestJsonSchema', () => {
  it('describes one shape per manifest type for package authors', () => {
    const variants = (manifestJsonSchema.oneOf ?? manifestJsonSchema.anyOf) as Array<{
      required: Array<string>;
      properties: { type: { const: string } };
    }>;

    expect(variants.map(variant => variant.properties.type.const)).toEqual([
      'tokens',
      'icons',
      'svg-assets',
      'json-assets',
    ]);
    for (const variant of variants) {
      expect(variant.required).toEqual(
        expect.arrayContaining(['schemaVersion', 'package', 'type', 'entries'])
      );
    }
  });
});

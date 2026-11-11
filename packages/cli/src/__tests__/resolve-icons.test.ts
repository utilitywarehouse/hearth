import { describe, expect, it } from 'vitest';
import { resolveIconsManifest } from '../resolve-icons.js';
import {
  ICON_PACKAGES,
  createConsumer,
  iconsManifest,
  installPackage,
} from './consumer-fixture.js';

describe('resolveIconsManifest', () => {
  it.each(['react', 'react-native', 'svg'] as const)('reads the %s icons package', platform => {
    const consumer = createConsumer();
    installPackage(consumer, ICON_PACKAGES[platform], iconsManifest(platform));

    const result = resolveIconsManifest(consumer);

    expect(result.status).toBe('ok');
    if (result.status === 'ok') expect(result.manifest.usage.platform).toBe(platform);
  });

  it('prefers react, then react-native, then svg, when several are installed', () => {
    const consumer = createConsumer();
    installPackage(consumer, ICON_PACKAGES.svg, iconsManifest('svg'));
    installPackage(consumer, ICON_PACKAGES['react-native'], iconsManifest('react-native'));

    const result = resolveIconsManifest(consumer);

    expect(result.status === 'ok' && result.manifest.usage.platform).toBe('react-native');
  });

  it('reports none-installed with every package it looked for', () => {
    expect(resolveIconsManifest(createConsumer())).toEqual({
      status: 'none-installed',
      packageNames: Object.values(ICON_PACKAGES),
    });
  });

  it('reports a package that ships no manifest rather than falling through to the next', () => {
    const consumer = createConsumer();
    installPackage(consumer, ICON_PACKAGES.react, undefined);
    installPackage(consumer, ICON_PACKAGES.svg, iconsManifest('svg'));

    expect(resolveIconsManifest(consumer)).toEqual({
      status: 'no-manifest',
      packageName: ICON_PACKAGES.react,
    });
  });

  it('reports an invalid manifest rather than falling through to the next package', () => {
    const consumer = createConsumer();
    installPackage(consumer, ICON_PACKAGES.react, '{"schemaVersion": 2,');
    installPackage(consumer, ICON_PACKAGES.svg, iconsManifest('svg'));

    expect(resolveIconsManifest(consumer).status).toBe('invalid');
  });
});

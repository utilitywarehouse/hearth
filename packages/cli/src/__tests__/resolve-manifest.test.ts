import { describe, expect, it } from 'vitest';
import { resolveManifest } from '../resolve-manifest.js';
import {
  TOKENS_PACKAGE,
  createConsumer,
  installPackage,
  tokensManifest,
} from './consumer-fixture.js';

describe('resolveManifest', () => {
  it('returns the validated manifest of a package installed in the consumer project', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest());

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({
      status: 'ok',
      manifest: { package: { name: TOKENS_PACKAGE, version: '1.2.3' } },
    });
  });

  it('reports a package that is not installed, naming it, instead of falling back to bundled data', () => {
    const consumer = createConsumer();

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({ status: 'not-installed', packageName: TOKENS_PACKAGE });
  });

  it('distinguishes an installed package that has no manifest from one that is not installed', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, undefined);

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({ status: 'no-manifest', packageName: TOKENS_PACKAGE });
  });

  it('reports the validation errors of a manifest that does not match the schema', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ entries: 'not-a-list' }));

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({
      status: 'invalid',
      packageName: TOKENS_PACKAGE,
      errors: [expect.stringContaining('entries')],
    });
  });

  it('reports a manifest from a newer schema than the CLI supports, rather than a validation failure', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ schemaVersion: 2 }));

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({
      status: 'unsupported-schema',
      packageName: TOKENS_PACKAGE,
      found: 2,
      supported: 1,
    });
  });

  it('reports a manifest that is not valid JSON as invalid, instead of throwing', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, '{"schemaVersion": 1,');

    const result = resolveManifest(TOKENS_PACKAGE, consumer);

    expect(result).toMatchObject({
      status: 'invalid',
      packageName: TOKENS_PACKAGE,
      errors: [expect.stringContaining('JSON')],
    });
  });
});

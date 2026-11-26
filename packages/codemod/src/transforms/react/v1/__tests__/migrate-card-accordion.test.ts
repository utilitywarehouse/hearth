import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migrate-card-accordion';

describe('migrate-card-accordion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-card-accordion');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-card-accordion-aliased-import');
  });

  it('transforms elements used through a namespace import', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-card-accordion-namespace-import');
  });

  it('warns about usages that need manual migration', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-card-accordion');

    const messages = warn.mock.calls.map(([message]) => String(message));
    expect(messages).toEqual([
      expect.stringMatching(/:13 <CardAccordion> has a non-literal `value`/),
      expect.stringMatching(/:14 <CardAccordion> `onValueChange` now receives/),
      expect.stringMatching(/:16 <CardAccordion> spreads props that may include `value`/),
    ]);
  });
});

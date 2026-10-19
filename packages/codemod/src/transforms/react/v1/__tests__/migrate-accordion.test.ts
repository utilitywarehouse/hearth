import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migrate-accordion';

describe('migrate-accordion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-accordion');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-accordion-aliased-import');
  });

  it('warns about usages that need manual migration', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-accordion');

    const messages = warn.mock.calls.map(([message]) => String(message));
    expect(messages).toEqual([
      expect.stringContaining('`value`'),
      expect.stringContaining('`onValueChange`'),
      expect.stringContaining('non-literal `type`'),
      expect.stringContaining('no `type` attribute'),
      expect.stringContaining('no `type` attribute'),
    ]);
  });
});

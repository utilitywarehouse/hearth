import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-modal-loading-text';

describe('remove-modal-loading-text', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-aliased-import');
  });

  it('transforms elements used through a namespace import', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-namespace-import');
  });

  it('leaves unrewritable usages untouched and warns about each', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-unrewritable');

    const messages = warn.mock.calls.map(([message]) => String(message));
    expect(messages).toEqual([
      expect.stringMatching(/:5 .*`loadingHeading` that may be empty; merge them manually/),
      expect.stringMatching(/:8 .*`loadingHeading` that may be empty; merge them manually/),
      expect.stringMatching(/:11 .*spreads props that may include `loadingText`/),
    ]);
  });

  it('removes loadingText when loadingHeading is an expression-wrapped string', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-heading-expression');
  });

  it('migrates a literal loadingText and still warns about a spread', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-spread');

    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0][0])).toMatch(
      /:4 .*spreads props that may include `loadingText`/
    );
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-comment-only');
  });
});

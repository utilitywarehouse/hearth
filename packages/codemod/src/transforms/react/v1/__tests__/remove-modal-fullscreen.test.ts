import { describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-modal-fullscreen';

describe('remove-modal-fullscreen', () => {
  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-aliased-import');
  });

  it('leaves a locally shadowed Modal untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-shadowed');
  });

  it('removes a literal fullScreen and still warns about a spread', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-spread');
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-comment-only');
  });
});

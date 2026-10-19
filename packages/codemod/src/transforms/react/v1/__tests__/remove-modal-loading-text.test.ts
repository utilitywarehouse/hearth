import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-modal-loading-text';

describe('remove-modal-loading-text', () => {
  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-aliased-import');
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text-comment-only');
  });
});

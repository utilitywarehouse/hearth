import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-modal-fullscreen';

describe('remove-modal-fullscreen', () => {
  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-aliased-import');
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-fullscreen-comment-only');
  });
});

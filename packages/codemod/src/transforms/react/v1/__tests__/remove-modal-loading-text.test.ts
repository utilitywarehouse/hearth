import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-modal-loading-text';

describe('remove-modal-loading-text', () => {
  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-modal-loading-text');
  });
});

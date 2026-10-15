import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migration';

describe('migration', () => {
  it('runs every react/v1 codemod in one pass', () => {
    runTransformFixtureTest(__dirname, transform, 'migration');
  });
});

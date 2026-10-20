import { readFileSync } from 'node:fs';
import path from 'node:path';
import { applyTransform } from 'jscodeshift/dist/testUtils';
import { describe, expect, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migration';

describe('migration', () => {
  it('runs every react/v1 codemod in one pass', () => {
    runTransformFixtureTest(__dirname, transform, 'migration');
  });

  it('leaves files that do not use the Hearth components byte-for-byte unchanged', () => {
    runTransformFixtureTest(__dirname, transform, 'not-hearth-modal');
  });

  it('is idempotent', () => {
    const source = readFileSync(
      path.join(__dirname, '..', '__testfixtures__', 'migration.input.tsx'),
      'utf8'
    );
    const run = (input: string) =>
      applyTransform(
        transform,
        {},
        { source: input, path: 'migration.input.tsx' },
        { parser: 'tsx' }
      );
    const once = run(source);
    expect(run(once)).toBe(once);
  });
});

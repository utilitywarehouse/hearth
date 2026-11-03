import { readFileSync } from 'node:fs';
import path from 'node:path';
import jscodeshift from 'jscodeshift';
import { applyTransform } from 'jscodeshift/dist/testUtils';
import { describe, expect, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as preV1Transform from '../../pre-v1/migration';
import * as transform from '../migration';

const fixturesDirectory = path.join(__dirname, '..', '__testfixtures__');
const run = (source: string) =>
  applyTransform(transform, {}, { source, path: 'migration.input.tsx' }, { parser: 'tsx' });

describe('migration', () => {
  it('runs every react/v1 codemod in one pass', () => {
    runTransformFixtureTest(__dirname, transform, 'migration');
  });

  it('leaves files that do not use the Hearth components byte-for-byte unchanged', () => {
    const source = readFileSync(path.join(fixturesDirectory, 'not-hearth-modal.input.tsx'), 'utf8');
    const j = jscodeshift.withParser('tsx');
    // called directly rather than through `applyTransform`, which trims the output, so
    // leading and trailing whitespace changes are caught too
    const output = transform.default(
      { source, path: 'not-hearth-modal.input.tsx' },
      { jscodeshift: j, j, stats: () => undefined, report: () => undefined }
    );
    expect(output).toBe(source);
  });

  it('includes every pre-v1 codemod', () => {
    const source = readFileSync(path.join(fixturesDirectory, 'migration.input.tsx'), 'utf8');
    const preV1Output = applyTransform(
      preV1Transform,
      {},
      { source, path: 'migration.input.tsx' },
      { parser: 'tsx' }
    );
    // the fixture must exercise pre-v1, or the comparison below passes vacuously
    expect(preV1Output).not.toBe(source);
    // once pre-v1 has run, the full migration has nothing of the pre-v1 set left to change
    expect(run(preV1Output)).toBe(run(source));
  });

  it('is idempotent', () => {
    const source = readFileSync(path.join(fixturesDirectory, 'migration.input.tsx'), 'utf8');
    const once = run(source);
    expect(run(once)).toBe(once);
  });
});

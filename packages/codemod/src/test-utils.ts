import { readFileSync } from 'node:fs';
import path from 'node:path';
import { expect } from 'vitest';
import { applyTransform } from 'jscodeshift/dist/testUtils';

/**
 * Runs a jscodeshift transform against `__testfixtures__/<name>.input.tsx`
 * and asserts the output matches `__testfixtures__/<name>.output.tsx`.
 *
 * @param dirname `__dirname` of the calling `__tests__/*.test.ts` file
 * @param transformModule the `import * as` module object for the transform under test
 */
export function runTransformFixtureTest(
  dirname: string,
  transformModule: unknown,
  name: string
): void {
  const fixturesDir = path.join(dirname, '..', '__testfixtures__');
  const source = readFileSync(path.join(fixturesDir, `${name}.input.tsx`), 'utf8');
  const expectedOutput = readFileSync(path.join(fixturesDir, `${name}.output.tsx`), 'utf8');

  const output = applyTransform(
    transformModule,
    {},
    { source, path: `${name}.input.tsx` },
    { parser: 'tsx' }
  );

  expect(output).toBe(expectedOutput.trim());
}

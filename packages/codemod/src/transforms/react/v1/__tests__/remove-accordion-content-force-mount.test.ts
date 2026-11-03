import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-accordion-content-force-mount';

describe('remove-accordion-content-force-mount', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-accordion-content-force-mount');
  });

  it('transforms elements imported under an alias alongside other components', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-aliased-import'
    );
  });

  it('transforms elements used through a namespace import', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-namespace-import'
    );
  });

  it('leaves unrewritable usages untouched and warns about each', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-unrewritable'
    );

    const messages = warn.mock.calls.map(([message]) => String(message));
    expect(messages).toEqual([
      expect.stringMatching(
        /:5 <AccordionContent> has a `forceMount` that is not a literal boolean/
      ),
      expect.stringMatching(
        /:6 <AccordionContent> has `forceMount` and a `keepMounted` that may be undefined/
      ),
      expect.stringMatching(
        /:7 <AccordionContent> spreads props that may include `forceMount` or `keepMounted`/
      ),
    ]);
  });

  it('leaves locally shadowed components untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-accordion-content-force-mount-shadowed');
  });

  it('leaves a locally shadowed namespace untouched', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-shadowed-namespace'
    );
  });

  it('ignores components that are only imported as types', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-type-import'
    );
  });

  it('ignores same-named components from other sources', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-not-hearth'
    );
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-accordion-content-force-mount-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(
      __dirname,
      transform,
      'remove-accordion-content-force-mount-comment-only'
    );
  });
});

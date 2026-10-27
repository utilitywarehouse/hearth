import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../remove-text-wrap-prop';

describe('remove-text-wrap-prop', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop');

    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0][0])).toMatch(
      /:8 .*has both `wrap` and `textWrap`; merge them manually/
    );
  });

  it('transforms every component that shares the text-wrap prop', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-all-components');
  });

  it('transforms elements imported under an alias', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-aliased-import');
  });

  it('transforms elements used through a namespace import', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-namespace-import');
  });

  it('transforms an aliased component imported alongside other components', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-mixed-imports');
  });

  it('leaves a locally shadowed component untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-shadowed');
  });

  it('leaves a locally shadowed namespace untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-shadowed-namespace');
  });

  it('renames wrap when spread props are also present, and warns about the spread', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-spread');

    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0][0])).toMatch(
      /:4 .*spreads props that may include `wrap` or `textWrap`/
    );
  });

  it('ignores a component that is only imported as a type', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-type-import');
  });

  it('transforms a .jsx file', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-jsx', 'jsx');
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-comment-only');
  });

  it('renames wrap regardless of the value shape', () => {
    runTransformFixtureTest(__dirname, transform, 'remove-text-wrap-prop-responsive-value');
  });
});

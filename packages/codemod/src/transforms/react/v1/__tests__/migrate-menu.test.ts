import { afterEach, describe, expect, it, vi } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migrate-menu';

describe('migrate-menu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforms correctly', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu');
  });

  it('transforms elements imported under an alias alongside other components', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-aliased-import');
  });

  it('transforms elements used through a namespace import', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-namespace-import');
  });

  it('leaves unrewritable usages untouched and warns about each', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-unrewritable');

    const messages = warn.mock.calls.map(([message]) => String(message));
    expect(messages).toEqual([
      expect.stringMatching(
        /:5 <MenuContent> has `forceMount` and a `keepMounted` that may be undefined/
      ),
      expect.stringMatching(/:6 <MenuItem> has both `onSelect` and `onClick`; merge them manually/),
      expect.stringMatching(/:7 <MenuItem> has `textValue` and a `label` that may be undefined/),
      expect.stringMatching(
        /:8 <MenuItem> spreads props that may include `onSelect` or `textValue`/
      ),
      expect.stringMatching(/:10 <MenuContent> spreads props that may include `forceMount`/),
    ]);
  });

  it('migrates a literal onSelect and still warns about a spread', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-spread');

    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0][0])).toMatch(
      /:5 <MenuItem> spreads props that may include `onSelect` or `textValue`/
    );
  });

  it('leaves locally shadowed components untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-shadowed');
  });

  it('leaves a locally shadowed namespace untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-shadowed-namespace');
  });

  it('ignores components that are only imported as types', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-type-import');
  });

  it('ignores same-named components from other sources', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-not-hearth');
  });

  it('transforms a .jsx file', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-jsx', 'jsx');
  });

  it('leaves an empty file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-empty');
  });

  it('leaves a comment-only file untouched', () => {
    runTransformFixtureTest(__dirname, transform, 'migrate-menu-comment-only');
  });
});

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  compareVersions,
  countEntries,
  parseChangelog,
  selectReleases,
  type Release,
} from '../changelog.js';
import { packageRoot } from './run-binary.js';

/** The real changelogs in this repo, as `hearth changes` fetches them from `main`. */
const changelog = (short: string) =>
  parseChangelog(readFileSync(join(packageRoot, '..', short, 'CHANGELOG.md'), 'utf8'));

const release = (releases: Array<Release>, version: string) => {
  const found = releases.find(candidate => candidate.version === version);
  if (!found) throw new Error(`no ${version} in the changelog`);
  return found;
};

describe('parseChangelog', () => {
  it('reads every version of the react changelog, newest first', () => {
    const releases = changelog('react');

    expect(releases[0].version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(compareVersions(releases[0].version, releases[1].version)).toBeGreaterThan(0);
    expect(releases.map(({ version }) => version)).toContain('0.37.0');
  });

  it('keeps an entry verbatim, across its code block and nested list, and classifies its tag', () => {
    const { entries } = release(changelog('react'), '0.37.0');

    expect(entries.map(({ type }) => type)).toEqual(['feature', 'fix']);
    const [visuallyHidden] = entries;
    expect(visuallyHidden.text).toMatch(/^\[#1769\]\(.*🌟 \[FEATURE\]: `VisuallyHidden` component/);
    expect(visuallyHidden.text).toContain(
      "```tsx\nimport { Slot, VisuallyHidden } from '@utilitywarehouse/hearth-react';"
    );
    expect(visuallyHidden.text).toContain(
      '**Components affected**:\n\n- `VisuallyHidden`\n- `Slot`'
    );
    expect(visuallyHidden.text).not.toContain('### Patch Changes');
  });

  it('classifies an untagged entry, such as a dependency update, as other', () => {
    const { entries } = release(changelog('react'), '0.36.1');

    expect(entries.map(({ type }) => type)).toEqual(['other']);
    expect(entries[0].text).toMatch(
      /^Updated dependencies .*\n- @utilitywarehouse\/hearth-fonts@0\.1\.2$/
    );
  });

  it('keeps headings indented inside an entry as part of it', () => {
    const { entries } = release(changelog('react'), '0.30.0');

    expect(entries[0].type).toBe('breaking');
    expect(entries[0].text).toContain('# Breaking Changes: Removed CSS Classes and Tokens');
  });

  it.each([
    ['react', '0.35.0', 'breaking'], // 💔 [BREAKING CHANGE]
    ['tokens', '0.4.0', 'breaking'], // 💔 [BREAKING_CHANGE]
    ['tokens', '0.5.1', 'enhancement'],
  ])('classifies the first entry of %s %s as %s', (short, version, type) => {
    expect(release(changelog(short), version).entries[0].type).toBe(type);
  });

  it('parses the changelog of every other published package', () => {
    for (const short of [
      'react-native',
      'svg-icons',
      'react-icons',
      'svg-assets',
      'fonts',
      'css-reset',
    ]) {
      const releases = changelog(short);
      expect(releases.length, short).toBeGreaterThan(0);
      expect(
        releases.every(({ entries }) => entries.length > 0),
        short
      ).toBe(true);
    }
  });

  it('takes the most severe of several tags, and reads older tag spellings', () => {
    const releases = parseChangelog(`# pkg

## 1.0.0

### Major Changes

- abc Thanks! - 🌟 [FEATURE] 💔 [BREAKING CHANGE]: New thing that breaks
- def Thanks! - ✨ [FEAT]: Old spelling
- [BUG]: Older still
- 🪲 [BUGFIX]: Another
- 💅 [ENHANCEMENT]: Nicer
- 🧹 [HOUSEKEEPING]: Tidy
- No tag at all
`);

    expect(releases[0].entries.map(({ type }) => type)).toEqual([
      'breaking',
      'feature',
      'fix',
      'fix',
      'enhancement',
      'other',
      'other',
    ]);
  });
});

describe('selectReleases', () => {
  const releases = ['0.3.0', '0.2.1', '0.2.0', '0.1.0'].map(version => ({ version, entries: [] }));

  it('selects the versions after from, up to and including to', () => {
    expect(selectReleases(releases, '0.1.0', '0.2.1').map(({ version }) => version)).toEqual([
      '0.2.1',
      '0.2.0',
    ]);
  });

  it('selects nothing when from is the target or later', () => {
    expect(selectReleases(releases, '0.3.0', '0.3.0')).toEqual([]);
    expect(selectReleases(releases, '0.3.0', '0.2.0')).toEqual([]);
  });

  it('shows VisuallyHidden to a project on hearth-react older than 0.37.0', () => {
    const selected = selectReleases(changelog('react'), '0.36.3', '0.37.2');

    expect(selected.map(({ version }) => version)).toEqual(['0.37.2', '0.37.1', '0.37.0']);
    expect(countEntries(selected)).toEqual({
      breaking: 0,
      feature: 1,
      enhancement: 2,
      fix: 1,
      other: 0,
    });
  });
});

describe('compareVersions', () => {
  it.each([
    ['0.10.0', '0.9.0', 1],
    ['1.0.0', '1.0.0', 0],
    ['1.0.0-beta.1', '1.0.0', -1],
    ['1.0.0-beta.2', '1.0.0-beta.10', -1],
  ])('compares %s with %s', (a, b, sign) => {
    expect(Math.sign(compareVersions(a, b))).toBe(sign);
  });
});

/** What an entry's tag says it is. `other` covers housekeeping, dependency updates and untagged entries. */
export type EntryType = 'breaking' | 'feature' | 'enhancement' | 'fix' | 'other';

export const ENTRY_TYPES: ReadonlyArray<EntryType> = [
  'breaking',
  'feature',
  'enhancement',
  'fix',
  'other',
];

/** `text` is the entry as the changelog writes it, without its list marker, so nothing is lost if a tag is missed. */
export type Entry = { type: EntryType; text: string };

export type Release = { version: string; entries: Array<Entry> };

const VERSION = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;

export const isVersion = (value: string) => VERSION.test(value);

/** Compares two `x.y.z` or `x.y.z-pre` versions; a prerelease sorts before its release. */
export const compareVersions = (a: string, b: string): number => {
  const [, ...left] = VERSION.exec(a) ?? [];
  const [, ...right] = VERSION.exec(b) ?? [];
  for (let index = 0; index < 3; index++) {
    const difference = Number(left[index]) - Number(right[index]);
    if (difference !== 0) return difference;
  }
  const [preA, preB] = [left[3], right[3]];
  if (preA === preB) return 0;
  if (preA === undefined) return 1;
  if (preB === undefined) return -1;
  return preA.localeCompare(preB, 'en', { numeric: true });
};

/** Tags in the changesets house style (`💔 [BREAKING CHANGE]`, `🌟 [FEATURE]`), with the spellings older entries used. */
const TAG_TYPES: Array<[RegExp, EntryType]> = [
  [/BREAKING/, 'breaking'],
  [/^FEAT(URE)?$/, 'feature'],
  [/^ENHANCEMENT$/, 'enhancement'],
  [/^(FIX|BUG|BUGFIX)$/, 'fix'],
];

/** The most severe type among the tags on an entry's first line, so `💔 [BREAKING CHANGE] 🌟 [FEATURE]` is breaking. */
const classify = (firstLine: string): EntryType => {
  // `[#123](…)` and `[@name](…)` are links, not tags
  const tags = [...firstLine.matchAll(/\[([A-Z][A-Z _-]*)\]/g)].map(([, tag]) => tag);
  const types = tags.flatMap(tag => TAG_TYPES.find(([pattern]) => pattern.test(tag))?.[1] ?? []);
  if (firstLine.includes('💔')) types.push('breaking');
  return ENTRY_TYPES.find(type => types.includes(type)) ?? 'other';
};

/**
 * Splits a changesets `CHANGELOG.md` into releases, newest first as the file lists them. An entry is a top-level
 * `- ` list item and every indented or blank line after it; the `### Major/Minor/Patch Changes` headings are dropped.
 */
export const parseChangelog = (markdown: string): Array<Release> => {
  const releases: Array<Release> = [];
  let lines: Array<string> | undefined;
  const flush = () => {
    if (!lines) return;
    const text = lines.join('\n').trimEnd();
    releases.at(-1)?.entries.push({ type: classify(lines[0]), text });
    lines = undefined;
  };
  for (const line of markdown.split(/\r?\n/)) {
    const version = /^## (\S+)\s*$/.exec(line)?.[1];
    if (version !== undefined) {
      flush();
      releases.push({ version, entries: [] });
    } else if (line.startsWith('- ')) {
      flush();
      lines = [line.slice(2)];
    } else if (line.startsWith('#')) {
      flush();
    } else if (lines) {
      lines.push(line.replace(/^ {2}/, ''));
    }
  }
  flush();
  return releases;
};

/** The releases after `from`, up to and including `to`, newest first. */
export const selectReleases = (releases: Array<Release>, from: string, to: string) =>
  releases
    .filter(({ version }) => isVersion(version))
    .filter(
      ({ version }) => compareVersions(version, from) > 0 && compareVersions(version, to) <= 0
    )
    .sort((a, b) => compareVersions(b.version, a.version));

export const countEntries = (releases: Array<Release>): Record<EntryType, number> => {
  const counts = Object.fromEntries(ENTRY_TYPES.map(type => [type, 0])) as Record<
    EntryType,
    number
  >;
  for (const { entries } of releases) for (const { type } of entries) counts[type]++;
  return counts;
};

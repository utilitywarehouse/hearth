import { ENTRY_TYPES, countEntries, type Release } from './changelog.js';

export type Changes = { name: string; from: string; to: string; releases: Array<Release> };

/** Indents an entry's continuation lines so it stays one list item, without leaving whitespace on blank lines. */
const listItem = (text: string, prefix = '') =>
  `- ${prefix}${text
    .split('\n')
    .map((line, index) => (index === 0 || line === '' ? line : `  ${line}`))
    .join('\n')}`;

/** Markdown: a header with counts by type, breaking changes first, then every entry by version. */
export const formatChanges = ({ name, from, to, releases }: Changes): string => {
  const title = `# ${name} ${from} → ${to}\n`;
  if (releases.length === 0) return `${title}\nNo changes: ${from} is already ${to} or later.\n`;
  const counts = countEntries(releases);
  const total = ENTRY_TYPES.reduce((sum, type) => sum + counts[type], 0);
  const summary = `${total} ${total === 1 ? 'entry' : 'entries'} in ${releases.length} ${releases.length === 1 ? 'version' : 'versions'}: ${ENTRY_TYPES.map(type => `${counts[type]} ${type}`).join(', ')}\n`;
  const breaking = releases.flatMap(({ version, entries }) =>
    entries
      .filter(({ type }) => type === 'breaking')
      .map(({ text }) => listItem(text, `**${version}** `))
  );
  return [
    title,
    summary,
    ...(breaking.length > 0 ? [`## 💔 Breaking changes\n\n${breaking.join('\n')}\n`] : []),
    ...releases.map(
      ({ version, entries }) =>
        `## ${version}\n\n${entries.length > 0 ? entries.map(entry => listItem(entry.text)).join('\n') : 'No entries.'}\n`
    ),
  ].join('\n');
};

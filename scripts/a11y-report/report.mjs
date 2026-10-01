// Detailed Markdown: every failing component, rule and story, with an example
// element and how to fix it. Used for the run summary, the report artifact and
// the Linear issue descriptions.
import { ruleEmoji } from './rule-info.mjs';

/** @typedef {import('./findings.mjs').ComponentGroup} ComponentGroup */
/** @typedef {import('./findings.mjs').RuleGroup} RuleGroup */
/** @typedef {import('./summarise.mjs').PackageSummary} PackageSummary */
/** @typedef {{ runUrl?: string, repoUrl?: string, sha?: string }} ReportLinks */

export const PACKAGE_NAMES = { react: 'hearth-react', 'react-native': 'hearth-react-native' };
const MAX_STORIES = 10;
const README_PATH = 'scripts/a11y-report/README.md';

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export const fileLink = (file, { repoUrl, sha = 'main' } = {}) =>
  repoUrl ? `[\`${file}\`](${repoUrl}/blob/${sha}/${file})` : `\`${file}\``;

export const readmeLink = (text, anchor, { repoUrl } = {}) =>
  repoUrl ? `[${text}](${repoUrl}/blob/main/${README_PATH}${anchor})` : text;

function storyList(stories) {
  const shown = stories.slice(0, MAX_STORIES).map(s => `\`${s}\``);
  if (stories.length > MAX_STORIES) shown.push(`and ${stories.length - MAX_STORIES} more`);
  return shown.join(', ');
}

/**
 * @param {RuleGroup} r
 * @param {number} depth Heading level
 * @param {ReportLinks} links
 */
function ruleMarkdown(r, depth, links) {
  const kind = r.source === 'native' ? 'native' : `web · ${r.impact ?? 'axe'}`;
  const helpLink =
    r.source === 'native'
      ? readmeLink('Rule docs', '#what-gets-checked', links)
      : r.helpUrl && `[How to fix](${r.helpUrl})`;
  const out = [
    `${'#'.repeat(depth)} ${ruleEmoji(r.source, r.rule)} \`${r.rule}\`: ${r.help} (${kind})`,
    '',
    `**${plural(r.stories.length, 'story', 'stories')}:** ${storyList(r.stories)}`,
    '',
  ];
  if (r.source === 'native' && r.example.help !== r.help) out.push(`> ${r.example.help}`, '');
  if (r.example.html) out.push('Example element:', '', '```html', r.example.html, '```', '');
  // The first line of axe's advice is "Fix any/all of the following:"; the rest are options.
  const [lead, ...options] = r.source === 'axe' ? r.example.fix : [];
  if (lead) out.push(`${lead}`, '', ...options.map(o => `- ${o}`), '');
  if (helpLink) out.push(helpLink, '');
  return out;
}

/**
 * Everything wrong with one component. Also the body of its Linear issue.
 *
 * @param {ComponentGroup} group
 * @param {ReportLinks} [links]
 * @param {{ depth?: number }} [opts]
 */
export function componentMarkdown(group, links = {}, { depth = 3 } = {}) {
  return [
    `**${plural(group.rules.length, 'rule')}** failing in **${plural(group.stories.length, 'story', 'stories')}** of ${fileLink(group.file, links)}.`,
    '',
    ...group.rules.flatMap(r => ruleMarkdown(r, depth, links)),
  ].join('\n');
}

/**
 * @param {ComponentGroup[]} groups
 * @param {PackageSummary[]} summaries
 * @param {ReportLinks & { date?: string }} [meta]
 */
export function buildDetailedReport(groups, summaries, meta = {}) {
  const date = meta.date ?? new Date().toISOString().slice(0, 10);
  const out = [`# ♿ Accessibility findings by component (${date})`, ''];
  if (meta.runUrl) out.push(`From [this run](${meta.runUrl}).`, '');

  for (const s of summaries) {
    const name = PACKAGE_NAMES[s.package] ?? s.package;
    const components = groups.filter(g => g.package === s.package);
    out.push(`## ${name}`, '');
    if (!s.ran) {
      out.push("Storybook tests didn't run, so there are no findings.", '');
      continue;
    }
    if (!components.length) {
      out.push('🎉 No violations found.', '');
      continue;
    }
    out.push('| Component | Stories | Rules |', '| --- | ---: | --- |');
    for (const g of components) {
      const rules = g.rules.map(r => `${ruleEmoji(r.source, r.rule)} \`${r.rule}\``).join(' ');
      out.push(`| ${g.component} | ${g.stories.length} | ${rules} |`);
    }
    out.push('');
    for (const g of components) {
      out.push(
        '<details>',
        `<summary><strong>${g.component}</strong>: ${plural(g.rules.length, 'rule')}, ${plural(g.stories.length, 'story', 'stories')}</summary>`,
        '',
        componentMarkdown(g, meta, { depth: 4 }),
        '</details>',
        ''
      );
    }
  }
  return out.join('\n');
}

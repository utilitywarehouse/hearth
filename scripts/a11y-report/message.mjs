import { isClean } from './summarise.mjs';

/** @typedef {import('./summarise.mjs').PackageSummary} PackageSummary */
/** @typedef {import('./overrides.mjs').Override} Override */

const LABELS = { react: 'Hearth React', 'react-native': 'Hearth React Native' };
const TOP_N = 5;

// Default impact of the axe rules we see most. axe's failure message doesn't carry
// the impact, and unknown rules just get a neutral bullet.
const AXE_IMPACT = {
  'aria-allowed-attr': 'critical',
  'aria-required-attr': 'critical',
  'aria-required-children': 'critical',
  'aria-valid-attr': 'critical',
  'aria-valid-attr-value': 'critical',
  'button-name': 'critical',
  'image-alt': 'critical',
  'input-button-name': 'critical',
  label: 'critical',
  'select-name': 'critical',
  'aria-hidden-focus': 'serious',
  'aria-prohibited-attr': 'serious',
  'aria-toggle-field-name': 'serious',
  'autocomplete-valid': 'serious',
  'color-contrast': 'serious',
  dlitem: 'serious',
  'link-name': 'serious',
  list: 'serious',
  listitem: 'serious',
  'nested-interactive': 'serious',
  'scrollable-region-focusable': 'serious',
  'heading-order': 'moderate',
  'landmark-unique': 'moderate',
  'page-has-heading-one': 'moderate',
  region: 'moderate',
};
const IMPACT_EMOJI = { critical: '🔴', serious: '🟠', moderate: '🟡', minor: '⚪' };

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const stories = n => plural(n, 'story', 'stories');
const section = text => ({ type: 'section', text: { type: 'mrkdwn', text } });
const context = text => ({ type: 'context', elements: [{ type: 'mrkdwn', text }] });
const divider = { type: 'divider' };

const ruleList = (title, rules, bullet) =>
  `*${title}*\n` +
  rules
    .slice(0, TOP_N)
    .map(r => `${bullet(r.id)} \`${r.id}\` — ${stories(r.stories)}`)
    .join('\n');

/** @param {PackageSummary} s */
function packageBlocks(s) {
  const label = LABELS[s.package] ?? s.package;
  if (!s.ran) {
    return [
      section(
        `⚠️ *${label}* — Storybook tests didn't run or produced no results. Check the run logs.`
      ),
    ];
  }

  const lines = [`${isClean(s) ? '✅' : '❌'} *${label}* — ${s.total} stories checked`];
  if (isClean(s)) lines.push('🎉 No violations found');
  if (s.axeFailing)
    lines.push(
      `🌐 *${s.axeFailing}* ${s.axeFailing === 1 ? 'story' : 'stories'} with web (axe) violations`
    );
  if (s.nativeFailing) {
    lines.push(
      `📱 *${s.nativeFailing}* ${s.nativeFailing === 1 ? 'story' : 'stories'} with native-rule violations`
    );
  }
  if (s.broken.length) lines.push(`⚠️ ${stories(s.broken.length)} failed for non-a11y reasons`);

  const blocks = [section(lines.join('\n'))];
  if (s.axeRules.length) {
    blocks.push(
      section(ruleList('Top web rules', s.axeRules, id => IMPACT_EMOJI[AXE_IMPACT[id]] ?? '•'))
    );
  }
  if (s.nativeRules.length)
    blocks.push(section(ruleList('Top native rules', s.nativeRules, () => '📱')));
  return blocks;
}

/**
 * @param {PackageSummary[]} summaries
 * @param {Override[]} overrides
 * @param {{ runUrl?: string, date?: string, ref?: string }} [opts]
 */
export function buildSlackMessage(summaries, overrides, { runUrl, date, ref = 'main' } = {}) {
  const allClean = summaries.every(isClean);
  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '♿ Weekly accessibility report', emoji: true },
    },
    context(
      `📅 ${date ?? new Date().toISOString().slice(0, 10)} · axe-core via Storybook · \`${ref}\``
    ),
  ];

  for (const s of summaries) blocks.push(divider, ...packageBlocks(s));
  blocks.push(divider);

  if (overrides.length) {
    const count = new Set(overrides.map(o => `${o.file}:${o.line}`)).size;
    blocks.push(
      context(
        `🙈 ${plural(count, 'story overrides', 'stories override')} a11y rules — listed in the run summary`
      )
    );
  }
  if (runUrl) {
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: '🔍 View full run', emoji: true },
          url: runUrl,
          style: allClean ? 'primary' : 'danger',
        },
      ],
    });
  }
  blocks.push(
    context(
      '🟢 Non-blocking · runs Mondays 07:00 UTC · <https://linear.app/utilitywarehouse/issue/UWDS-4945|UWDS-4945>'
    )
  );

  return {
    text: `Weekly accessibility report: ${allClean ? 'all clean' : 'violations found'}`,
    blocks,
  };
}

/**
 * Markdown for `$GITHUB_STEP_SUMMARY`: the same numbers, plus every rule, broken
 * story and override (Slack only shows the top few).
 *
 * @param {PackageSummary[]} summaries
 * @param {Override[]} overrides
 */
export function buildStepSummary(summaries, overrides) {
  const out = ['# ♿ Weekly accessibility report', ''];
  for (const s of summaries) {
    const label = LABELS[s.package] ?? s.package;
    out.push(`## ${!s.ran ? '⚠️' : isClean(s) ? '✅' : '❌'} ${label}`, '');
    if (!s.ran) {
      out.push("Storybook tests didn't run or produced no results.", '');
      continue;
    }
    out.push(
      `- Stories checked: ${s.total}`,
      `- 🌐 With web (axe) violations: ${s.axeFailing}`,
      `- 📱 With native-rule violations: ${s.nativeFailing}`,
      `- ⚠️ Failed for non-a11y reasons: ${s.broken.length}`,
      ''
    );
    for (const [title, rules] of [
      ['Web (axe) rules', s.axeRules],
      ['Native rules', s.nativeRules],
    ]) {
      if (!rules.length) continue;
      out.push(`### ${title}`, '', '| Rule | Stories |', '| --- | ---: |');
      for (const r of rules) out.push(`| \`${r.id}\` | ${r.stories} |`);
      out.push('');
    }
    if (s.broken.length) {
      out.push('### Non-a11y failures', '');
      for (const b of s.broken) out.push(`- \`${b.story}\` — ${b.message}`);
      out.push('');
    }
  }
  if (overrides.length) {
    out.push(
      '## 🙈 A11y overrides',
      '',
      '| Story file | Checks | Rules off | Reason |',
      '| --- | --- | --- | --- |'
    );
    for (const o of overrides) {
      const rules = o.rules.map(r => (r === '*' ? 'all' : `\`${r}\``)).join(', ');
      out.push(
        `| \`${o.file}:${o.line}\` | ${o.kind} | ${rules} | ${o.reason ?? '_no reason given_'} |`
      );
    }
    out.push('');
  }
  return out.join('\n');
}

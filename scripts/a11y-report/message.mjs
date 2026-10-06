import { ruleEmoji } from './rule-info.mjs';
import { countA11y } from './state.mjs';
import { isClean } from './summarise.mjs';

/** @typedef {import('./summarise.mjs').PackageSummary} PackageSummary */
/** @typedef {import('./overrides.mjs').Override} Override */

const LABELS = { react: 'Hearth React', 'react-native': 'Hearth React Native' };
const TOP_N = 5;

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
    blocks.push(section(ruleList('Top web rules', s.axeRules, id => ruleEmoji('axe', id))));
  }
  if (s.nativeRules.length)
    blocks.push(
      section(ruleList('Top native rules', s.nativeRules, id => ruleEmoji('native', id)))
    );
  return blocks;
}

/** "Since last report" line: story × rule findings that are new or fixed. */
function changesLine(changes) {
  if (!changes || changes.first) return null;
  const added = countA11y(changes.added);
  const fixed = countA11y(changes.removed);
  if (!added && !fixed) return '🔁 Same violations as last report; other results changed';
  return `📈 Since last report: 🆕 ${plural(added, 'new finding')} · ✅ ${fixed} fixed`;
}

function linearLine(ops) {
  if (!ops?.length) return null;
  const count = type => ops.filter(op => op.type === type).length;
  const parts = [
    count('create') && `${plural(count('create'), 'new issue')}`,
    count('update') && `${count('update')} updated`,
    count('resolve') && `${count('resolve')} ready to close`,
  ].filter(Boolean);
  return `🎫 Linear: ${parts.join(' · ')}`;
}

/**
 * @param {PackageSummary[]} summaries
 * @param {Override[]} overrides
 * @param {{
 *   runUrl?: string,
 *   date?: string,
 *   ref?: string,
 *   changes?: import('./state.mjs').StateDiff,
 *   linear?: import('./linear.mjs').LinearOp[],
 * }} [opts]
 */
export function buildSlackMessage(
  summaries,
  overrides,
  { runUrl, date, ref = 'main', changes, linear } = {}
) {
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

  const trend = changesLine(changes);
  if (trend) blocks.push(context(trend));
  const issues = linearLine(linear);
  if (issues) blocks.push(context(issues));

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
      // Native rules only run for React Native.
      ...(s.package === 'react-native'
        ? [`- 📱 With native-rule violations: ${s.nativeFailing}`]
        : []),
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

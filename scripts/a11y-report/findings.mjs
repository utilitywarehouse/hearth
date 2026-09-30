// Turns the vitest JSON output into one finding per violating element, and groups
// the findings by component for the detailed report and Linear issues.
import { createHash } from 'node:crypto';
import { AXE_IMPACT, NATIVE_RULE_HELP } from './rule-info.mjs';

const ANSI = /\u001b\[[0-9;]*m/g;
// One jest-axe block per element, from addon-a11y's toHaveNoViolations():
//   Expected the HTML found at $('<target>') to have no violations:
//   <html>
//   Received:
//   "<help> (<rule-id>)"
//   Fix ...
//   You can find more information on this issue here:
//   <help url>
const AXE_BLOCK =
  /Expected the HTML found at \$\('(.+)'\) to have no violations:\s*\n([\s\S]*?)\n\s*Received:\s*"([^"\n]*) \(([a-z0-9-]+)\)"([\s\S]*?)(?=Expected the HTML found at|$)/g;
const HELP_URL = /https:\/\/dequeuniversity\.com\/rules\/axe\/[^\s?]+/;
// .storybook/a11y/rules.ts formatViolation(): [native-a11y] <rule-id>: <message>\n    <html>
const NATIVE_LINE = /\[native-a11y\] ([a-z0-9-]+): ([^\n]*)(?:\n {4}([^\n]*))?/g;

const MAX_HTML = 300;

/**
 * @typedef {{
 *   package: string,
 *   component: string,
 *   file: string,
 *   story: string,
 *   source: 'axe' | 'native',
 *   rule: string,
 *   help: string,
 *   helpUrl?: string,
 *   impact?: string,
 *   target?: string,
 *   html: string,
 *   fix: string[],
 * }} Finding
 *
 * @typedef {{
 *   source: 'axe' | 'native',
 *   rule: string,
 *   help: string,
 *   helpUrl?: string,
 *   impact?: string,
 *   stories: string[],
 *   example: Finding,
 * }} RuleGroup
 *
 * @typedef {{
 *   key: string,
 *   package: string,
 *   component: string,
 *   file: string,
 *   stories: string[],
 *   rules: RuleGroup[],
 *   fingerprint: string,
 * }} ComponentGroup
 */

const truncate = (text, max) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);

/** Path from `packages/<pkg>/`, so it's the same in the test container and on the runner. */
export function repoPath(pkg, file) {
  const index = file.indexOf(`packages/${pkg}/`);
  return index === -1 ? file : file.slice(index);
}

export const componentOf = file =>
  file
    .split('/')
    .at(-1)
    .replace(/\.stories\.[jt]sx?$/, '');

function axeFindings(message) {
  return Array.from(message.matchAll(AXE_BLOCK), ([, target, html, help, rule, rest]) => {
    const [details] = rest.split('You can find more information');
    return {
      source: 'axe',
      rule,
      help,
      helpUrl: rest.match(HELP_URL)?.[0],
      impact: AXE_IMPACT[rule],
      target,
      html: truncate(html.trim(), MAX_HTML),
      fix: details
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('─')),
    };
  });
}

function nativeFindings(message) {
  return Array.from(message.matchAll(NATIVE_LINE), ([, rule, help, html = '']) => ({
    source: 'native',
    rule,
    help: help.trim(),
    html: truncate(html.trim(), MAX_HTML),
    fix: NATIVE_RULE_HELP[rule] ? [NATIVE_RULE_HELP[rule]] : [],
  }));
}

/**
 * Every violating element in a package's run. Retries repeat the same messages,
 * so findings are de-duplicated per story, rule and element.
 *
 * @param {string} pkg
 * @param {any} results vitest `--reporter=json` output, or null
 * @returns {Finding[]}
 */
export function collectFindings(pkg, results) {
  const findings = [];
  for (const testFile of results?.testResults ?? []) {
    const file = repoPath(pkg, testFile.name ?? '');
    const component = componentOf(file);
    for (const test of testFile.assertionResults ?? []) {
      if (test.status !== 'failed') continue;
      const story = test.fullName ?? test.title;
      const seen = new Set();
      for (const raw of test.failureMessages ?? []) {
        const message = raw.replace(ANSI, '');
        for (const f of [...axeFindings(message), ...nativeFindings(message)]) {
          const id = `${f.source}|${f.rule}|${f.target ?? f.html}`;
          if (seen.has(id)) continue;
          seen.add(id);
          findings.push({ package: pkg, component, file, story, ...f });
        }
      }
    }
  }
  return findings;
}

/** Stable across runs: which rules fail in which stories, not element markup or order. */
export function fingerprintOf(rules) {
  const lines = rules.flatMap(r => r.stories.map(story => `${r.source}|${r.rule}|${story}`));
  return createHash('sha256').update(lines.sort().join('\n')).digest('hex').slice(0, 12);
}

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];
const rank = r => (r.source === 'native' ? 1.5 : (IMPACT_ORDER.indexOf(r.impact) + 5) % 5);

/**
 * @param {Finding[]} findings
 * @returns {ComponentGroup[]} Sorted by package, then most-affected component first.
 */
export function groupByComponent(findings) {
  const components = new Map();
  for (const f of findings) {
    const key = `${f.package}/${f.component}`;
    let group = components.get(key);
    if (!group) {
      group = { key, package: f.package, component: f.component, file: f.file, rules: new Map() };
      components.set(key, group);
    }
    const ruleKey = `${f.source}|${f.rule}`;
    let rule = group.rules.get(ruleKey);
    if (!rule) {
      rule = {
        source: f.source,
        rule: f.rule,
        help: f.source === 'native' ? (NATIVE_RULE_HELP[f.rule] ?? f.help) : f.help,
        helpUrl: f.helpUrl,
        impact: f.impact,
        stories: new Set(),
        example: f,
      };
      group.rules.set(ruleKey, rule);
    }
    rule.stories.add(f.story);
  }

  return [...components.values()]
    .map(group => {
      const rules = [...group.rules.values()]
        .map(r => ({ ...r, stories: [...r.stories].sort() }))
        .sort((a, b) => rank(a) - rank(b) || b.stories.length - a.stories.length);
      return {
        ...group,
        rules,
        stories: [...new Set(rules.flatMap(r => r.stories))].sort(),
        fingerprint: fingerprintOf(rules),
      };
    })
    .sort(
      (a, b) =>
        a.package.localeCompare(b.package) ||
        b.stories.length - a.stories.length ||
        a.component.localeCompare(b.component)
    );
}

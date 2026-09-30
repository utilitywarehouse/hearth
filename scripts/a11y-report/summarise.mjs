// Turns the vitest JSON output of each package's strict Storybook run into a
// per-package accessibility summary.

// eslint-disable-next-line no-control-regex
const ANSI = /\u001b\[[0-9;]*m/g;
// jest-axe style message from addon-a11y: Received:\n\n"<help> (<rule-id>)"
const AXE_RULE = /Received:\s*"[^"\n]*\(([a-z0-9-]+)\)"/g;
// .storybook/a11y/rules.ts formatViolation(): [native-a11y] <rule-id>: <message>
const NATIVE_RULE = /\[native-a11y\] ([a-z0-9-]+):/g;

/**
 * @typedef {{ id: string, stories: number }} RuleCount
 * @typedef {{
 *   package: string,
 *   ran: boolean,
 *   total: number,
 *   axeFailing: number,
 *   nativeFailing: number,
 *   broken: { story: string, message: string }[],
 *   axeRules: RuleCount[],
 *   nativeRules: RuleCount[],
 * }} PackageSummary
 */

const ruleIds = (message, pattern) => new Set(Array.from(message.matchAll(pattern), m => m[1]));

/** @param {Map<string, number>} counts */
const toSortedCounts = counts =>
  [...counts]
    .map(([id, stories]) => ({ id, stories }))
    .sort((a, b) => b.stories - a.stories || a.id.localeCompare(b.id));

/**
 * @param {string} pkg
 * @param {any} results vitest `--reporter=json` output, or null if the run produced none
 * @returns {PackageSummary}
 */
export function summarisePackage(pkg, results) {
  const summary = {
    package: pkg,
    ran: false,
    total: 0,
    axeFailing: 0,
    nativeFailing: 0,
    broken: [],
    axeRules: [],
    nativeRules: [],
  };
  if (!results?.testResults) return summary;

  const axeCounts = new Map();
  const nativeCounts = new Map();

  for (const file of results.testResults) {
    // A story file that fails to load has no assertions, only a file-level message.
    if (!file.assertionResults?.length && file.message) {
      summary.broken.push({ story: file.name, message: firstLine(file.message) });
      continue;
    }
    for (const test of file.assertionResults ?? []) {
      if (test.status === 'skipped' || test.status === 'pending' || test.status === 'todo')
        continue;
      summary.total++;
      if (test.status !== 'failed') continue;

      // Classify each error on its own: a story can fail a play function *and* a11y,
      // and the non-a11y failure must still be reported.
      const axe = new Set();
      const native = new Set();
      const other = [];
      const messages = test.failureMessages?.length ? test.failureMessages : [''];
      for (const raw of messages) {
        const message = raw.replace(ANSI, '');
        const axeIds = ruleIds(message, AXE_RULE);
        const nativeIds = ruleIds(message, NATIVE_RULE);
        axeIds.forEach(id => axe.add(id));
        nativeIds.forEach(id => native.add(id));
        // Not an a11y failure: the story threw, timed out, or a play function failed.
        if (!axeIds.size && !nativeIds.size) other.push(message);
      }

      if (axe.size) summary.axeFailing++;
      if (native.size) summary.nativeFailing++;
      for (const id of axe) axeCounts.set(id, (axeCounts.get(id) ?? 0) + 1);
      for (const id of native) nativeCounts.set(id, (nativeCounts.get(id) ?? 0) + 1);
      if (other.length) {
        summary.broken.push({
          story: test.fullName ?? test.title,
          message: firstLine(other[0]) || 'Failed without an error message',
        });
      }
    }
  }

  summary.ran = summary.total > 0;
  summary.axeRules = toSortedCounts(axeCounts);
  summary.nativeRules = toSortedCounts(nativeCounts);
  return summary;
}

/** @param {PackageSummary} s */
export const isClean = s =>
  s.ran && s.axeFailing === 0 && s.nativeFailing === 0 && s.broken.length === 0;

const firstLine = text => text.replace(ANSI, '').split('\n').find(Boolean)?.slice(0, 200) ?? '';

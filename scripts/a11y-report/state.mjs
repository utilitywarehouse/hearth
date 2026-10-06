// A snapshot of what the report found, saved as a workflow artifact so the next
// run can tell whether anything changed and skip Slack when nothing did.

export const STATE_VERSION = 1;

/**
 * @typedef {{ version: number, date: string, runUrl?: string, entries: string[] }} ReportState
 * @typedef {{ changed: boolean, first: boolean, added: string[], removed: string[] }} StateDiff
 */

/**
 * Entries are keyed by package, component, story and rule. Element markup, line
 * numbers and ordering are left out so they don't count as changes.
 *
 * @param {import('./summarise.mjs').PackageSummary[]} summaries
 * @param {import('./findings.mjs').Finding[]} findings
 * @param {import('./overrides.mjs').Override[]} overrides
 * @param {{ date?: string, runUrl?: string, previous?: ReportState | null }} [meta]
 *   `previous`: a package that didn't run keeps its previous findings, so they
 *   aren't reported as fixed now and as new again next time.
 * @returns {ReportState}
 */
export function buildState(summaries, findings, overrides, meta = {}) {
  const entries = new Set();
  for (const s of summaries) {
    if (!s.ran) {
      entries.add(`not-run|${s.package}`);
      for (const e of meta.previous?.entries ?? []) {
        if (e.startsWith(`a11y|${s.package}|`) || e.startsWith(`broken|${s.package}|`)) {
          entries.add(e);
        }
      }
    }
    for (const b of s.broken) entries.add(`broken|${s.package}|${b.story}`);
  }
  for (const f of findings) {
    entries.add(`a11y|${f.package}|${f.component}|${f.story}|${f.source}|${f.rule}`);
  }
  for (const o of overrides) entries.add(`override|${o.file}|${o.kind}|${o.rules.join(',')}`);
  return {
    version: STATE_VERSION,
    date: meta.date ?? new Date().toISOString().slice(0, 10),
    runUrl: meta.runUrl,
    entries: [...entries].sort(),
  };
}

/** Parse a saved state, or null if it's missing or from an older format. */
export function parseState(text) {
  try {
    const state = JSON.parse(text);
    return state?.version === STATE_VERSION && Array.isArray(state.entries) ? state : null;
  } catch {
    return null;
  }
}

/**
 * @param {ReportState | null} previous
 * @param {ReportState} current
 * @returns {StateDiff}
 */
export function diffState(previous, current) {
  if (!previous) return { changed: true, first: true, added: current.entries, removed: [] };
  const before = new Set(previous.entries);
  const after = new Set(current.entries);
  const added = current.entries.filter(e => !before.has(e));
  const removed = previous.entries.filter(e => !after.has(e));
  return { changed: added.length > 0 || removed.length > 0, first: false, added, removed };
}

/** Count a11y findings (story × rule) that are new or fixed. */
export const countA11y = entries => entries.filter(e => e.startsWith('a11y|')).length;

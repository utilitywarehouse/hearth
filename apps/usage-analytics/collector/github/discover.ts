import type { Octokit } from '@octokit/rest';
import { ORG, SELF_REPO } from '../config.ts';

export interface DiscoverResult {
  /** Distinct dependent repo full names (owner/repo). */
  repos: Array<string>;
  /** Code-search requests consumed. */
  requestsUsed: number;
  /** True if we stopped early because the search budget ran out / was throttled. */
  exhausted: boolean;
}

/** A shared, mutable code-search budget across a run. */
export interface SearchBudget {
  remaining: number;
}

/** Is this a code-search rate-limit rejection (primary or secondary)? */
export function isRateLimit(err: unknown): boolean {
  const e = err as { status?: number; response?: { headers?: Record<string, string> } };
  if (e?.status === 429) return true;
  if (e?.status === 403) {
    const remaining = e.response?.headers?.['x-ratelimit-remaining'];
    return remaining === '0' || remaining === undefined;
  }
  return false;
}

/**
 * Discover every org repo whose `package.json` mentions the given search term,
 * via a SINGLE code-search query (plus pagination). We only need the set of
 * dependent repos — cloning + parsing determines exactly which packages/symbols
 * each repo uses — so one query per term suffices. The hearth repo is excluded.
 *
 * `term` is either the shared "@utilitywarehouse/hearth" substring (covers all
 * current hearth packages in one query) or one exact legacy package name —
 * legacy names don't share a substring, and GitHub's code-search API doesn't
 * support OR, so each needs its own query. See `DISCOVERY_TERMS` in config.ts.
 *
 * On a rate-limit rejection we return what we have with `exhausted: true` rather
 * than throwing, so the caller can checkpoint and resume next run.
 */
export async function discoverForTerm(
  octokit: Octokit,
  budget: SearchBudget,
  term: string
): Promise<DiscoverResult> {
  const q = `org:${ORG} "${term}" in:file filename:package.json -repo:${SELF_REPO}`;
  const repos = new Set<string>();
  let requestsUsed = 0;
  let page = 1;
  const perPage = 100;

  while (true) {
    if (budget.remaining <= 0) {
      return { repos: [...repos], requestsUsed, exhausted: true };
    }
    budget.remaining -= 1;
    requestsUsed += 1;

    let data;
    try {
      ({ data } = await octokit.rest.search.code({ q, per_page: perPage, page }));
    } catch (err) {
      if (isRateLimit(err)) return { repos: [...repos], requestsUsed, exhausted: true };
      throw err;
    }

    for (const item of data.items) {
      const repo = item.repository;
      if (!repo?.full_name) continue;
      if (repo.fork) continue; // forks skew adoption; count only real adopters
      if (repo.full_name === SELF_REPO) continue;
      repos.add(repo.full_name);
    }

    const seen = page * perPage;
    if (data.items.length < perPage || seen >= data.total_count || seen >= 1000) break;
    page += 1;
  }

  return { repos: [...repos], requestsUsed, exhausted: false };
}

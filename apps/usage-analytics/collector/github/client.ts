import { Octokit } from '@octokit/rest';
import { throttling } from '@octokit/plugin-throttling';
import { retry } from '@octokit/plugin-retry';
import { GITHUB_API_VERSION } from '../config.ts';

const ThrottledOctokit = Octokit.plugin(throttling, retry);

/** Read the PAT from the environment, matching the repo's existing convention. */
export function getToken(): string {
  const token = process.env.GITHUB_PAT_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      'No GitHub token found. Set GITHUB_PAT_TOKEN (a PAT with repo + read:org scope).'
    );
  }
  return token;
}

/**
 * Create an Octokit client with sensible throttling:
 * - Core REST (contents, repos): auto-retry when secondary/primary limits hit.
 * - We deliberately DON'T block for the (~hour-long) search reset here; the
 *   caller checks `search.remaining` and checkpoints instead (see discovery).
 */
export function createClient(token = getToken()): Octokit {
  return new ThrottledOctokit({
    auth: token,
    request: { headers: { 'x-github-api-version': GITHUB_API_VERSION } },
    throttle: {
      onRateLimit(_retryAfter, options, _octokit, retryCount) {
        const url = (options as { url?: string }).url ?? '';
        // Search has a tiny hourly budget; don't sit and wait for it.
        if (url.includes('/search/')) return false;
        // Core REST: retry a couple of times honoring Retry-After.
        return retryCount < 3;
      },
      onSecondaryRateLimit(_retryAfter, _options, _octokit, retryCount) {
        return retryCount < 3;
      },
    },
  });
}

/** Current remaining code-search quota (the scarce resource). */
export async function searchRemaining(octokit: Octokit): Promise<number> {
  const { data } = await octokit.rest.rateLimit.get();
  // `code_search` is the modern bucket; fall back to `search`.
  const resources = data.resources as Record<string, { remaining: number } | undefined>;
  return resources.code_search?.remaining ?? resources.search?.remaining ?? 0;
}

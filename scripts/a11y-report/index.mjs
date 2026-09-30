/**
 * Summarise the weekly strict Storybook a11y run and post it to Slack.
 *
 * Reads `<RESULTS_DIR>/a11y-<package>/a11y-results.json` (vitest JSON reporter
 * output, one artifact per package), writes a Markdown summary to
 * `$GITHUB_STEP_SUMMARY`, and posts a Block Kit message via `chat.postMessage`.
 * Exits 1 when there are violations or a package didn't run, so the workflow
 * run shows red. Slack failures are logged but don't change the exit code.
 *
 * Env:
 *   RESULTS_DIR          Directory the workflow downloaded the artifacts into. Default: a11y-results
 *   SLACK_BOT_TOKEN      Bot token with `chat:write` (bot must be in the channel).
 *   SLACK_CHANNEL_ID     Channel to post to.
 *   RUN_URL              Optional. Linked from the message.
 *   GITHUB_STEP_SUMMARY  Optional. Set by GitHub Actions.
 *
 * Flags:
 *   --dry-run            Print the Slack payload and step summary instead of posting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSlackMessage, buildStepSummary } from './message.mjs';
import { scanOverrides } from './overrides.mjs';
import { isClean, summarisePackage } from './summarise.mjs';

const PACKAGES = ['react', 'react-native'];
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function readResults(dir, pkg) {
  const file = path.join(dir, `a11y-${pkg}`, 'a11y-results.json');
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.warn(`No readable results for ${pkg} at ${file}: ${err.message}`);
    return null;
  }
}

async function postToSlack(message) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID;
  if (!token || !channel) throw new Error('SLACK_BOT_TOKEN and SLACK_CHANNEL_ID are required.');

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ channel, ...message, unfurl_links: false }),
  });
  // Slack returns HTTP 200 with `ok: false` for most API errors.
  const body = await res.json();
  if (!res.ok || !body.ok) {
    throw new Error(`Slack chat.postMessage failed: ${body.error ?? `HTTP ${res.status}`}`);
  }
  console.log(`Posted a11y report to Slack channel ${channel}.`);
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const resultsDir = path.resolve(process.env.RESULTS_DIR || 'a11y-results');

  const summaries = PACKAGES.map(pkg => summarisePackage(pkg, readResults(resultsDir, pkg)));
  const overrides = scanOverrides(REPO_ROOT, PACKAGES);
  const message = buildSlackMessage(summaries, overrides, {
    runUrl: process.env.RUN_URL || undefined,
  });
  const stepSummary = buildStepSummary(summaries, overrides);

  if (dryRun) {
    console.log(JSON.stringify(message, null, 2));
    console.log(`\n${stepSummary}`);
  } else {
    if (process.env.GITHUB_STEP_SUMMARY)
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, stepSummary);
    try {
      await postToSlack(message);
    } catch (err) {
      // A Slack outage shouldn't hide the result; the run summary still has it.
      console.error(err);
    }
  }

  if (!summaries.every(isClean)) process.exitCode = 1;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

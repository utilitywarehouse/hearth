/**
 * Summarise the weekly strict Storybook a11y run, write a detailed report, sync
 * Linear issues, and post to Slack when the results changed since the last post.
 *
 * Reads `<RESULTS_DIR>/a11y-<package>/a11y-results.json` (vitest JSON reporter
 * output, one artifact per package). Writes to `<REPORT_DIR>`:
 *   report.md      Findings by component, rule and story, with fixes.
 *   findings.json  The same findings, one per violating element.
 *   state.json     Snapshot the next run compares against (PREVIOUS_STATE).
 * Also appends the summary and detailed report to `$GITHUB_STEP_SUMMARY`.
 *
 * Exits 1 when there are violations or a package didn't run, so the workflow run
 * shows red. Slack and Linear failures are logged but don't change the exit code.
 *
 * Env:
 *   RESULTS_DIR          Directory the workflow downloaded the artifacts into. Default: a11y-results
 *   REPORT_DIR           Where to write the report files. Default: a11y-report
 *   PREVIOUS_STATE       Optional. state.json from the previous run.
 *   FORCE_SLACK          'true' posts to Slack even if nothing changed.
 *   SLACK_BOT_TOKEN      Bot token with `chat:write` (bot must be in the channel).
 *   SLACK_CHANNEL_ID     Channel to post to.
 *   LINEAR_API_KEY       Optional. Linear API key; without it Linear is skipped.
 *   LINEAR_TEAM_KEY      Team for the issues. Default: UWDS
 *   LINEAR_LABEL         Label that marks the issues. Default: Accessibility
 *   LINEAR_EXTRA_LABELS  Comma-separated labels for new issues, besides the marker and
 *                        package (react / react-native) labels. Default: engineering
 *   LINEAR_PROJECT_ID    Optional. Project for new issues: UUID, identifier or URL slug.
 *   RUN_URL              Optional. Linked from the message, report and issues.
 *   REPO_URL, GITHUB_SHA Optional. Used for links to story files.
 *   GITHUB_STEP_SUMMARY  Optional. Set by GitHub Actions.
 *
 * Flags:
 *   --dry-run            Print the Slack payload and planned Linear changes instead of
 *                        making them. Report files are still written.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectFindings, groupByComponent } from './findings.mjs';
import { createLinearClient, planLinearSync, syncLinear } from './linear.mjs';
import { buildSlackMessage, buildStepSummary } from './message.mjs';
import { scanOverrides } from './overrides.mjs';
import { buildDetailedReport } from './report.mjs';
import { buildState, diffState, parseState } from './state.mjs';
import { isClean, summarisePackage } from './summarise.mjs';

const PACKAGES = ['react', 'react-native'];
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// GitHub caps each step summary at 1 MiB; leave room for the short summary.
const MAX_STEP_SUMMARY = 900_000;

function readResults(dir, pkg) {
  const file = path.join(dir, `a11y-${pkg}`, 'a11y-results.json');
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.warn(`No readable results for ${pkg} at ${file}: ${err.message}`);
    return null;
  }
}

function readPreviousState() {
  const file = process.env.PREVIOUS_STATE;
  if (!file) return null;
  try {
    return parseState(fs.readFileSync(file, 'utf8'));
  } catch {
    console.log(`No previous report state at ${file}.`);
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

async function runLinearSync({ groups, summaries, links, dryRun }) {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey && !dryRun) {
    console.log('LINEAR_API_KEY not set; skipping Linear issues.');
    return undefined;
  }
  const options = {
    teamKey: process.env.LINEAR_TEAM_KEY || 'UWDS',
    labelName: process.env.LINEAR_LABEL || 'Accessibility',
    extraLabels: (process.env.LINEAR_EXTRA_LABELS ?? 'engineering')
      .split(',')
      .map(l => l.trim())
      .filter(Boolean),
    projectId: process.env.LINEAR_PROJECT_ID || undefined,
    groups,
    ranPackages: summaries.filter(s => s.ran).map(s => s.package),
    links,
    dryRun,
  };
  try {
    if (!apiKey) {
      // Dry run without a key: show what a first sync would create.
      const ops = planLinearSync({ ...options, openIssues: [] });
      for (const op of ops) console.log(`Linear: would ${op.type} ${op.title}`);
      return ops;
    }
    return await syncLinear({ client: createLinearClient(apiKey), ...options });
  } catch (err) {
    // Like Slack, a Linear outage shouldn't hide the result.
    console.error(err);
    return undefined;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const resultsDir = path.resolve(process.env.RESULTS_DIR || 'a11y-results');
  const reportDir = path.resolve(process.env.REPORT_DIR || 'a11y-report');
  const links = {
    runUrl: process.env.RUN_URL || undefined,
    repoUrl: process.env.REPO_URL || undefined,
    sha: process.env.GITHUB_SHA || undefined,
  };

  const results = PACKAGES.map(pkg => [pkg, readResults(resultsDir, pkg)]);
  const summaries = results.map(([pkg, r]) => summarisePackage(pkg, r));
  const findings = results.flatMap(([pkg, r]) => collectFindings(pkg, r));
  const groups = groupByComponent(findings);
  const overrides = scanOverrides(REPO_ROOT, PACKAGES);

  const previous = readPreviousState();
  const state = buildState(summaries, findings, overrides, { runUrl: links.runUrl, previous });
  const changes = diffState(previous, state);
  // Nothing ran (cancelled, or both packages broke before any story): there's no
  // result to report, only a failed run, which the Actions run already shows.
  const nothingRan = !summaries.some(s => s.ran);

  const detailed = buildDetailedReport(groups, summaries, links);
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, 'report.md'), detailed);
  fs.writeFileSync(path.join(reportDir, 'findings.json'), JSON.stringify(findings, null, 2));
  console.log(`Wrote the detailed report to ${path.relative(process.cwd(), reportDir)}/.`);

  const linear = await runLinearSync({ groups, summaries, links, dryRun });

  const message = buildSlackMessage(summaries, overrides, { ...links, changes, linear });
  const forced = process.env.FORCE_SLACK === 'true';
  const shouldPost = !nothingRan && (changes.changed || forced);
  const slackNote = nothingRan
    ? "> ⚠️ No Storybook tests ran, so Slack was skipped and next week's run compares against the last good report.\n\n"
    : shouldPost
      ? ''
      : `> 🔕 Nothing changed since the report posted on ${previous?.date}, so Slack was skipped.\n\n`;

  let stepSummary = slackNote + buildStepSummary(summaries, overrides);
  stepSummary +=
    stepSummary.length + detailed.length < MAX_STEP_SUMMARY
      ? `\n${detailed}`
      : '\nThe detailed report is too large for this page. Download the `a11y-report` artifact.\n';

  let posted = false;
  if (dryRun) {
    console.log(
      shouldPost ? 'Would post to Slack:' : 'Nothing ran or unchanged; would not post to Slack.'
    );
    console.log(JSON.stringify(message, null, 2));
    console.log(`\n${slackNote}${buildStepSummary(summaries, overrides)}`);
  } else {
    if (process.env.GITHUB_STEP_SUMMARY)
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, stepSummary);
    if (shouldPost) {
      try {
        await postToSlack(message);
        posted = true;
      } catch (err) {
        // A Slack outage shouldn't hide the result; the run summary still has it.
        console.error(err);
      }
    } else {
      console.log(
        nothingRan
          ? 'No Storybook tests ran; not posting to Slack.'
          : `Unchanged since ${previous?.date}; not posting to Slack.`
      );
    }
  }

  // The next run compares against the last report that reached Slack, so a failed
  // post is retried next week instead of being lost.
  // A run where nothing ran keeps the previous baseline for the same reason.
  const failedPost = shouldPost && !posted && !dryRun;
  const nextState = failedPost || nothingRan ? previous : state;
  if (nextState) {
    fs.writeFileSync(path.join(reportDir, 'state.json'), JSON.stringify(nextState, null, 2));
  }

  if (!summaries.every(isClean)) process.exitCode = 1;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

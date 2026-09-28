/**
 * Post the latest snapshot's week-on-week numbers to Slack.
 *
 * Reads `data/index.json`, compares the newest entry with the one before it,
 * and sends a summary via `chat.postMessage`.
 *
 * Env:
 *   SLACK_BOT_TOKEN   Bot token with `chat:write` (bot must be in the channel).
 *   SLACK_CHANNEL_ID  Channel to post to.
 *   SNAPSHOT_DATE     Optional. Refuse to post unless the newest entry has this date,
 *                     so a stale index is never announced as this week's numbers.
 *   SNAPSHOT_PR_URL   Optional. Linked from the message.
 *   DASHBOARD_URL     Optional. Linked from the message.
 *
 * Flags:
 *   --dry-run         Print the message payload instead of posting it.
 */
import { INDEX_FILE } from '../config.ts';
import type { UsageIndex } from '../../src/data/types.ts';
import { readJson } from '../util/json.ts';
import { buildSlackMessage } from './message.ts';

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const snapshots = readJson<UsageIndex>(INDEX_FILE)?.snapshots ?? [];
  const current = snapshots.at(-1);
  if (!current) throw new Error(`No snapshots in ${INDEX_FILE} — nothing to post.`);

  const expectedDate = process.env.SNAPSHOT_DATE;
  if (expectedDate && current.date !== expectedDate) {
    throw new Error(
      `Newest snapshot is ${current.date}, expected ${expectedDate} — not posting stale numbers.`
    );
  }

  const message = buildSlackMessage(current, snapshots.at(-2), {
    prUrl: process.env.SNAPSHOT_PR_URL || undefined,
    dashboardUrl: process.env.DASHBOARD_URL || undefined,
  });

  if (dryRun) {
    console.log(JSON.stringify(message, null, 2));
    return;
  }

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
  const body = (await res.json()) as { ok: boolean; error?: string };
  if (!res.ok || !body.ok) {
    throw new Error(`Slack chat.postMessage failed: ${body.error ?? `HTTP ${res.status}`}`);
  }
  console.log(`Posted ${current.date} summary to Slack channel ${channel}.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

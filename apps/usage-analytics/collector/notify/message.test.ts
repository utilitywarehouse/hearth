import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { IndexEntry } from '../../src/data/types.ts';
import { buildSlackMessage, formatDelta } from './message.ts';

function entry(date: string, scale: number, legacyScale: number): IndexEntry {
  return {
    date,
    file: `snapshots/${date}.json`,
    packages: {
      '@utilitywarehouse/hearth-react': {
        repoCount: 15 * scale,
        fileCount: 100 * scale,
        refCount: 1000 * scale,
        legacy: false,
      },
      '@utilitywarehouse/hearth-react-native': {
        repoCount: 5,
        fileCount: 50,
        refCount: 500,
        legacy: false,
      },
    },
    orgTotals: {
      reposUsingAnyHearth: 20 * scale,
      totalHearthFiles: 300 * scale,
      totalHearthRefs: 3000 * scale,
    },
    legacyTotals: {
      reposUsingAnyLegacy: 10 * legacyScale,
      totalLegacyFiles: 100 * legacyScale,
      totalLegacyRefs: 1000 * legacyScale,
    },
  };
}

void test('formatDelta: increase is good by default', () => {
  assert.equal(formatDelta(110, 100), ':chart_with_upwards_trend: +10 (+10.0%)');
});

void test('formatDelta: decrease is celebrated when down is good', () => {
  assert.equal(formatDelta(90, 100, 'down-is-good'), ':tada: −10 (−10.0%)');
});

void test('formatDelta: increase is flagged when down is good', () => {
  assert.equal(formatDelta(101, 100, 'down-is-good'), ':warning: +1 (+1.0%)');
});

void test('formatDelta: no change and zero baseline', () => {
  assert.equal(formatDelta(5, 5), ':heavy_minus_sign: no change');
  assert.equal(formatDelta(3, 0), ':chart_with_upwards_trend: +3');
  assert.equal(formatDelta(3, undefined), ':new: first snapshot');
});

void test('message covers overall, react, react-native and legacy sections', () => {
  const msg = buildSlackMessage(entry('2026-09-28', 2, 1), entry('2026-09-21', 1, 2), {
    prUrl: 'https://github.com/org/repo/pull/1',
  });
  const text = JSON.stringify(msg.blocks);
  assert.match(text, /Overall Hearth adoption/);
  assert.match(text, /hearth-react\*/);
  assert.match(text, /hearth-react-native\*/);
  assert.match(text, /Legacy packages/);
  assert.match(text, /vs 2026-09-21/);
  assert.match(text, /pull\/1\|Review the snapshot PR/);
  // Legacy halved -> celebrated, not warned.
  assert.match(text, /Repos still on legacy:\* 10 {2}:tada:/);
  assert.match(msg.text, /40 repos/);
});

void test('first snapshot has no previous to compare against', () => {
  const msg = buildSlackMessage(entry('2026-09-28', 1, 1), undefined);
  assert.match(JSON.stringify(msg.blocks), /first snapshot/);
});

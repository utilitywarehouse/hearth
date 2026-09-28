import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Snapshot } from '../../src/data/types.ts';
import { checkRepoCountDrop } from './sanity.ts';

function snapshot(date: string, repoCount: number): Snapshot {
  const repos: Snapshot['repos'] = {};
  for (let i = 0; i < repoCount; i++) {
    repos[`org/repo-${i}`] = { clonedSha: 'sha', packages: {}, totalRefs: 0 };
  }
  return {
    schemaVersion: 1,
    date,
    generatedAt: `${date}T00:00:00Z`,
    collection: {
      dependentRepoCount: repoCount,
      reposCloned: repoCount,
      reposFailed: 0,
      searchRequestsUsed: 9,
      manifestVersion: '0.0.0',
    },
    packages: {},
    repos,
  };
}

void test('no previous snapshot passes', () => {
  assert.equal(checkRepoCountDrop(null, snapshot('2026-09-07', 6), 0.5), null);
});

void test('small week-on-week change passes', () => {
  assert.equal(
    checkRepoCountDrop(snapshot('2026-08-24', 43), snapshot('2026-08-31', 40), 0.5),
    null
  );
});

void test('drop exactly at the threshold passes', () => {
  assert.equal(
    checkRepoCountDrop(snapshot('2026-08-24', 40), snapshot('2026-08-31', 20), 0.5),
    null
  );
});

void test('sharp drop fails with both counts in the message', () => {
  const err = checkRepoCountDrop(snapshot('2026-08-24', 43), snapshot('2026-08-31', 6), 0.5);
  assert.ok(err);
  assert.match(err, /6 repos, down from 43/);
});

void test('previous snapshot with zero repos passes', () => {
  assert.equal(checkRepoCountDrop(snapshot('2026-08-24', 0), snapshot('2026-08-31', 0), 0.5), null);
});

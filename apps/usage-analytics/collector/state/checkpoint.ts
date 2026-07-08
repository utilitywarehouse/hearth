import fs from 'node:fs';
import { CHECKPOINT_FILE, DISCOVERY_TERMS } from '../config.ts';
import type { Checkpoint } from '../../src/data/types.ts';
import { readJson, writeJson } from '../util/json.ts';

/** Load the resume checkpoint, or create a fresh discovery cycle if none/stale. */
export function loadCheckpoint(runId: string, nowIso: string): Checkpoint {
  const existing = readJson<Checkpoint>(CHECKPOINT_FILE);
  if (existing && existing.phase !== 'done') return existing;
  return freshCheckpoint(runId, nowIso);
}

export function freshCheckpoint(runId: string, nowIso: string): Checkpoint {
  return {
    runId,
    phase: 'discovery',
    discovery: { queue: [...DISCOVERY_TERMS], found: {}, searchRequestsUsed: 0 },
    pendingRepos: [],
    reposParsed: 0,
    startedAt: nowIso,
    lastUpdatedAt: nowIso,
  };
}

export function saveCheckpoint(cp: Checkpoint, nowIso: string): void {
  cp.lastUpdatedAt = nowIso;
  writeJson(CHECKPOINT_FILE, cp);
}

export function clearCheckpoint(): void {
  try {
    fs.rmSync(CHECKPOINT_FILE, { force: true });
  } catch {
    /* ignore */
  }
}

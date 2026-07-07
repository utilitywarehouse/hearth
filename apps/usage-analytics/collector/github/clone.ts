import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { CLONES_DIR } from '../config.ts';

const exec = promisify(execFile);

export interface CloneResult {
  dir: string;
  sha: string;
}

/**
 * Shallow-clone a repo's default branch to a transient directory and return its
 * path + HEAD sha. `--depth 1 --single-branch` skips all history; blobs are only
 * those at HEAD. The token is passed via the remote URL and never logged.
 */
export async function cloneRepo(fullName: string, token: string): Promise<CloneResult> {
  const dir = path.join(CLONES_DIR, fullName.replace('/', '__'));
  await removeDir(dir);
  fs.mkdirSync(path.dirname(dir), { recursive: true });

  const url = `https://x-access-token:${token}@github.com/${fullName}.git`;
  try {
    await exec('git', ['clone', '--depth', '1', '--single-branch', '--quiet', url, dir], {
      timeout: 5 * 60 * 1000,
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch (err) {
    // Re-throw with the token stripped from any message.
    throw new Error(`clone failed for ${fullName}: ${scrub(String(err), token)}`, { cause: err });
  }

  const { stdout } = await exec('git', ['-C', dir, 'rev-parse', 'HEAD']);
  return { dir, sha: stdout.trim() };
}

/** Delete a clone once parsed, to keep disk bounded. */
export async function removeDir(dir: string): Promise<void> {
  await fs.promises.rm(dir, { recursive: true, force: true });
}

function scrub(text: string, token: string): string {
  return token ? text.split(token).join('***') : text;
}

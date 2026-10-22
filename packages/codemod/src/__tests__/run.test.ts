import { execSync, spawnSync } from 'node:child_process';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkGitStatus, run, runJscodeshiftTransform } from '../run';

vi.mock('node:child_process', () => ({ execSync: vi.fn(), spawnSync: vi.fn() }));

const execSyncMock = vi.mocked(execSync);
const spawnSyncMock = vi.mocked(spawnSync);
const exit = vi.spyOn(process, 'exit');

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  exit.mockImplementation(() => {
    throw new Error('process.exit');
  });
  spawnSyncMock.mockReturnValue({ status: 0 } as never);
});

afterEach(() => {
  vi.clearAllMocks();
  process.exitCode = undefined;
});

describe('checkGitStatus', () => {
  it('continues on a clean tree', () => {
    execSyncMock.mockReturnValue('');
    expect(() => checkGitStatus(false)).not.toThrow();
  });

  it('exits 1 on a dirty tree', () => {
    execSyncMock.mockReturnValue(' M file.ts\n');
    expect(() => checkGitStatus(false)).toThrow('process.exit');
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('continues on a dirty tree with --force', () => {
    execSyncMock.mockReturnValue(' M file.ts\n');
    expect(() => checkGitStatus(true)).not.toThrow();
  });

  it('treats "not a git repository" as clean', () => {
    execSyncMock.mockImplementation(() => {
      throw Object.assign(new Error('git failed'), { stderr: 'fatal: not a git repository' });
    });
    expect(() => checkGitStatus(false)).not.toThrow();
  });

  it('prints the spawn error when git fails without writing to stderr', () => {
    execSyncMock.mockImplementation(() => {
      throw new Error('spawnSync git ENOENT');
    });
    expect(() => checkGitStatus(false)).toThrow('process.exit');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('spawnSync git ENOENT'));
    expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('stash or commit'));
  });

  it('exits 1 and prints the git error when git itself fails', () => {
    execSyncMock.mockImplementation(() => {
      throw Object.assign(new Error('git failed'), { stderr: 'fatal: detected dubious ownership' });
    });
    expect(() => checkGitStatus(false)).toThrow('process.exit');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('dubious ownership'));
  });
});

describe('run', () => {
  const argv = {
    codemod: 'react/v1/migration',
    paths: ['.'],
    dry: false,
    print: false,
    force: false,
  };

  it('skips the git check with --dry', () => {
    run({ ...argv, dry: true });
    expect(execSyncMock).not.toHaveBeenCalled();
    expect(spawnSyncMock).toHaveBeenCalled();
  });

  it('exits 1 for a path that does not exist', () => {
    expect(() => run({ ...argv, paths: ['does-not-exist'], dry: true })).toThrow('process.exit');
    expect(spawnSyncMock).not.toHaveBeenCalled();
  });
});

describe('runJscodeshiftTransform', () => {
  const flags = { dry: false, print: false, force: false };

  it('throws for an unknown codemod', () => {
    expect(() => runJscodeshiftTransform('react/v1/nope', [], flags)).toThrow(/not found/);
  });

  it.each(['/tmp/evil', 'react/v1/../../../x', 'react/v1/__tests__/foo'])(
    'rejects the codemod %s that is not a bundled transform',
    codemod => {
      expect(() => runJscodeshiftTransform(codemod, [], flags)).toThrow(/not found/);
      expect(spawnSyncMock).not.toHaveBeenCalled();
    }
  );

  it('propagates a non-zero jscodeshift status', () => {
    spawnSyncMock.mockReturnValue({ status: 3 } as never);
    runJscodeshiftTransform('react/v1/migration', [], flags);
    expect(process.exitCode).toBe(3);
  });

  it('fails when jscodeshift is killed by a signal', () => {
    spawnSyncMock.mockReturnValue({ status: null, signal: 'SIGKILL' } as never);
    runJscodeshiftTransform('react/v1/migration', [], flags);
    expect(process.exitCode).toBe(1);
  });

  it('passes --fail-on-error to jscodeshift', () => {
    runJscodeshiftTransform('react/v1/migration', [], flags);
    expect(spawnSyncMock).toHaveBeenCalledWith(
      'node',
      expect.arrayContaining(['--fail-on-error']),
      expect.anything()
    );
  });
});

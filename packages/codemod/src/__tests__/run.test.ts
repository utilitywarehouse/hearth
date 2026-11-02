import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { checkGitStatus, run, runJscodeshiftTransform } from '../run';

vi.mock('node:child_process', () => ({ execFileSync: vi.fn(), spawnSync: vi.fn() }));

const execFileSyncMock = vi.mocked(execFileSync);
const spawnSyncMock = vi.mocked(spawnSync);
let exit: MockInstance<typeof process.exit>;

beforeEach(() => {
  // created per test: `restoreMocks` detaches a spy made at module level
  exit = vi.spyOn(process, 'exit');
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
  const targets = [__dirname];

  // answers `git rev-parse --show-toplevel` with `root` and `git status --porcelain` with `status`
  const mockGit = (status: string, root = '/repo') => {
    execFileSyncMock.mockImplementation(((_file: string, args: Array<string>) =>
      args[0] === 'rev-parse' ? `${root}\n` : status) as never);
  };

  it('continues on a clean tree', () => {
    mockGit('');
    expect(() => checkGitStatus(targets, false)).not.toThrow();
  });

  it('exits 1 on a dirty tree', () => {
    mockGit(' M file.ts\n');
    expect(() => checkGitStatus(targets, false)).toThrow('process.exit');
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('continues on a dirty tree with --force', () => {
    mockGit(' M file.ts\n');
    expect(() => checkGitStatus(targets, true)).not.toThrow();
  });

  it("checks the target's repository rather than the working directory", () => {
    mockGit(' M file.ts\n', '/dirty-app');
    expect(() => checkGitStatus(['/dirty-app/src'], false)).toThrow('process.exit');
    expect(execFileSyncMock).toHaveBeenCalledWith(
      'git',
      ['status', '--porcelain'],
      expect.objectContaining({ cwd: '/dirty-app' })
    );
  });

  it('checks a repository shared by several targets once', () => {
    mockGit('');
    checkGitStatus([__dirname, path.dirname(__dirname)], false);
    const statusCalls = execFileSyncMock.mock.calls.filter(([, args]) => args?.[0] === 'status');
    expect(statusCalls).toHaveLength(1);
  });

  it('exits 1 when any of several repositories is dirty', () => {
    execFileSyncMock.mockImplementation(((_file: string, args: Array<string>, options: object) => {
      const { cwd } = options as { cwd: string };
      if (args[0] === 'rev-parse') {
        return cwd === __dirname ? '/clean\n' : '/dirty\n';
      }
      return cwd === '/dirty' ? ' M file.ts\n' : '';
    }) as never);
    expect(() => checkGitStatus([__dirname, path.dirname(__dirname)], false)).toThrow(
      'process.exit'
    );
  });

  it('treats "not a git repository" as clean', () => {
    execFileSyncMock.mockImplementation(() => {
      throw Object.assign(new Error('git failed'), { stderr: 'fatal: not a git repository' });
    });
    expect(() => checkGitStatus(targets, false)).not.toThrow();
  });

  it('prints the spawn error when git fails without writing to stderr', () => {
    execFileSyncMock.mockImplementation(() => {
      throw new Error('spawnSync git ENOENT');
    });
    expect(() => checkGitStatus(targets, false)).toThrow('process.exit');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('spawnSync git ENOENT'));
    expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('stash or commit'));
  });

  it('exits 1 and prints the git error when git itself fails', () => {
    execFileSyncMock.mockImplementation(() => {
      throw Object.assign(new Error('git failed'), { stderr: 'fatal: detected dubious ownership' });
    });
    expect(() => checkGitStatus(targets, false)).toThrow('process.exit');
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
    expect(execFileSyncMock).not.toHaveBeenCalled();
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
    expect(() => runJscodeshiftTransform('react/v1/nope', [__dirname], flags)).toThrow(/not found/);
  });

  it.each(['/tmp/evil', 'react/v1/../../../x', 'react/v1/__tests__/foo'])(
    'rejects the codemod %s that is not a bundled transform',
    codemod => {
      expect(() => runJscodeshiftTransform(codemod, [__dirname], flags)).toThrow(/not found/);
      expect(spawnSyncMock).not.toHaveBeenCalled();
    }
  );

  it('propagates a non-zero jscodeshift status', () => {
    spawnSyncMock.mockReturnValue({ status: 3 } as never);
    runJscodeshiftTransform('react/v1/migration', [__dirname], flags);
    expect(process.exitCode).toBe(3);
  });

  it('fails when jscodeshift is killed by a signal', () => {
    spawnSyncMock.mockReturnValue({ status: null, signal: 'SIGKILL' } as never);
    runJscodeshiftTransform('react/v1/migration', [__dirname], flags);
    expect(process.exitCode).toBe(1);
  });

  it('passes --fail-on-error to jscodeshift', () => {
    runJscodeshiftTransform('react/v1/migration', [__dirname], flags);
    expect(spawnSyncMock).toHaveBeenCalledWith(
      'node',
      expect.arrayContaining(['--fail-on-error']),
      expect.anything()
    );
  });

  it('parses .ts files without JSX so angle-bracket assertions work', () => {
    runJscodeshiftTransform('react/v1/migration', [__dirname], flags);
    const parsers = spawnSyncMock.mock.calls.map(([, args]) => {
      const list = args as Array<string>;
      return list[list.indexOf('--parser') + 1];
    });
    expect(parsers).toEqual(['ts', 'tsx']);
  });

  it('sends an explicit .ts file only to the ts parser', () => {
    const file = path.join(__dirname, 'run.test.ts');
    runJscodeshiftTransform('react/v1/migration', [file], flags);
    expect(spawnSyncMock).toHaveBeenCalledTimes(1);
    expect(spawnSyncMock.mock.calls[0][1]).toEqual(expect.arrayContaining(['ts', file]));
  });

  it('fails when only the second pass fails', () => {
    spawnSyncMock
      .mockReturnValueOnce({ status: 0 } as never)
      .mockReturnValueOnce({ status: 2 } as never);
    runJscodeshiftTransform('react/v1/migration', [__dirname], flags);
    expect(process.exitCode).toBe(2);
  });
});

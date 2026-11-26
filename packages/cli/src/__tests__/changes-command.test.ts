import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import { createConsumer, installPackage } from './consumer-fixture.js';
import { JSON_CONTRACT } from './json-contract.js';

const REACT = '@utilitywarehouse/hearth-react';
const LATEST_URL = 'https://registry.npmjs.org/@utilitywarehouse%2Fhearth-react/latest';
const CHANGELOG_URL =
  'https://raw.githubusercontent.com/utilitywarehouse/hearth/main/packages/react/CHANGELOG.md';

const CHANGELOG = `# ${REACT}

## 0.3.0

### Minor Changes

- [#3](https://example.com/3) Thanks [@a](https://example.com/a)! - 💔 [BREAKING CHANGE]: \`Button\` drops \`size\`

  Use \`variant\` instead.

### Patch Changes

- [#4](https://example.com/4) Thanks [@a](https://example.com/a)! - 🐛 [FIX]: Focus ring

## 0.2.0

### Minor Changes

- [#2](https://example.com/2) Thanks [@a](https://example.com/a)! - 🌟 [FEATURE]: \`VisuallyHidden\` component

## 0.1.0

### Minor Changes

- [#1](https://example.com/1) Thanks [@a](https://example.com/a)! - 🌟 [FEATURE]: First release
`;

type Route = string | { status: number } | Error | Response;

/** A fetch that answers from `routes` by URL and records every URL asked for. */
const stubFetch = (routes: Record<string, Route>) => {
  const requested: Array<string> = [];
  const fetch = ((input: string) => {
    requested.push(input);
    const route = routes[input];
    if (route instanceof Error) return Promise.reject(route);
    if (route instanceof Response) return Promise.resolve(route);
    if (route === undefined) return Promise.resolve(new Response('', { status: 404 }));
    return Promise.resolve(
      typeof route === 'string' ? new Response(route) : new Response('', route)
    );
  }) as typeof globalThis.fetch;
  return { fetch, requested };
};

const DEFAULT_ROUTES: Record<string, Route> = {
  [LATEST_URL]: JSON.stringify({ name: REACT, version: '0.3.0' }),
  [CHANGELOG_URL]: CHANGELOG,
};

const consumerOn = (version: string) => {
  const consumer = createConsumer();
  installPackage(consumer, REACT, undefined, version);
  return consumer;
};

const cli = async (
  argv: Array<string>,
  { cwd = consumerOn('0.1.0'), routes = DEFAULT_ROUTES } = {}
) => {
  let out = '';
  let err = '';
  const { fetch, requested } = stubFetch(routes);
  const code = await run(['changes', ...argv], {
    cwd,
    stdout: text => (out += text),
    stderr: text => (err += text),
    fetch,
  });
  return { code, out, err, requested };
};

describe('hearth changes', () => {
  it('lists every entry after the installed version up to latest, breaking changes first', async () => {
    const { code, out, err } = await cli(['react']);

    expect(err).toBe('');
    expect(code).toBe(0);
    expect(out).toBe(`# ${REACT} 0.1.0 → 0.3.0

3 entries in 2 versions: 1 breaking, 1 feature, 0 enhancement, 1 fix, 0 other

## 💔 Breaking changes

- **0.3.0** [#3](https://example.com/3) Thanks [@a](https://example.com/a)! - 💔 [BREAKING CHANGE]: \`Button\` drops \`size\`

  Use \`variant\` instead.

## 0.3.0

- [#3](https://example.com/3) Thanks [@a](https://example.com/a)! - 💔 [BREAKING CHANGE]: \`Button\` drops \`size\`

  Use \`variant\` instead.
- [#4](https://example.com/4) Thanks [@a](https://example.com/a)! - 🐛 [FIX]: Focus ring

## 0.2.0

- [#2](https://example.com/2) Thanks [@a](https://example.com/a)! - 🌟 [FEATURE]: \`VisuallyHidden\` component
`);
  });

  it('accepts the full package name', async () => {
    const { code, out } = await cli([REACT]);

    expect(code).toBe(0);
    expect(out).toContain(`# ${REACT} 0.1.0 → 0.3.0`);
  });

  it('says there are no changes when the installed version is latest', async () => {
    const { code, out } = await cli(['react'], { cwd: consumerOn('0.3.0') });

    expect(code).toBe(0);
    expect(out).toBe(`# ${REACT} 0.3.0 → 0.3.0\n\nNo changes: 0.3.0 is already 0.3.0 or later.\n`);
  });

  it('prints the same data as JSON with --json', async () => {
    const { code, out } = await cli(['react', '--json'], { cwd: consumerOn('0.2.0') });

    expect(code).toBe(0);
    expect(JSON_CONTRACT.changes.safeParse(JSON.parse(out)).error?.issues).toBeUndefined();
    expect(JSON.parse(out)).toEqual({
      package: { name: REACT, version: '0.2.0' },
      from: '0.2.0',
      to: '0.3.0',
      counts: { breaking: 1, feature: 0, enhancement: 0, fix: 1, other: 0 },
      versions: [
        {
          version: '0.3.0',
          entries: [
            {
              type: 'breaking',
              text: '[#3](https://example.com/3) Thanks [@a](https://example.com/a)! - 💔 [BREAKING CHANGE]: `Button` drops `size`\n\nUse `variant` instead.',
            },
            {
              type: 'fix',
              text: '[#4](https://example.com/4) Thanks [@a](https://example.com/a)! - 🐛 [FIX]: Focus ring',
            },
          ],
        },
      ],
    });
  });

  it('uses --from and --to in place of the installed and latest versions, without asking npm', async () => {
    const { code, out, requested } = await cli(['react', '--from', '0.1.0', '--to', '0.2.0'], {
      cwd: createConsumer(),
    });

    expect(code).toBe(0);
    expect(out).toContain(`# ${REACT} 0.1.0 → 0.2.0`);
    expect(out).not.toContain('## 0.3.0');
    expect(requested).toEqual([CHANGELOG_URL]);
  });

  it('exits 3 and asks for --from when the package is not installed', async () => {
    const { code, out, err, requested } = await cli(['react'], { cwd: createConsumer() });

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain(`${REACT} is not installed in this project`);
    expect(err).toContain('hearth changes react --from');
    expect(requested).toEqual([]);
  });

  it.each([
    ['--from', 'latest'],
    ['--to', 'v1'],
  ])('exits 2 for %s %s', async (flag, value) => {
    const { code, err, requested } = await cli(['react', flag, value]);

    expect(code).toBe(2);
    expect(err).toContain(`${flag} must be a version such as 0.37.0, not "${value}"`);
    expect(requested).toEqual([]);
  });

  it('exits 1 and suggests close names for an unknown package', async () => {
    const { code, err } = await cli(['raect']);

    expect(code).toBe(1);
    expect(err).toBe('No Hearth package "raect". Did you mean: react?\n');
  });

  it('exits 2 without a package', async () => {
    const { code, err } = await cli([]);

    expect(code).toBe(2);
    expect(err).toContain('hearth changes needs a package');
  });

  it('exits 3 with what to do when the network is unreachable', async () => {
    const offline = Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } });
    const { code, out, err } = await cli(['react'], {
      routes: { ...DEFAULT_ROUTES, [LATEST_URL]: offline },
    });

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toMatch(
      /^Could not reach registry\.npmjs\.org for the latest version of @utilitywarehouse\/hearth-react \(ENOTFOUND\)\./
    );
    expect(err).toContain('If you are offline, rate-limited or in a sandbox, allow those hosts');
  });

  it('exits 3 when GitHub rate-limits the changelog request', async () => {
    const { code, err } = await cli(['react'], {
      routes: { ...DEFAULT_ROUTES, [CHANGELOG_URL]: { status: 429 } },
    });

    expect(code).toBe(3);
    expect(err).toMatch(
      /^raw\.githubusercontent\.com refused or rate-limited for the @utilitywarehouse\/hearth-react changelog \(HTTP 429\)\./
    );
  });

  it('exits 3, not a crash, when npm answers with something that is not JSON', async () => {
    const { code, err } = await cli(['react'], {
      routes: { ...DEFAULT_ROUTES, [LATEST_URL]: '<html>Sign in to the network</html>' },
    });

    expect(code).toBe(3);
    expect(err).toMatch(/^registry\.npmjs\.org gave no usable latest version/);
  });

  it('exits 3 when the response body cannot be read', async () => {
    const broken = new Response(
      new ReadableStream({
        pull: controller => controller.error(new TypeError('terminated')),
      })
    );
    const { code, err } = await cli(['react'], {
      routes: { ...DEFAULT_ROUTES, [CHANGELOG_URL]: broken },
    });

    expect(code).toBe(3);
    expect(err).toMatch(/^Could not read the response from raw\.githubusercontent\.com/);
  });

  it('ignores build metadata on the installed version', async () => {
    const { code, out } = await cli(['react'], { cwd: consumerOn('0.1.0+abc') });

    expect(code).toBe(0);
    expect(out).toContain(`# ${REACT} 0.1.0 → 0.3.0`);
  });

  it('asks for --from when the installed version cannot be read', async () => {
    const { code, err, requested } = await cli(['react'], { cwd: consumerOn('not-a-version') });

    expect(code).toBe(3);
    expect(err).toContain('version could not be read');
    expect(requested).toEqual([]);
  });
});

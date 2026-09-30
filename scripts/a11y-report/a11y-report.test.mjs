import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildSlackMessage, buildStepSummary } from './message.mjs';
import { findOverrides } from './overrides.mjs';
import { isClean, summarisePackage } from './summarise.mjs';

// Shapes match vitest's `--reporter=json` output and addon-a11y's jest-axe messages.
const axeMessage = (...ids) =>
  ids
    .map(
      id =>
        `Error: expect(received).toHaveNoViolations(expected)\n\nExpected the HTML found at $('#x') to have no violations:\n\n<button>\n\nReceived:\n\n\u001b[31m"Buttons must have discernible text (${id})"\u001b[39m\n\nTry fixing it with this help: https://dequeuniversity.com/rules/axe/4.12/${id}`
    )
    .join('\n────────\n');

const nativeMessage = (...ids) =>
  `Error: ${ids.length} native accessibility violation(s):\n` +
  ids.map(id => `[native-a11y] ${id}: something\n    <div>`).join('\n');

const results = tests => ({
  testResults: [
    {
      name: '/repo/packages/react-native/src/components/Button/Button.stories.tsx',
      assertionResults: tests.map(([title, status, failureMessages = []]) => ({
        title,
        fullName: `Button ${title}`,
        status,
        failureMessages,
      })),
    },
  ],
});

describe('summarisePackage', () => {
  it('reports a missing run as not run, never clean', () => {
    const s = summarisePackage('react', null);
    assert.equal(s.ran, false);
    assert.equal(isClean(s), false);
  });

  it('counts stories, axe and native failures per story', () => {
    const s = summarisePackage(
      'react-native',
      results([
        ['Playground', 'passed'],
        ['Variants', 'failed', [axeMessage('button-name', 'color-contrast', 'button-name')]],
        ['Sizes', 'failed', [nativeMessage('touch-target-size', 'touch-target-size')]],
        ['Icon', 'failed', [axeMessage('button-name')]],
        ['Skipped', 'skipped'],
      ])
    );
    assert.equal(s.total, 4);
    assert.equal(s.axeFailing, 2);
    assert.equal(s.nativeFailing, 1);
    assert.deepEqual(s.axeRules, [
      { id: 'button-name', stories: 2 },
      { id: 'color-contrast', stories: 1 },
    ]);
    assert.deepEqual(s.nativeRules, [{ id: 'touch-target-size', stories: 1 }]);
    assert.equal(isClean(s), false);
  });

  it('keeps non-a11y failures separate as broken stories', () => {
    const s = summarisePackage(
      'react',
      results([['Playground', 'failed', ['TypeError: boom\n  at x']]])
    );
    assert.equal(s.axeFailing, 0);
    assert.deepEqual(s.broken, [{ story: 'Button Playground', message: 'TypeError: boom' }]);
  });

  it('treats a story file that failed to load as broken', () => {
    const s = summarisePackage('react', {
      testResults: [{ name: 'Foo.stories.tsx', assertionResults: [], message: 'Failed to load' }],
    });
    assert.deepEqual(s.broken, [{ story: 'Foo.stories.tsx', message: 'Failed to load' }]);
  });

  it('is clean when every story passes', () => {
    assert.equal(isClean(summarisePackage('react', results([['Playground', 'passed']]))), true);
  });
});

describe('findOverrides', () => {
  it('finds axe rule opt-outs and full disables', () => {
    const source = `
export const A = {
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
};
export const B = { parameters: { a11y: { test: 'off' } } };
export const C = { parameters: { a11y: { context: { exclude: ['.x'] } } } };
`;
    assert.deepEqual(findOverrides(source), [
      { line: 3, kind: 'axe', rules: ['color-contrast'] },
      { line: 5, kind: 'axe', rules: ['*'] },
    ]);
  });

  it('finds native opt-outs with their reason, ignoring severity downgrades', () => {
    const source = `const meta = {
  parameters: {
    nativeA11y: {
      rules: { 'touch-target-size': 'off', 'no-nested-pressables': 'warn' },
      reason: 'Layout demo',
    },
  },
};
export const D = { parameters: { nativeA11y: { disable: true, reason: "Scaffolding only" } } };`;
    assert.deepEqual(findOverrides(source), [
      { line: 3, kind: 'native', rules: ['touch-target-size'], reason: 'Layout demo' },
      { line: 9, kind: 'native', rules: ['*'], reason: 'Scaffolding only' },
    ]);
  });
});

describe('buildSlackMessage', () => {
  const texts = message =>
    message.blocks
      .flatMap(b => [b.text?.text, ...(b.elements ?? []).map(e => e.text?.text ?? e.text)])
      .filter(Boolean);

  const dirty = summarisePackage(
    'react-native',
    results([
      ['A', 'failed', [axeMessage('button-name')]],
      ['B', 'failed', [nativeMessage('toggle-has-state')]],
      ['C', 'failed', [axeMessage('button-name')]],
    ])
  );
  const clean = summarisePackage('react', results([['A', 'passed']]));

  it('shows each package status, top rules and the run link', () => {
    const message = buildSlackMessage([clean, dirty], [], {
      runUrl: 'https://run',
      date: '2026-10-05',
    });
    const all = texts(message).join('\n');
    assert.match(all, /✅ \*Hearth React\* — 1 stories checked/);
    assert.match(all, /❌ \*Hearth React Native\* — 3 stories checked/);
    assert.match(all, /🔴 `button-name` — 2 stories/);
    assert.match(all, /📱 `toggle-has-state` — 1 story/);
    assert.equal(message.text, 'Weekly accessibility report: violations found');
    const button = message.blocks.find(b => b.type === 'actions').elements[0];
    assert.deepEqual([button.url, button.style], ['https://run', 'danger']);
  });

  it('warns instead of showing a false pass when a package did not run', () => {
    const all = texts(buildSlackMessage([summarisePackage('react', null)], [])).join('\n');
    assert.match(all, /⚠️ \*Hearth React\* — Storybook tests didn't run/);
  });

  it('counts overridden stories', () => {
    const overrides = [
      { package: 'react', file: 'a.stories.tsx', line: 3, kind: 'axe', rules: ['*'] },
      {
        package: 'react',
        file: 'a.stories.tsx',
        line: 3,
        kind: 'native',
        rules: ['*'],
        reason: 'x',
      },
      { package: 'react', file: 'b.stories.tsx', line: 9, kind: 'axe', rules: ['color-contrast'] },
    ];
    assert.match(
      texts(buildSlackMessage([clean], overrides)).join('\n'),
      /🙈 2 stories override a11y rules/
    );
  });
});

describe('buildStepSummary', () => {
  it('lists overrides with their reason', () => {
    const md = buildStepSummary(
      [summarisePackage('react', results([['A', 'passed']]))],
      [
        {
          package: 'react',
          file: 'a.stories.tsx',
          line: 3,
          kind: 'native',
          rules: ['touch-target-size'],
        },
      ]
    );
    assert.match(
      md,
      /\| `a.stories.tsx:3` \| native \| `touch-target-size` \| _no reason given_ \|/
    );
  });
});

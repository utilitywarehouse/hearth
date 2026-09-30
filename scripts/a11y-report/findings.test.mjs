import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { collectFindings, groupByComponent } from './findings.mjs';
import { issueTitle, parseIssueTitle, planLinearSync } from './linear.mjs';
import { buildSlackMessage } from './message.mjs';
import { buildDetailedReport } from './report.mjs';
import { buildState, diffState, parseState } from './state.mjs';
import { summarisePackage } from './summarise.mjs';

// Real addon-a11y (jest-axe) and native-rule message shapes, trimmed.
const axeBlock = (rule, target = '#x', html = '<button class="b">') =>
  `Expected the HTML found at $('${target}') to have no violations:\n\n${html}\n\nReceived:\n\n\u001b[31m"Buttons must have discernible text (${rule})"\u001b[39m\n\nFix any of the following:\n  aria-label attribute does not exist or is empty\n  Element has no title attribute\n\nYou can find more information on this issue here: \nhttps://dequeuniversity.com/rules/axe/4.12/${rule}?application=axeAPI`;
const axeMessage = (...blocks) =>
  `Error: expect(received).toHaveNoViolations(expected)\n\n${blocks.join('\n\n────────\n\n')}\n    at Proxy.expectWrapper (http://localhost/chunk.js:1:1)`;
const nativeMessage = (...rules) =>
  `Error: ${rules.length} native accessibility violation(s):\n` +
  rules
    .map(r => `[native-a11y] ${r}: View has onPress but no role\n    <div tabindex="0">`)
    .join('\n');

const results = files => ({
  testResults: Object.entries(files).map(([component, tests]) => ({
    name: `/__w/hearth/hearth/packages/react-native/src/components/${component}/${component}.stories.tsx`,
    assertionResults: tests.map(([title, status, failureMessages = []]) => ({
      title,
      fullName: title,
      status,
      failureMessages,
    })),
  })),
});

const run = results({
  Button: [
    // Retries repeat the same message.
    [
      'Playground',
      'failed',
      [axeMessage(axeBlock('button-name')), axeMessage(axeBlock('button-name'))],
    ],
    ['Sizes', 'failed', [axeMessage(axeBlock('button-name', '#a'), axeBlock('button-name', '#b'))]],
    ['Kitchen Sink', 'passed'],
  ],
  Card: [['Pressable', 'failed', [nativeMessage('pressable-has-role', 'no-nested-pressables')]]],
});

describe('collectFindings', () => {
  const findings = collectFindings('react-native', run);

  it('returns one finding per element, without retry duplicates', () => {
    assert.equal(findings.length, 5);
    assert.deepEqual(
      findings.map(f => [f.component, f.story, f.rule, f.target ?? null]),
      [
        ['Button', 'Playground', 'button-name', '#x'],
        ['Button', 'Sizes', 'button-name', '#a'],
        ['Button', 'Sizes', 'button-name', '#b'],
        ['Card', 'Pressable', 'pressable-has-role', null],
        ['Card', 'Pressable', 'no-nested-pressables', null],
      ]
    );
  });

  it('keeps the element, fix advice and help link, with a repo-relative file', () => {
    const [f] = findings;
    assert.equal(f.file, 'packages/react-native/src/components/Button/Button.stories.tsx');
    assert.equal(f.html, '<button class="b">');
    assert.equal(f.helpUrl, 'https://dequeuniversity.com/rules/axe/4.12/button-name');
    assert.equal(f.impact, 'critical');
    assert.deepEqual(f.fix, [
      'Fix any of the following:',
      'aria-label attribute does not exist or is empty',
      'Element has no title attribute',
    ]);
    assert.equal(findings[3].html, '<div tabindex="0">');
  });
});

describe('groupByComponent', () => {
  const groups = groupByComponent(collectFindings('react-native', run));

  it('groups rules and stories per component, most affected first', () => {
    assert.deepEqual(
      groups.map(g => [g.key, g.stories, g.rules.map(r => r.rule)]),
      [
        ['react-native/Button', ['Playground', 'Sizes'], ['button-name']],
        ['react-native/Card', ['Pressable'], ['pressable-has-role', 'no-nested-pressables']],
      ]
    );
  });

  it('fingerprints stories and rules, not element markup', () => {
    const moved = results({
      Button: [
        ['Sizes', 'failed', [axeMessage(axeBlock('button-name', '#c', '<button class="new">'))]],
        ['Playground', 'failed', [axeMessage(axeBlock('button-name', '#z'))]],
      ],
    });
    const [again] = groupByComponent(collectFindings('react-native', moved));
    assert.equal(again.fingerprint, groups[0].fingerprint);
  });
});

describe('buildDetailedReport', () => {
  it('lists each component with its rules, stories, example and fixes', () => {
    const groups = groupByComponent(collectFindings('react-native', run));
    const md = buildDetailedReport(
      groups,
      [summarisePackage('react-native', run), summarisePackage('react', null)],
      { repoUrl: 'https://github.com/o/r', sha: 'abc', date: '2026-10-05' }
    );
    assert.match(md, /\| Button \| 2 \| 🔴 `button-name` \|/);
    assert.match(md, /`button-name`: Buttons must have discernible text \(web · critical\)/);
    assert.match(md, /\*\*2 stories:\*\* `Playground`, `Sizes`/);
    assert.match(md, /- Element has no title attribute/);
    assert.match(md, /\(https:\/\/github.com\/o\/r\/blob\/abc\/packages\/react-native\/src/);
    assert.match(md, /## hearth-react\n\nStorybook tests didn't run/);
  });
});

describe('report state', () => {
  const summaries = [summarisePackage('react-native', run)];
  const findings = collectFindings('react-native', run);
  const state = buildState(summaries, findings, [], { date: '2026-10-05' });

  it('is unchanged when only element markup or order changes', () => {
    const reordered = buildState(summaries, [...findings].reverse(), [], { date: '2026-10-12' });
    assert.equal(diffState(state, reordered).changed, false);
  });

  it('reports new and fixed findings', () => {
    const fewer = buildState(summaries, findings.slice(0, 3), [], {});
    const diff = diffState(state, fewer);
    assert.equal(diff.changed, true);
    assert.deepEqual(diff.removed, [
      'a11y|react-native|Card|Pressable|native|no-nested-pressables',
      'a11y|react-native|Card|Pressable|native|pressable-has-role',
    ]);
  });

  it('treats a missing or old-format previous state as changed', () => {
    assert.equal(parseState('{"version":0,"entries":[]}'), null);
    assert.equal(parseState('not json'), null);
    assert.equal(diffState(null, state).first, true);
  });

  it('shows the change in the Slack message', () => {
    const diff = diffState(state, buildState(summaries, findings.slice(0, 3), [], {}));
    const text = JSON.stringify(buildSlackMessage(summaries, [], { changes: diff }));
    assert.match(text, /Since last report: 🆕 0 new findings · ✅ 2 fixed/);
  });
});

describe('planLinearSync', () => {
  const groups = groupByComponent(collectFindings('react-native', run));
  const [button, card] = groups;
  const issue = (group, description) => ({
    id: group.key,
    identifier: 'UWDS-1',
    title: issueTitle(group.package, group.component),
    description,
    url: 'https://linear.app/x',
  });

  it('round-trips issue titles', () => {
    assert.equal(
      issueTitle('react-native', 'Button'),
      'Accessibility: fix Button (hearth-react-native)'
    );
    assert.deepEqual(parseIssueTitle('Accessibility: fix Button (hearth-react-native)'), {
      package: 'react-native',
      component: 'Button',
    });
    assert.equal(parseIssueTitle('Button is broken'), null);
  });

  it('creates issues for components without one', () => {
    const ops = planLinearSync({ groups, openIssues: [], ranPackages: ['react-native'] });
    assert.deepEqual(
      ops.map(op => [op.type, op.title]),
      [
        ['create', 'Accessibility: fix Button (hearth-react-native)'],
        ['create', 'Accessibility: fix Card (hearth-react-native)'],
      ]
    );
    assert.match(ops[0].description, /a11y-report-fingerprint: [a-f0-9]{12}/);
  });

  it('leaves unchanged issues alone and updates changed ones', () => {
    const ops = planLinearSync({
      groups,
      openIssues: [
        issue(button, `x\n\`a11y-report-fingerprint: ${button.fingerprint}\``),
        issue(card, 'x\n`a11y-report-fingerprint: 000000000000`'),
      ],
      ranPackages: ['react-native'],
    });
    assert.deepEqual(
      ops.map(op => [op.type, op.key]),
      [['update', 'react-native/Card']]
    );
  });

  it('comments once when a component is clean, and never for a package that did not run', () => {
    const open = [issue(card, `notes\n\`a11y-report-fingerprint: ${card.fingerprint}\``)];
    const ops = planLinearSync({
      groups: [button],
      openIssues: open,
      ranPackages: ['react-native'],
    });
    assert.deepEqual(
      ops.map(op => [op.type, op.key]),
      [
        ['create', 'react-native/Button'],
        ['resolve', 'react-native/Card'],
      ]
    );
    const resolve = ops[1];
    assert.match(resolve.description, /^notes\n`a11y-report-fingerprint: clean`$/);

    const again = [issue(card, resolve.description)];
    assert.deepEqual(
      planLinearSync({ groups: [], openIssues: again, ranPackages: ['react-native'] }),
      []
    );
    assert.deepEqual(planLinearSync({ groups: [], openIssues: open, ranPackages: [] }), []);
  });
});

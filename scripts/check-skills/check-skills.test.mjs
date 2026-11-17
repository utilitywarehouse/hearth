import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkSkill } from './index.mjs';

test('accepts valid frontmatter', () => {
  assert.deepEqual(checkSkill('---\nname: a\ndescription: Does a thing\n---\n# A\n'), []);
});

test('rejects an unquoted ": " in a description', () => {
  const [problem] = checkSkill('---\nname: a\ndescription: Use when: adding a thing\n---\n');
  assert.match(problem, /invalid YAML/);
});

test('rejects a missing description', () => {
  assert.deepEqual(checkSkill('---\nname: a\n---\n'), ['`description` must be a non-empty string']);
});

test('rejects a missing frontmatter block', () => {
  assert.deepEqual(checkSkill('# A\n'), ['missing `---` frontmatter block']);
});

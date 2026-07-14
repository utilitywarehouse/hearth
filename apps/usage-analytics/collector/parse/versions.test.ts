import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectDeclaredVersions } from './versions.ts';

const tracked = new Set(['@utilitywarehouse/hearth-react', '@utilitywarehouse/hearth-tokens']);

void test('reads a tracked dependency range', () => {
  const pkg = JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': '^2.3.0' } });
  assert.deepEqual(collectDeclaredVersions(pkg, tracked), {
    '@utilitywarehouse/hearth-react': '^2.3.0',
  });
});

void test('reads across dependencies, devDependencies, peerDependencies, optionalDependencies', () => {
  const pkg = JSON.stringify({
    dependencies: { '@utilitywarehouse/hearth-react': '^2.3.0' },
    devDependencies: { '@utilitywarehouse/hearth-tokens': '~0.4.1' },
  });
  assert.deepEqual(collectDeclaredVersions(pkg, tracked), {
    '@utilitywarehouse/hearth-react': '^2.3.0',
    '@utilitywarehouse/hearth-tokens': '~0.4.1',
  });
});

void test('ignores untracked packages', () => {
  const pkg = JSON.stringify({ dependencies: { react: '^19.0.0' } });
  assert.deepEqual(collectDeclaredVersions(pkg, tracked), {});
});

void test('malformed JSON returns empty object rather than throwing', () => {
  assert.deepEqual(collectDeclaredVersions('{ not valid json', tracked), {});
});

void test('non-string range values are ignored', () => {
  const pkg = JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': null } });
  assert.deepEqual(collectDeclaredVersions(pkg, tracked), {});
});

void test('first declaration wins when a package appears in more than one field', () => {
  const pkg = JSON.stringify({
    dependencies: { '@utilitywarehouse/hearth-react': '^2.0.0' },
    peerDependencies: { '@utilitywarehouse/hearth-react': '^1.0.0' },
  });
  assert.deepEqual(collectDeclaredVersions(pkg, tracked), {
    '@utilitywarehouse/hearth-react': '^2.0.0',
  });
});

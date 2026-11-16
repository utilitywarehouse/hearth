// Fails when a SKILL.md has unparseable YAML frontmatter, or lacks a string
// `name` / `description`. An unquoted `: ` in a description is valid prose but
// invalid YAML, and the skill silently fails to load.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

/** @returns {string[]} problems found in one SKILL.md's text */
export function checkSkill(text) {
  const match = FRONTMATTER.exec(text);
  if (!match) return ['missing `---` frontmatter block'];
  let data;
  try {
    data = parse(match[1]);
  } catch (error) {
    return [`invalid YAML: ${error.message.split('\n')[0]}`];
  }
  if (!data || typeof data !== 'object') return ['frontmatter is not a mapping'];
  return ['name', 'description']
    .filter(key => typeof data[key] !== 'string' || !data[key].trim())
    .map(key => `\`${key}\` must be a non-empty string`);
}

function main() {
  const files = execFileSync('git', ['ls-files', '*SKILL.md'], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
  let failed = false;
  for (const file of files) {
    for (const problem of checkSkill(readFileSync(file, 'utf8'))) {
      failed = true;
      console.error(`${file}: ${problem}`);
    }
  }
  if (failed) process.exit(1);
  console.log(`${files.length} SKILL.md files OK`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();

#!/usr/bin/env node

/**
 * init-ai.js
 * Adds the @utilitywarehouse/hearth-react-native AI skill reference to the
 * project's AI assistant config file.
 *
 * Usage: npx @utilitywarehouse/hearth-react-native init-ai
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
const PACKAGE_NAME = '@utilitywarehouse/hearth-react-native';

function resolveSkillPath(projectRoot) {
  let dir = projectRoot;
  while (dir !== path.parse(dir).root) {
    const candidate = path.join(dir, 'node_modules', PACKAGE_NAME);
    if (fs.existsSync(candidate)) {
      return path.relative(projectRoot, path.join(candidate, 'SKILL.md')).replace(/\\/g, '/');
    }
    dir = path.dirname(dir);
  }
  return `node_modules/${PACKAGE_NAME}/SKILL.md`;
}

// Config files for each tool, in detection priority order
function buildAiTools(skillPath) {
  return [
    {
      name: 'Claude Code',
      files: ['CLAUDE.md'],
      line: `@${skillPath}`,
      supportsAtImport: true,
    },
    {
      name: 'Cursor',
      files: ['.cursorrules'],
      line: `@${skillPath}`,
      supportsAtImport: true,
    },
    {
      name: 'Windsurf',
      files: ['.windsurfrules'],
      line: `@${skillPath}`,
      supportsAtImport: true,
    },
    {
      name: 'Cline / Roo',
      files: ['.clinerules'],
      line: `@${skillPath}`,
      supportsAtImport: true,
    },
    {
      name: 'Codex / OpenAI agents',
      files: ['AGENTS.md'],
      line: `See ${skillPath} for ${PACKAGE_NAME} component usage guidelines.`,
      supportsAtImport: false,
    },
    {
      name: 'GitHub Copilot',
      files: ['.github/copilot-instructions.md'],
      line: `See ${skillPath} for ${PACKAGE_NAME} component usage guidelines.`,
      supportsAtImport: false,
    },
  ];
}

const COMMENT = `<!-- ${PACKAGE_NAME} — AI skill for component library usage guidance -->\n<!-- Added by: npx ${PACKAGE_NAME} init-ai -->`;

function findProjectRoot() {
  let dir = process.cwd();
  while (dir !== path.parse(dir).root) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function alreadyAdded(content, line) {
  return content.includes(line.trim());
}

function appendToFile(filePath, line) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let content = '';
  let existed = false;
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
    existed = true;
  }

  if (alreadyAdded(content, line)) {
    return { existed, alreadyPresent: true };
  }

  const separator = content.length > 0 && !content.endsWith('\n') ? '\n' : '';
  fs.appendFileSync(filePath, `${separator}\n${COMMENT}\n${line}\n`);
  return { existed, alreadyPresent: false };
}

function detectAndUpdate(projectRoot) {
  const results = [];
  for (const tool of AI_TOOLS) {
    for (const file of tool.files) {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        const { alreadyPresent } = appendToFile(filePath, tool.line);
        results.push({ tool: tool.name, file, alreadyPresent, created: false });
      }
    }
  }
  return results;
}

function promptCreate(projectRoot, aiTools) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('\nNo AI assistant config file detected. Create CLAUDE.md? (Y/n) ', answer => {
    rl.close();
    if (answer.trim().toLowerCase() !== 'n') {
      const tool = aiTools.find(t => t.name === 'Claude Code');
      const filePath = path.join(projectRoot, 'CLAUDE.md');
      appendToFile(filePath, tool.line);
      console.log(`\n✅  Created CLAUDE.md with ${PACKAGE_NAME} skill reference.`);
    } else {
      console.log('\nSkipped. You can add the skill manually — see the README for instructions.');
    }
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

const projectRoot = findProjectRoot();
const skillPath = resolveSkillPath(projectRoot);
const AI_TOOLS = buildAiTools(skillPath);

console.log(`\n🔍  Scanning for AI assistant config files in ${projectRoot}...\n`);

const results = detectAndUpdate(projectRoot);

if (results.length === 0) {
  promptCreate(projectRoot, AI_TOOLS);
} else {
  for (const r of results) {
    if (r.alreadyPresent) {
      console.log(`⏭   ${r.tool} (${r.file}) — skill already present, skipped`);
    } else {
      console.log(`✅  ${r.tool} (${r.file}) — skill reference added`);
    }
  }
  console.log(`\nDone! Your AI assistant will now use the ${PACKAGE_NAME} skill.\n`);
}

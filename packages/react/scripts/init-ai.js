#!/usr/bin/env node

/**
 * init-ai.js
 * Adds @utilitywarehouse/hearth-react AI guidance to the project's AI assistant
 * config files.
 *
 * For Claude Code (CLAUDE.md) it writes a block telling agents to install the
 * `hearth-ai-toolkit` plugin and invoke its `hearth-react` skill, and registers
 * the plugin and its marketplace in `.claude/settings.json`.
 *
 * Usage: npx @utilitywarehouse/hearth-react init-ai
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
const PACKAGE_NAME = '@utilitywarehouse/hearth-react';
const PLUGIN_KEY = 'hearth-ai-toolkit@hearth-plugins';
const MARKETPLACE_NAME = 'hearth-plugins';
const MARKETPLACE_REPO = 'utilitywarehouse/hearth';

const BLOCK_START = `<!-- ${PACKAGE_NAME}:start — added by: npx ${PACKAGE_NAME} init-ai -->`;
const BLOCK_END = `<!-- ${PACKAGE_NAME}:end -->`;
const CLAUDE_BLOCK = `${BLOCK_START}
## Hearth React

The \`hearth-react\` skill and MCP server come from the \`hearth-ai-toolkit\` plugin (marketplace \`${MARKETPLACE_NAME}\`, GitHub \`${MARKETPLACE_REPO}\`). It must be installed; this project's \`.claude/settings.json\` prompts for it.

Before any UI work, invoke the \`hearth-react\` skill with the Skill tool. UI work means new or edited components, pages and styling, and adapting Figma output. Do this even when the file doesn't import Hearth yet.
${BLOCK_END}`;

const MARKER_BLOCK_RE = new RegExp(
  `${escapeRegExp(`<!-- ${PACKAGE_NAME}:start`)}[^\\n]*-->[\\s\\S]*?${escapeRegExp(BLOCK_END)}`
);
// Block written by earlier versions: two comment lines, then an `@…/SKILL.md` import.
const OLD_BLOCK_RE =
  /(?:^<!--[^\n]*-->\r?\n^<!--[^\n]*init-ai[^\n]*-->(?:\r?\n)+)?^@\S*hearth-react\/SKILL\.md[ \t]*(?=\r?$)/m;

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

// Config files for the other tools, in detection priority order
function buildAiTools(skillPath) {
  return [
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

/**
 * Writes the Claude Code block into CLAUDE.md: replaces a current block or an
 * old `@…/SKILL.md` import block in place, otherwise appends.
 * Returns 'unchanged' | 'updated' | 'added'.
 */
function writeClaudeBlock(filePath) {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const existing = [MARKER_BLOCK_RE, OLD_BLOCK_RE].find(re => re.test(content));

  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  const block = CLAUDE_BLOCK.replace(/\n/g, eol);

  let next;
  if (existing) {
    next = content.replace(existing, () => block);
  } else {
    const separator = content.length === 0 ? '' : content.endsWith('\n') ? eol : `${eol}${eol}`;
    next = `${content}${separator}${block}${eol}`;
  }
  if (next === content) return 'unchanged';
  fs.writeFileSync(filePath, next);
  return existing ? 'updated' : 'added';
}

/** Merges the plugin and marketplace into .claude/settings.json, keeping other keys. */
function updateClaudeSettings(projectRoot) {
  const filePath = path.join(projectRoot, '.claude', 'settings.json');
  let settings = {};
  if (fs.existsSync(filePath)) {
    try {
      settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      return 'invalid';
    }
  }
  const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
  if (
    !isObject(settings) ||
    ![settings.enabledPlugins, settings.extraKnownMarketplaces].every(
      v => v === undefined || isObject(v)
    )
  ) {
    return 'invalid';
  }
  const before = JSON.stringify(settings);
  // Keep existing values: a project may have disabled the plugin or pinned its own marketplace.
  settings.enabledPlugins = { [PLUGIN_KEY]: true, ...settings.enabledPlugins };
  settings.extraKnownMarketplaces = {
    [MARKETPLACE_NAME]: { source: { source: 'github', repo: MARKETPLACE_REPO } },
    ...settings.extraKnownMarketplaces,
  };
  if (JSON.stringify(settings) === before) return 'unchanged';
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(settings, null, 2)}\n`);
  return 'updated';
}

function setUpClaudeCode(projectRoot) {
  const claudeMd = writeClaudeBlock(path.join(projectRoot, 'CLAUDE.md'));
  const settings = updateClaudeSettings(projectRoot);
  return { claudeMd, settings };
}

function reportClaudeCode({ claudeMd, settings }) {
  const label = { added: 'block added', updated: 'block updated', unchanged: 'already up to date' };
  console.log(
    `${claudeMd === 'unchanged' ? '⏭ ' : '✅ '} Claude Code (CLAUDE.md) — ${label[claudeMd]}`
  );
  if (settings === 'invalid') {
    console.log(
      `⚠️   .claude/settings.json is not a valid JSON object, left unchanged. Add "${PLUGIN_KEY}" to enabledPlugins and a "${MARKETPLACE_NAME}" entry to extraKnownMarketplaces yourself.`
    );
  } else {
    console.log(
      `${settings === 'unchanged' ? '⏭ ' : '✅ '} Claude Code (.claude/settings.json) — ${settings === 'unchanged' ? 'plugin already registered' : 'plugin and marketplace registered'}`
    );
  }
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

function promptCreate(projectRoot) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('\nNo AI assistant config file detected. Create CLAUDE.md? (Y/n) ', answer => {
    rl.close();
    if (answer.trim().toLowerCase() !== 'n') {
      reportClaudeCode(setUpClaudeCode(projectRoot));
      console.log(
        `\nDone! Install the hearth-ai-toolkit plugin when Claude Code prompts for it.\n`
      );
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

const hasClaudeMd = fs.existsSync(path.join(projectRoot, 'CLAUDE.md'));
const results = detectAndUpdate(projectRoot);

if (!hasClaudeMd && results.length === 0) {
  promptCreate(projectRoot);
} else {
  if (hasClaudeMd) reportClaudeCode(setUpClaudeCode(projectRoot));
  for (const r of results) {
    if (r.alreadyPresent) {
      console.log(`⏭   ${r.tool} (${r.file}) — skill already present, skipped`);
    } else {
      console.log(`✅  ${r.tool} (${r.file}) — skill reference added`);
    }
  }
  if (hasClaudeMd) {
    console.log('\nInstall the hearth-ai-toolkit plugin when Claude Code prompts for it.');
  }
  console.log(`\nDone! Your AI assistant will now use the ${PACKAGE_NAME} skill.\n`);
}

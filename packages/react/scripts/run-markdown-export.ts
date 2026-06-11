/**
 * Subprocess runner used by `generate-llm-docs.js` to execute a named markdown
 * export function from a TypeScript component file.
 *
 * The main generation script cannot import TypeScript directly (it runs as plain
 * Node.js ESM), so it shells out to this script via tsx whenever it encounters a
 * custom JSX component tag (e.g. `<ColorPropsTable />`) that has a co-located
 * `*Markdown()` export. The stdout of this process is captured and inserted into
 * the generated markdown output in place of the component tag.
 *
 * Usage (invoked by generate-llm-docs.js, not called directly):
 *   tsx scripts/run-markdown-export.ts <filePath> <fnName>
 *
 * Arguments:
 *   filePath — absolute path to the TypeScript component file
 *   fnName   — name of the exported function to call (e.g. "colorPropsMarkdown")
 *
 * @see packages/react/scripts/generate-llm-docs.js — callMarkdownExport()
 * @see packages/react/src/docs/storybook-components/markdown-table.ts — toMdTable utility
 */
import { pathToFileURL } from 'url';

const [, , filePath, fnName] = process.argv;

if (!filePath || !fnName) {
  process.stderr.write('Usage: run-markdown-export.ts <filePath> <fnName>\n');
  process.exit(1);
}

const mod = await import(pathToFileURL(filePath).href);
const fn = mod[fnName];

if (typeof fn !== 'function') {
  process.stderr.write(`Export "${fnName}" not found or not a function in ${filePath}\n`);
  process.exit(1);
}

process.stdout.write(fn());

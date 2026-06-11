/**
 * Shared utility for generating GFM markdown tables from structured data.
 *
 * Used by Storybook documentation components (e.g. ColourPropsTable) to expose
 * a `*Markdown()` export alongside their React render. The `generate-llm-docs`
 * script calls those exports via a tsx subprocess to replace custom JSX component
 * tags with plain markdown tables in the generated LLM documentation output.
 *
 * Convention: for a Storybook component named `FooTable`, export a companion
 * function named `fooMarkdown()` that returns `toMdTable(...)`. The generation
 * script will detect it automatically and substitute the component tag.
 *
 * @see packages/react/scripts/generate-llm-docs.js — callMarkdownExport()
 * @see packages/react/scripts/run-markdown-export.ts — tsx subprocess runner
 */

/**
 * Generates a GFM markdown table string from headers and rows.
 *
 * @example
 * toMdTable(['Value', 'CSS custom property'], [
 *   ['primary', 'var(--h-text-primary)'],
 * ]);
 * // | Value | CSS custom property |
 * // | --- | --- |
 * // | primary | var(--h-text-primary) |
 */
export function toMdTable(headers: string[], rows: string[][]): string {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map(row => `| ${row.join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

import { describe, expect, it } from 'vitest';
import { checkCliChangeset } from '../check-cli-changeset.js';

const SCHEMA = 'packages/manifest/src/schema.ts';
const cliChangeset = `---\n'@utilitywarehouse/hearth-cli': minor\n---\n\nSupports manifest schema 3.\n`;
const otherChangeset = `---\n'@utilitywarehouse/hearth-tokens': patch\n---\n\nFix a token.\n`;

describe('checkCliChangeset', () => {
  it('has no errors when the manifest schema is untouched', () => {
    expect(checkCliChangeset(['packages/tokens/package.json'], [])).toEqual([]);
  });

  it('reports a schema change with no changeset at all', () => {
    expect(checkCliChangeset([SCHEMA], [])).toEqual([expect.stringContaining('hearth-cli')]);
  });

  it('reports a schema change whose changesets do not name the CLI', () => {
    expect(checkCliChangeset([SCHEMA], [otherChangeset])).toEqual([
      expect.stringContaining('hearth-cli'),
    ]);
  });

  it('accepts a schema change with a changeset for the CLI among others', () => {
    expect(checkCliChangeset([SCHEMA], [otherChangeset, cliChangeset])).toEqual([]);
  });

  it('does not mistake the CLI name in the changelog text for a bump', () => {
    const mention = `---\n'@utilitywarehouse/hearth-tokens': patch\n---\n\nNeeds @utilitywarehouse/hearth-cli.\n`;

    expect(checkCliChangeset([SCHEMA], [mention])).toHaveLength(1);
  });
});

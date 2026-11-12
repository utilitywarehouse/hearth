export const SCHEMA_FILE = 'packages/manifest/src/schema.ts';
export const CLI_PACKAGE = '@utilitywarehouse/hearth-cli';

/** The frontmatter of a changeset, where the bumped packages are listed. */
const frontmatter = (changeset: string) => /^---\r?\n([\s\S]*?)\r?\n---/.exec(changeset)?.[1] ?? '';

const bumpsCli = (changeset: string) =>
  frontmatter(changeset)
    .split(/\r?\n/)
    .some(line => line.replace(/['"]/g, '').trim().startsWith(`${CLI_PACKAGE}:`));

/**
 * Errors for a change to the manifest schema that no changeset releases the CLI for. The CLI bundles
 * the schema, so it must be released to read (or to stop rejecting) a manifest in the new shape.
 */
export function checkCliChangeset(
  changedFiles: Array<string>,
  changesets: Array<string>
): Array<string> {
  if (!changedFiles.includes(SCHEMA_FILE) || changesets.some(bumpsCli)) return [];
  return [
    `${SCHEMA_FILE} changed, but no changeset bumps ${CLI_PACKAGE}. The CLI bundles the manifest schema: add a changeset for it (patch for a compatible change, minor if it adds a schema version).`,
  ];
}

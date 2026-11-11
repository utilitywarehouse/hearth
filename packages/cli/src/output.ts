import type { ResolveResult } from './resolve-manifest.js';

export type PackageInfo = { name: string; version: string };

export const header = ({ name, version }: PackageInfo) => `${name} ${version}`;

/** The message for a package whose manifest could not be used, with what to do about it. */
export const formatUnavailable = (result: Exclude<ResolveResult, { status: 'ok' }>): string => {
  switch (result.status) {
    case 'not-installed':
      return `${result.packageName} is not installed in this project. Install it (npm install ${result.packageName}) and run the command again.\n`;
    case 'no-manifest':
      return `${result.packageName} is installed but ships no hearth-manifest.json. Update it to a version that includes a manifest (npm install ${result.packageName}@latest) and run the command again.\n`;
    case 'invalid':
      return `The hearth-manifest.json in ${result.packageName} is invalid:\n${result.errors.map(error => `  ${error}`).join('\n')}\n`;
    case 'unsupported-schema':
      return `${result.packageName} ships manifest schema version ${result.found}, which is newer than this CLI supports (${result.supported}). Update @utilitywarehouse/hearth-cli and run the command again.\n`;
    case 'unsupported-type':
      return `${result.packageName} ships manifest type "${result.found}", which this CLI does not know. Update @utilitywarehouse/hearth-cli and run the command again.\n`;
  }
};

/** `what` is the sentence saying what was not found, for example `No token at "x"`. */
export const formatNotFound = (what: string, suggestions: Array<string>): string =>
  `${what}.${suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : ''}\n`;

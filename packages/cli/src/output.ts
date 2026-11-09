import type { ResolveResult } from './resolve-manifest.js';
import type { TokenView } from './tokens.js';

export type PackageInfo = { name: string; version: string };

const surfaceLines = (token: TokenView): Array<[string, string]> => {
  const lines: Array<[string, string]> = [];
  const { values, alias, css, browser, js } = token;
  lines.push([
    'value',
    values.dark === undefined
      ? `${values.default}`
      : `${values.default} (light), ${values.dark} (dark)`,
  ]);
  if (alias) {
    lines.push([
      'alias',
      alias.dark === undefined ? alias.default : `${alias.default} (light), ${alias.dark} (dark)`,
    ]);
  }
  if (css) lines.push(['css', css.variable]);
  if (browser) lines.push(['browser', `${browser.path} from '${browser.import}'`]);
  if (js) {
    lines.push(['js', `${js.path} from '${js.import}'`]);
    if (js.darkPath) lines.push(['js dark', `${js.darkPath} from '${js.import}'`]);
  }
  return lines;
};

export const formatToken = (token: TokenView): string => {
  const rows = surfaceLines(token).map(([label, text]) => `  ${label.padEnd(8)}${text}`);
  return [
    `${token.path}${token.device ? ` [${token.device}]` : ''}  (${token.type})`,
    ...rows,
  ].join('\n');
};

const header = ({ name, version }: PackageInfo) => `${name} ${version}`;

export const formatTokens = (pkg: PackageInfo, tokens: Array<TokenView>, total: number): string => {
  const footer =
    total > tokens.length
      ? [`Showing ${tokens.length} of ${total}. Narrow the query or raise --limit.`]
      : [];
  return [header(pkg), '', ...tokens.map(formatToken).flatMap(block => [block, '']), ...footer]
    .join('\n')
    .trimEnd()
    .concat('\n');
};

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
  }
};

export const formatNotFound = (path: string, suggestions: Array<string>): string =>
  `No token at "${path}".${suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : ''}\n`;

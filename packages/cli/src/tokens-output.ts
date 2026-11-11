import type { PackageInfo } from './output.js';
import { header } from './output.js';
import type { TokenView } from './tokens.js';

/** Views of one path: a single token, or one per device. */
const groupByPath = (tokens: Array<TokenView>): Array<Array<TokenView>> => {
  const groups = new Map<string, Array<TokenView>>();
  for (const token of tokens) groups.set(token.path, [...(groups.get(token.path) ?? []), token]);
  return [...groups.values()];
};

/** One text for a single token, or `mobile 8px, tablet 12px` for a token per device. */
const perDevice = (views: Array<TokenView>, text: (view: TokenView) => string | undefined) => {
  const parts = views.flatMap(view => {
    const part = text(view);
    return part === undefined ? [] : [view.device ? `${view.device} ${part}` : part];
  });
  return parts.length > 0 ? parts.join(', ') : undefined;
};

const withDark = (light: string | number, dark: string | number | undefined) =>
  dark === undefined ? `${light}` : `${light} (light), ${dark} (dark)`;

const surfaceLines = (views: Array<TokenView>): Array<[string, string]> => {
  const lines: Array<[string, string]> = [];
  const value = perDevice(views, ({ values }) => withDark(values.default, values.dark));
  if (value !== undefined) lines.push(['value', value]);
  const alias = perDevice(views, ({ alias }) => alias && withDark(alias.default, alias.dark));
  if (alias !== undefined) lines.push(['alias', alias]);
  for (const { device, css, browser, js } of views) {
    const suffix = device ? ` (${device})` : '';
    if (css) lines.push(['css', `${css.variable}${suffix}`]);
    if (browser) lines.push(['browser', `${browser.path} from '${browser.import}'${suffix}`]);
    if (js) {
      lines.push(['js', `${js.path} from '${js.import}'${suffix}`]);
      if (js.darkPath) lines.push(['js dark', `${js.darkPath} from '${js.import}'${suffix}`]);
    }
  }
  return lines;
};

/** One block for a path: the token, or its tokens per device. */
export const formatToken = (views: Array<TokenView>): string => {
  const rows = surfaceLines(views).map(([label, text]) => `  ${label.padEnd(8)}${text}`);
  return [`${views[0].path}  (${views[0].type})`, ...rows].join('\n');
};

/** The blocks for a group of tokens, one per path. */
export const formatGroup = (tokens: Array<TokenView>): string =>
  groupByPath(tokens).map(formatToken).join('\n\n');

/** `total` counts paths, which is what `tokens` is grouped into. */
export const formatTokens = (pkg: PackageInfo, tokens: Array<TokenView>, total: number): string => {
  const groups = groupByPath(tokens);
  const footer =
    total > groups.length
      ? [`Showing ${groups.length} of ${total}. Narrow the query or raise --limit.`]
      : [];
  return [header(pkg), '', ...groups.map(formatToken).flatMap(block => [block, '']), ...footer]
    .join('\n')
    .trimEnd()
    .concat('\n');
};

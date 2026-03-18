type NavigateOptions = {
  defaultToDocs?: boolean;
};

const parseQuery = (queryString: string) => {
  const query: Record<string, string> = {};
  const pairs = (queryString[0] === '?' ? queryString.substring(1) : queryString)
    .split('&')
    .filter(Boolean);

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

// Storybook composition prefixes manager story ids with the ref id, for example
// `react-native_components-alert--docs`. Sorting by descending length avoids partial
// matches when one ref id is a prefix of another.
const getKnownRefIds = () => {
  if (typeof window === 'undefined') {
    return [] as Array<string>;
  }

  const topWindow = window.top ?? window;
  const refs = (topWindow as Window & { REFS?: Record<string, unknown> }).REFS ?? {};

  return Object.keys(refs).sort((left, right) => right.length - left.length);
};

const getRefIdFromStoryId = (storyId: string) => {
  if (!storyId) {
    return null;
  }

  return getKnownRefIds().find(refId => storyId.startsWith(`${refId}_`)) ?? null;
};

const getCurrentRefId = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  // Inside a composed iframe Storybook exposes `refId` in the query string; when
  // running in the manager we infer it from the current `path` value instead.
  const topWindow = window.top ?? window;
  const query = parseQuery(topWindow.location.search);

  if (query.refId) {
    return query.refId;
  }

  const path = query.path || '';
  const storyPath = path.match(/\/(?:docs|story)\/([^?#]+)/)?.[1] ?? '';

  return getRefIdFromStoryId(storyPath);
};

const extractStoryId = (target: string) => {
  const trimmed = target.trim();
  const pathMatch = trimmed.match(/(?:\?path=\/|\/)(docs|story)\/([^?#]+)/);
  if (pathMatch?.[2]) {
    return pathMatch[2];
  }
  return trimmed;
};

const ensureDocsSuffix = (storyId: string, defaultToDocs: boolean) => {
  if (!defaultToDocs || storyId.includes('--')) {
    return storyId;
  }
  return `${storyId}--docs`;
};

const getManagerStoryId = (rawStoryId: string) => {
  const targetRefId = getRefIdFromStoryId(rawStoryId) ?? getCurrentRefId();

  if (!targetRefId) {
    return rawStoryId;
  }

  // The manager URL must use the ref-prefixed id so the left nav and selected story
  // stay in sync across composed Storybooks.
  return rawStoryId.startsWith(`${targetRefId}_`) ? rawStoryId : `${targetRefId}_${rawStoryId}`;
};

const getTargetMode = (target: string, defaultToDocs: boolean) => {
  if (target.includes('/story/') || target.includes('path=/story/')) {
    return 'story';
  }
  if (target.includes('/docs/') || target.includes('path=/docs/')) {
    return 'docs';
  }
  return defaultToDocs ? 'docs' : 'story';
};

const buildFallbackUrl = (
  storyId: string,
  originalTarget: string,
  modeOverride?: 'docs' | 'story'
) => {
  if (!storyId || typeof window === 'undefined') {
    return '';
  }
  if (
    originalTarget.startsWith('http://') ||
    originalTarget.startsWith('https://') ||
    originalTarget.startsWith('/?path=/') ||
    originalTarget.startsWith('?path=/') ||
    originalTarget.startsWith('/docs/') ||
    originalTarget.startsWith('/story/')
  ) {
    return originalTarget;
  }
  const { location } = window.top ?? window;
  const query = parseQuery(location.search);
  const path = query.path || '';
  const mode = modeOverride ?? (path.startsWith('/story/') ? 'story' : 'docs');
  const basePath = location.pathname.replace(/iframe\.html$/, '');
  return `${location.origin + basePath}?path=/${mode}/${storyId}`;
};

const updateManagerUrl = (storyId: string, mode: 'docs' | 'story') => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const topWindow = window.top ?? window;
    const basePath = topWindow.location.pathname.replace(/iframe\.html$/, '');
    const url = `${topWindow.location.origin + basePath}?path=/${mode}/${storyId}`;
    topWindow.history.pushState({}, '', url);
    topWindow.dispatchEvent(new PopStateEvent('popstate'));
  } catch {
    // Ignore manager URL sync failures; preview-side navigation can still succeed.
  }
};

export const getStoryHref = (target: string, options?: NavigateOptions) => {
  if (!target) {
    return '';
  }
  const rawStoryId = ensureDocsSuffix(extractStoryId(target), options?.defaultToDocs ?? false);
  const storyId = getManagerStoryId(rawStoryId);
  const mode = getTargetMode(target, options?.defaultToDocs ?? false);
  return buildFallbackUrl(storyId, target, mode);
};

export const navigateToStory = (target: string, options?: NavigateOptions) => {
  if (!target) {
    return;
  }
  const rawStoryId = ensureDocsSuffix(extractStoryId(target), options?.defaultToDocs ?? false);
  const storyId = getManagerStoryId(rawStoryId);
  const mode = getTargetMode(target, options?.defaultToDocs ?? false);

  // Always route through manager history updates so every Storybook link follows the
  // same pushState-only path, regardless of whether it lives in the root preview or
  // inside a composed ref iframe.
  updateManagerUrl(storyId, mode);
};

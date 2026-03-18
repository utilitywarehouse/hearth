type StorybookChannel = {
  emit: (eventName: string, ...args: Array<unknown>) => void;
};

type StorybookWindow = Window & {
  __STORYBOOK_ADDONS_CHANNEL__?: StorybookChannel;
};

type StorybookPreview = {
  storyIdToEntry?: (storyId: string) => unknown;
};

type StorybookPreviewWindow = Window & {
  __STORYBOOK_PREVIEW__?: StorybookPreview;
};

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

const getRefPrefixFromLocation = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  const { location } = window.top ?? window;
  const query = parseQuery(location.search);
  const path = query.path || '';
  const match = path.match(/\/(?:docs|story)\/([a-z0-9-]+_)/i);
  return match?.[1] ?? '';
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

const applyRefPrefix = (storyId: string) => {
  const refPrefix = getRefPrefixFromLocation();
  if (!refPrefix || storyId.startsWith(refPrefix)) {
    return storyId;
  }
  return `${refPrefix}${storyId}`;
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
    // Ignore manager URL sync failures; Storybook channel update will still work.
  }
};

const getPreview = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const currentWindow = window as StorybookPreviewWindow;
  const topWindow = (window.top ?? window) as StorybookPreviewWindow;
  return currentWindow.__STORYBOOK_PREVIEW__ ?? topWindow.__STORYBOOK_PREVIEW__ ?? null;
};

const canResolveStoryId = (storyId: string) => {
  const preview = getPreview();
  if (!preview || typeof preview.storyIdToEntry !== 'function') {
    return true;
  }
  try {
    return Boolean(preview.storyIdToEntry(storyId));
  } catch {
    return false;
  }
};

export const getStoryHref = (target: string, options?: NavigateOptions) => {
  if (!target) {
    return '';
  }
  const storyId = applyRefPrefix(
    ensureDocsSuffix(extractStoryId(target), options?.defaultToDocs ?? false)
  );
  const mode = getTargetMode(target, options?.defaultToDocs ?? false);
  return buildFallbackUrl(storyId, target, mode);
};

export const navigateToStory = (target: string, options?: NavigateOptions) => {
  if (!target) {
    return;
  }
  const storyId = applyRefPrefix(
    ensureDocsSuffix(extractStoryId(target), options?.defaultToDocs ?? false)
  );
  const mode = getTargetMode(target, options?.defaultToDocs ?? false);

  const channel = (() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const currentWindow = window as StorybookWindow;
    const topWindow = (window.top ?? window) as StorybookWindow;
    return (
      currentWindow.__STORYBOOK_ADDONS_CHANNEL__ ?? topWindow.__STORYBOOK_ADDONS_CHANNEL__ ?? null
    );
  })();

  if (channel && canResolveStoryId(storyId)) {
    channel.emit('setCurrentStory', { storyId });
    updateManagerUrl(storyId, mode);
    return;
  }

  const fallbackUrl = buildFallbackUrl(storyId, target, mode);
  if (fallbackUrl) {
    (window.top ?? window).location.href = fallbackUrl;
  }
};

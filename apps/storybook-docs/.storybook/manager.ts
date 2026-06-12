import { addons, type State } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-storybook-utils/styles/manager.css';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
import { create } from 'storybook/theming';

const theme = create(config);

const ROOT_PREVIEW_IFRAME_ID = 'storybook-preview-iframe';
const ROOT_PREVIEW_FALLBACK_SRC = '/iframe.html?id=*&viewMode=story';

const getTargetRefId = (): string | null => {
  const path = new URLSearchParams(window.location.search).get('path');

  if (!path) {
    return null;
  }

  const storyPath = path.match(/^\/(?:docs|story)\/(.+)$/)?.[1];
  const refs = Object.keys(
    (window as typeof window & { REFS?: Record<string, unknown> }).REFS ?? {}
  );

  if (!storyPath || refs.length === 0) {
    return null;
  }

  return (
    refs
      .sort((left, right) => right.length - left.length)
      .find(refId => storyPath.startsWith(`${refId}_`)) ?? null
  );
};

const rootPreviewPointsAtRefStory = (previewSrc: string, refId: string) => {
  if (previewSrc.startsWith(`/${refId}/iframe.html`)) {
    return true;
  }

  if (!previewSrc.startsWith('/iframe.html')) {
    return false;
  }

  try {
    const previewUrl = new URL(previewSrc, window.location.origin);
    const storyId = previewUrl.searchParams.get('id');

    return Boolean(storyId?.startsWith(`${refId}_`));
  } catch {
    return false;
  }
};

const normalizeRootPreviewIframe = () => {
  const refId = getTargetRefId();

  if (!refId) {
    return false;
  }

  const previewIframe = document.getElementById(ROOT_PREVIEW_IFRAME_ID) as HTMLIFrameElement | null;

  if (!previewIframe) {
    return false;
  }

  const previewSrc = previewIframe.getAttribute('src');

  if (!previewSrc || !rootPreviewPointsAtRefStory(previewSrc, refId)) {
    return false;
  }

  if (previewSrc !== ROOT_PREVIEW_FALLBACK_SRC) {
    previewIframe.setAttribute('src', ROOT_PREVIEW_FALLBACK_SRC);
  }

  return true;
};

const bootstrapComposedPreviewIframeFix = () => {
  const tryNormalize = () => {
    normalizeRootPreviewIframe();
  };

  const observer = new MutationObserver(() => {
    tryNormalize();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src'],
  });

  window.addEventListener('load', tryNormalize);
  window.addEventListener('popstate', tryNormalize);

  const originalPushState = window.history.pushState.bind(window.history);
  window.history.pushState = (...args) => {
    originalPushState(...args);
    tryNormalize();
  };

  const originalReplaceState = window.history.replaceState.bind(window.history);
  window.history.replaceState = (...args) => {
    originalReplaceState(...args);
    tryNormalize();
  };

  tryNormalize();
};

bootstrapComposedPreviewIframeFix();

addons.setConfig({
  theme,
  layoutCustomisations: {
    showToolbar(state: State, defaultValue: boolean) {
      return state.viewMode === 'docs' ? false : defaultValue;
    },
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: ['icons', 'assets', 'tokens', 'fonts', 'css-reset'],
  },
});

addons.register('darkmode-refresh', api => {
  let previousDarkMode: boolean | null = null;

  api.on('globalsUpdated', ({ globals }) => {
    const currentDarkMode = globals.darkMode;

    previousDarkMode = currentDarkMode;
  });
});

import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import theme from '../../../shared/storybook/theme';

const ROOT_PREVIEW_IFRAME_ID = 'storybook-preview-iframe';
const ROOT_PREVIEW_FALLBACK_SRC = '/iframe.html?id=*&viewMode=story';

const getInitialDeepLinkedRefId = (): string | null => {
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

const normalizeRootPreviewIframe = () => {
  const refId = getInitialDeepLinkedRefId();

  if (!refId) {
    return false;
  }

  const previewIframe = document.getElementById(ROOT_PREVIEW_IFRAME_ID) as HTMLIFrameElement | null;

  if (!previewIframe) {
    return false;
  }

  const previewSrc = previewIframe.getAttribute('src');

  if (!previewSrc || !previewSrc.startsWith(`/${refId}/iframe.html`)) {
    return false;
  }

  if (previewSrc !== ROOT_PREVIEW_FALLBACK_SRC) {
    previewIframe.setAttribute('src', ROOT_PREVIEW_FALLBACK_SRC);
  }

  return true;
};

const bootstrapComposedDeepLinkIframeFix = () => {
  if (!getInitialDeepLinkedRefId()) {
    return;
  }

  if (normalizeRootPreviewIframe()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (normalizeRootPreviewIframe()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src'],
  });

  window.addEventListener('load', () => {
    if (normalizeRootPreviewIframe()) {
      observer.disconnect();
    }
  });
};

bootstrapComposedDeepLinkIframeFix();

addons.setConfig({
  theme,
  showToolbar: false,
  navSize: 300,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['react_common-props', 'react_responsive-design'],
  },
});

addons.register('darkmode-refresh', api => {
  let previousDarkMode: boolean | null = null;

  api.on('globalsUpdated', ({ globals }) => {
    const currentDarkMode = globals.darkMode;

    previousDarkMode = currentDarkMode;
  });
});

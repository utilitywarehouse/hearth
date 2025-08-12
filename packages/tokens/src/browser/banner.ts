export const banner = {
  default: {
    content: {
      gap: 'var(--h-banner-default-content-gap)',
      textGap: 'var(--h-banner-default-content-text-gap)',
    },
    gap: 'var(--h-banner-default-gap)',
    horizontal: {
      illustrationWidth: 'var(--h-banner-default-horizontal-illustration-width)',
      imageMaxWidth: 'var(--h-banner-default-horizontal-image-max-width)',
      imageMinWidth: 'var(--h-banner-default-horizontal-image-min-width)',
      maxWidth: 'var(--h-banner-default-horizontal-max-width)',
      minWidth: 'var(--h-banner-default-horizontal-min-width)',
    },
    imageHeight: 'var(--h-banner-default-image-height)',
    padding: 'var(--h-banner-default-padding)',
    vertical: {
      maxWidth: 'var(--h-banner-default-vertical-max-width)',
      minWidth: 'var(--h-banner-default-vertical-min-width)',
    },
  },
  highlight: {
    content: {
      gap: 'var(--h-banner-highlight-content-gap)',
    },
    gap: 'var(--h-banner-highlight-gap)',
    padding: 'var(--h-banner-highlight-padding)',
  },
  imageContainerBorderColor: 'var(--h-banner-image-container-border-color)',
} as const;

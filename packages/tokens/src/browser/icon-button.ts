export const iconButton = {
  alert: {
    iconButton: {
      unstyled: {
        foregroundColor: 'var(--h-alert-icon-button-unstyled-foreground-color)',
        foregroundColorActive: 'var(--h-alert-icon-button-unstyled-foreground-color-active)',
        foregroundColorHover: 'var(--h-alert-icon-button-unstyled-foreground-color-hover)',
      },
    },
  },
  borderRadius: 'var(--h-icon-button-border-radius)',
  md: {
    height: 'var(--h-icon-button-md-height)',
    paddingHorizontal: 'var(--h-icon-button-md-padding-horizontal)',
    paddingVertical: 'var(--h-icon-button-md-padding-vertical)',
    width: 'var(--h-icon-button-md-width)',
  },
  sm: {
    height: 'var(--h-icon-button-sm-height)',
    paddingHorizontal: 'var(--h-icon-button-sm-padding-horizontal)',
    paddingVertical: 'var(--h-icon-button-sm-padding-vertical)',
    width: 'var(--h-icon-button-sm-width)',
  },
  unstyled: {
    foregroundColor: 'var(--h-icon-button-unstyled-foreground-color)',
    foregroundColorActive: 'var(--h-icon-button-unstyled-foreground-color-active)',
    foregroundColorHover: 'var(--h-icon-button-unstyled-foreground-color-hover)',
    inverted: {
      foregroundColor: 'var(--h-icon-button-unstyled-inverted-foreground-color)',
      foregroundColorActive: 'var(--h-icon-button-unstyled-inverted-foreground-color-active)',
      foregroundColorHover: 'var(--h-icon-button-unstyled-inverted-foreground-color-hover)',
    },
    md: {
      height: 'var(--h-icon-button-unstyled-md-height)',
      width: 'var(--h-icon-button-unstyled-md-width)',
    },
    paddingHorizontal: 'var(--h-icon-button-unstyled-padding-horizontal)',
    paddingVertical: 'var(--h-icon-button-unstyled-padding-vertical)',
    sm: {
      height: 'var(--h-icon-button-unstyled-sm-height)',
      width: 'var(--h-icon-button-unstyled-sm-width)',
    },
  },
} as const;

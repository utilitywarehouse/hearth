export const iconButton = {
  borderRadius: 'var(--icon-button-border-radius)',
  md: {
    height: 'var(--icon-button-md-height)',
    paddingHorizontal: 'var(--icon-button-md-padding-horizontal)',
    paddingVertical: 'var(--icon-button-md-padding-vertical)',
    width: 'var(--icon-button-md-width)',
  },
  sm: {
    height: 'var(--icon-button-sm-height)',
    paddingHorizontal: 'var(--icon-button-sm-padding-horizontal)',
    paddingVertical: 'var(--icon-button-sm-padding-vertical)',
    width: 'var(--icon-button-sm-width)',
  },
  unstyled: {
    foregroundColor: 'var(--icon-button-unstyled-foreground-color)',
    foregroundColorActive: 'var(--icon-button-unstyled-foreground-color-active)',
    foregroundColorHover: 'var(--icon-button-unstyled-foreground-color-hover)',
    paddingHorizontal: 'var(--icon-button-unstyled-padding-horizontal)',
    paddingVertical: 'var(--icon-button-unstyled-padding-vertical)',
  },
} as const;

export const menu = {
  backgroundColor: 'var(--h-menu-background-color)',
  borderColor: 'var(--h-menu-border-color)',
  borderWidth: 'var(--h-menu-border-width)',
  gap: 'var(--h-menu-gap)',
  item: {
    borderRadius: 'var(--h-menu-item-border-radius)',
    gap: 'var(--h-menu-item-gap)',
    grey: {
      backgroundColorActive: 'var(--h-menu-item-grey-background-color-active)',
      backgroundColorHover: 'var(--h-menu-item-grey-background-color-hover)',
      foregroundColor: 'var(--h-menu-item-grey-foreground-color)',
    },
    padding: 'var(--h-menu-item-padding)',
    red: {
      backgroundColorActive: 'var(--h-menu-item-red-background-color-active)',
      backgroundColorHover: 'var(--h-menu-item-red-background-color-hover)',
      foregroundColor: 'var(--h-menu-item-red-foreground-color)',
    },
  },
  list: {
    gap: 'var(--h-menu-list-gap)',
  },
  maxWidth: 'var(--h-menu-max-width)',
  minWidth: 'var(--h-menu-min-width)',
  padding: 'var(--h-menu-padding)',
} as const;

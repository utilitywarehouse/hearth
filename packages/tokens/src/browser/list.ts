export const list = {
  gap: 'var(--h-list-gap)',
  heading: {
    gap: 'var(--h-list-heading-gap)',
    textContentGap: 'var(--h-list-heading-text-content-gap)',
  },
  item: {
    backgroundColorActive: 'var(--h-list-item-background-color-active)',
    backgroundColorHover: 'var(--h-list-item-background-color-hover)',
    borderWidth: 'var(--h-list-item-border-width)',
    contentGap: 'var(--h-list-item-content-gap)',
    emphasis: {
      borderColor: 'var(--h-list-item-emphasis-border-color)',
    },
    gap: 'var(--h-list-item-gap)',
    padding: 'var(--h-list-item-padding)',
    subtle: {
      borderColor: 'var(--h-list-item-subtle-border-color)',
    },
  },
  container: {
    emphasisWarmWhite: {
      borderRadius: 'var(--h-list-list-container-emphasis-warm-white-border-radius)',
    },
    emphasisWhite: {
      borderRadius: 'var(--h-list-list-container-emphasis-white-border-radius)',
    },
    none: {
      borderRadius: 'var(--h-list-list-container-none-border-radius)',
    },
    subtleWarmWhite: {
      borderRadius: 'var(--h-list-list-container-subtle-warm-white-border-radius)',
    },
    subtleWhite: {
      borderRadius: 'var(--h-list-list-container-subtle-white-border-radius)',
    },
  },
  menu: {
    list: {
      gap: 'var(--h-menu-list-gap)',
    },
  },
} as const;

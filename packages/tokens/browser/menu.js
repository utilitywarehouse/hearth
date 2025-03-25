export const menu = {
  backgroundColor: 'var(--h-menu-background-color)',
  borderColor: 'var(--h-menu-border-color)',
  borderWidth: 'var(--h-menu-border-width)',
  gap: 'var(--h-menu-gap)',
  item: {
    active: {
      backgroundColor: 'var(--h-menu-item-active-background-color)',
      red: {
        backgroundColor: 'var(--h-menu-item-active-red-background-color)',
        color: 'var(--h-menu-item-active-red-color)',
        iconColor: 'var(--h-menu-item-active-red-icon-color)',
      },
    },
    borderRadius: 'var(--h-menu-item-border-radius)',
    default: {
      red: {
        color: 'var(--h-menu-item-default-red-color)',
        iconColor: 'var(--h-menu-item-default-red-icon-color)',
      },
    },
    disabled: {
      red: {
        color: 'var(--h-menu-item-disabled-red-color)',
        iconColor: 'var(--h-menu-item-disabled-red-icon-color)',
      },
    },
    focus: {
      borderColor: 'var(--h-menu-item-focus-border-color)',
      borderWidth: 'var(--h-menu-item-focus-border-width)',
      red: {
        color: 'var(--h-menu-item-focus-red-color)',
        iconColor: 'var(--h-menu-item-focus-red-icon-color)',
      },
    },
    gap: 'var(--h-menu-item-gap)',
    hover: {
      backgroundColor: 'var(--h-menu-item-hover-background-color)',
      red: {
        backgroundColor: 'var(--h-menu-item-hover-red-background-color)',
        color: 'var(--h-menu-item-hover-red-color)',
        color2: 'var(--h-menu-item-hover-red-color-2)',
        iconColor: 'var(--h-menu-item-hover-red-icon-color)',
        iconColor2: 'var(--h-menu-item-hover-red-icon-color-2)',
      },
    },
    padding: 'var(--h-menu-item-padding)',
  },
  list: {
    gap: 'var(--h-menu-list-gap)',
  },
  maxWidth: 'var(--h-menu-max-width)',
  minWidth: 'var(--h-menu-min-width)',
  padding: 'var(--h-menu-padding)',
};

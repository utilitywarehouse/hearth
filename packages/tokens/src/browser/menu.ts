export const menu = {
  backgroundColor: 'var(--menu-background-color)',
  borderColor: 'var(--menu-border-color)',
  borderWidth: 'var(--menu-border-width)',
  gap: 'var(--menu-gap)',
  item: {
    active: {
      backgroundColor: 'var(--menu-item-active-background-color)',
      red: {
        backgroundColor: 'var(--menu-item-active-red-background-color)',
      },
    },
    borderRadius: 'var(--menu-item-border-radius)',
    default: {
      red: {
        color: 'var(--menu-item-default-red-color)',
        iconColor: 'var(--menu-item-default-red-icon-color)',
      },
    },
    disabled: {
      red: {
        color: 'var(--menu-item-disabled-red-color)',
        iconColor: 'var(--menu-item-disabled-red-icon-color)',
      },
    },
    focus: {
      borderColor: 'var(--menu-item-focus-border-color)',
      borderWidth: 'var(--menu-item-focus-border-width)',
      red: {
        color: 'var(--menu-item-focus-red-color)',
        iconColor: 'var(--menu-item-focus-red-icon-color)',
      },
    },
    gap: 'var(--menu-item-gap)',
    hover: {
      backgroundColor: 'var(--menu-item-hover-background-color)',
      red: {
        backgroundColor: 'var(--menu-item-hover-red-background-color)',
        color: 'var(--menu-item-hover-red-color)',
        iconColor: 'var(--menu-item-hover-red-icon-color)',
      },
    },
    padding: 'var(--menu-item-padding)',
  },
  padding: 'var(--menu-padding)',
} as const;

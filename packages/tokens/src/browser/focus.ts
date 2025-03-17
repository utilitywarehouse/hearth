export const focus = {
  border: 'var(--h-focus-border)',
  borderInverted: 'var(--h-focus-border-inverted)',
  menu: {
    item: {
      focus: {
        borderColor: 'var(--h-menu-item-focus-border-color)',
        borderWidth: 'var(--h-menu-item-focus-border-width)',
        red: {
          color: 'var(--h-menu-item-focus-red-color)',
          iconColor: 'var(--h-menu-item-focus-red-icon-color)',
        },
      },
    },
  },
  select: {
    dropdown: {
      item: {
        focus: {
          borderColor: 'var(--h-select-dropdown-item-focus-border-color)',
          borderWidthFocused: 'var(--h-select-dropdown-item-focus-border-width-focused)',
        },
      },
    },
  },
} as const;

export const radio = {
  borderWidth: 'var(--h-radio-border-width)',
  checked: {
    borderColorActive: 'var(--h-radio-checked-border-color-active)',
    borderColorHover: 'var(--h-radio-checked-border-color-hover)',
    color: 'var(--h-radio-checked-color)',
  },
  radius: 'var(--h-radio-radius)',
  unchecked: {
    backgroundColor: 'var(--h-radio-unchecked-background-color)',
    borderColor: 'var(--h-radio-unchecked-border-color)',
    borderColorActive: 'var(--h-radio-unchecked-border-color-active)',
    borderColorHover: 'var(--h-radio-unchecked-border-color-hover)',
  },
} as const;

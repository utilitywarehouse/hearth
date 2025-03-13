export const radio = {
  borderWidth: 'var(--radio-border-width)',
  checked: {
    borderColorActive: 'var(--radio-checked-border-color-active)',
    borderColorHover: 'var(--radio-checked-border-color-hover)',
    color: 'var(--radio-checked-color)',
  },
  radius: 'var(--radio-radius)',
  unchecked: {
    backgroundColor: 'var(--radio-unchecked-background-color)',
    borderColor: 'var(--radio-unchecked-border-color)',
    borderColorActive: 'var(--radio-unchecked-border-color-active)',
    borderColorHover: 'var(--radio-unchecked-border-color-hover)',
  },
} as const;

export const radio = {
  borderWidth: 'var(--radio-border-width)',
  checked: {
    borderColorActive: 'var(--radio-checked-border-color-active)',
    color: 'var(--radio-checked-color)',
    colorActive: 'var(--radio-checked-color-active)',
    colorHover: 'var(--radio-checked-color-hover)',
  },
  radius: 'var(--radio-radius)',
  unchecked: {
    backgroundColor: 'var(--radio-unchecked-background-color)',
    backgroundColorActive: 'var(--radio-unchecked-background-color-active)',
    backgroundColorHover: 'var(--radio-unchecked-background-color-hover)',
    borderColor: 'var(--radio-unchecked-border-color)',
    borderColor2: 'var(--radio-unchecked-border-color-2)',
    borderColorActive: 'var(--radio-unchecked-border-color-active)',
  },
} as const;

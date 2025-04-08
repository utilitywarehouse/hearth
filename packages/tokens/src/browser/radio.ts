export const radio = {
  borderRadius: 'var(--h-radio-border-radius)',
  borderWidth: 'var(--h-radio-border-width)',
  card: {
    group: {
      gap: 'var(--h-radio-card-group-gap)',
      stack: {
        gap: 'var(--h-radio-card-group-stack-gap)',
      },
    },
  },
  checked: {
    color: 'var(--h-radio-checked-color)',
  },
  gap: 'var(--h-radio-gap)',
  group: {
    gap: 'var(--h-radio-group-gap)',
    stack: {
      gap: 'var(--h-radio-group-stack-gap)',
    },
  },
  outlineColorActive: 'var(--h-radio-outline-color-active)',
  outlineColorHover: 'var(--h-radio-outline-color-hover)',
  outlineWidth: 'var(--h-radio-outline-width)',
  unchecked: {
    backgroundColor: 'var(--h-radio-unchecked-background-color)',
    borderColor: 'var(--h-radio-unchecked-border-color)',
  },
} as const;

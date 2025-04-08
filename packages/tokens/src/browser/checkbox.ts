export const checkbox = {
  borderRadius: 'var(--h-checkbox-border-radius)',
  borderWidth: 'var(--h-checkbox-border-width)',
  card: {
    group: {
      gap: 'var(--h-checkbox-card-group-gap)',
      stack: {
        gap: 'var(--h-checkbox-card-group-stack-gap)',
      },
    },
  },
  checked: {
    backgroundColor: 'var(--h-checkbox-checked-background-color)',
    borderColor: 'var(--h-checkbox-checked-border-color)',
    iconColor: 'var(--h-checkbox-checked-icon-color)',
  },
  gap: 'var(--h-checkbox-gap)',
  group: {
    gap: 'var(--h-checkbox-group-gap)',
    stack: {
      gap: 'var(--h-checkbox-group-stack-gap)',
    },
  },
  outlineColorActive: 'var(--h-checkbox-outline-color-active)',
  outlineColorHover: 'var(--h-checkbox-outline-color-hover)',
  outlineWidth: 'var(--h-checkbox-outline-width)',
  unchecked: {
    backgroundColor: 'var(--h-checkbox-unchecked-background-color)',
    borderColor: 'var(--h-checkbox-unchecked-border-color)',
  },
} as const;

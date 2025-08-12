export const checkbox = {
  borderRadius: 'var(--h-checkbox-border-radius)',
  borderWidth: 'var(--h-checkbox-border-width)',
  checked: {
    backgroundColor: 'var(--h-checkbox-checked-background-color)',
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
  tile: {
    borderRadius: 'var(--h-checkbox-tile-border-radius)',
    borderWidth: 'var(--h-checkbox-tile-border-width)',
    borderWidthSelected: 'var(--h-checkbox-tile-border-width-selected)',
    gap: 'var(--h-checkbox-tile-gap)',
    group: {
      gap: 'var(--h-checkbox-tile-group-gap)',
      stack: {
        gap: 'var(--h-checkbox-tile-group-stack-gap)',
      },
    },
    maxWidth: 'var(--h-checkbox-tile-max-width)',
    minWidth: 'var(--h-checkbox-tile-min-width)',
    padding: 'var(--h-checkbox-tile-padding)',
  },
} as const;

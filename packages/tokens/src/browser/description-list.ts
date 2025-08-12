export const descriptionList = {
  gap: 'var(--h-description-list-gap)',
  item: {
    column: {
      gap: 'var(--h-description-list-item-column-gap)',
    },
    gap: 'var(--h-description-list-item-gap)',
    row: {
      gap: 'var(--h-description-list-item-row-gap)',
      headingWidth: 'var(--h-description-list-item-row-heading-width)',
    },
  },
  stack: {
    gap: 'var(--h-description-list-stack-gap)',
  },
} as const;

export const accordion = {
  gap: 'var(--h-accordion-gap)',
  heading: {
    gap: 'var(--h-accordion-heading-gap)',
  },
  item: {
    content: {
      gap: 'var(--h-accordion-item-content-gap)',
      paddingBottom: 'var(--h-accordion-item-content-padding-bottom)',
      paddingHorizontal: 'var(--h-accordion-item-content-padding-horizontal)',
      paddingTop: 'var(--h-accordion-item-content-padding-top)',
    },
    gap: 'var(--h-accordion-item-gap)',
    heading: {
      gap: 'var(--h-accordion-item-heading-gap)',
      paddingHorizontal: 'var(--h-accordion-item-heading-padding-horizontal)',
      paddingVertical: 'var(--h-accordion-item-heading-padding-vertical)',
    },
  },
  maxWidth: 'var(--h-accordion-max-width)',
  minWidth: 'var(--h-accordion-min-width)',
  padding: 'var(--h-accordion-padding)',
} as const;

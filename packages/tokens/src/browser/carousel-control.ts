export const carouselControl = {
  gap: 'var(--h-carousel-control-gap)',
  item: {
    backgroundColorActive: 'var(--h-carousel-control-item-background-color-active)',
    borderColor: 'var(--h-carousel-control-item-border-color)',
    borderColorHover: 'var(--h-carousel-control-item-border-color-hover)',
    borderWidth: 'var(--h-carousel-control-item-border-width)',
    inverted: {
      backgroundColorActive: 'var(--h-carousel-control-item-inverted-background-color-active)',
      borderColor: 'var(--h-carousel-control-item-inverted-border-color)',
      borderColorHover: 'var(--h-carousel-control-item-inverted-border-color-hover)',
    },
  },
  size: 'var(--h-carousel-control-size)',
} as const;

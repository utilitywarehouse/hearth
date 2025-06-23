export const topNavigation = {
  emphasis: {
    backgroundColor: 'var(--h-top-navigation-emphasis-background-color)',
  },
  gap: 'var(--h-top-navigation-gap)',
  largeTitle: {
    gap: 'var(--h-top-navigation-large-title-gap)',
    paddingBottom: 'var(--h-top-navigation-large-title-padding-bottom)',
    paddingHorizontal: 'var(--h-top-navigation-large-title-padding-horizontal)',
    paddingTop: 'var(--h-top-navigation-large-title-padding-top)',
  },
  navigationBar: {
    gap: 'var(--h-top-navigation-navigation-bar-gap)',
    paddingHorizontal: 'var(--h-top-navigation-navigation-bar-padding-horizontal)',
    paddingVertical: 'var(--h-top-navigation-navigation-bar-padding-vertical)',
  },
  paddingHorizontal: 'var(--h-top-navigation-padding-horizontal)',
  paddingVertical: 'var(--h-top-navigation-padding-vertical)',
  subtle: {
    backgroundColor: 'var(--h-top-navigation-subtle-background-color)',
  },
} as const;

export const badge = {
  borderRadius: 'var(--h-badge-border-radius)',
  flatBase: {
    borderBottomLeftRadius: 'var(--h-badge-flat-base-border-bottom-left-radius)',
    borderBottomRightRadius: 'var(--h-badge-flat-base-border-bottom-right-radius)',
  },
  gap: 'var(--h-badge-gap)',
  outline: {
    blue: {
      color: 'var(--h-badge-outline-blue-color)',
    },
    borderColor: 'var(--h-badge-outline-border-color)',
    borderWidth: 'var(--h-badge-outline-border-width)',
    green: {
      color: 'var(--h-badge-outline-green-color)',
    },
    grey: {
      color: 'var(--h-badge-outline-grey-color)',
    },
    orange: {
      color: 'var(--h-badge-outline-orange-color)',
    },
    red: {
      color: 'var(--h-badge-outline-red-color)',
    },
  },
  paddingHorizontal: 'var(--h-badge-padding-horizontal)',
  paddingVertical: 'var(--h-badge-padding-vertical)',
  solid: {
    blue: {
      backgroundColor: 'var(--h-badge-solid-blue-background-color)',
    },
    color: 'var(--h-badge-solid-color)',
    green: {
      backgroundColor: 'var(--h-badge-solid-green-background-color)',
    },
    grey: {
      backgroundColor: 'var(--h-badge-solid-grey-background-color)',
    },
    orange: {
      backgroundColor: 'var(--h-badge-solid-orange-background-color)',
    },
    red: {
      backgroundColor: 'var(--h-badge-solid-red-background-color)',
    },
  },
} as const;

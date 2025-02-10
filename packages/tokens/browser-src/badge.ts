export const badge = {
  borderRadius: 'var(--badge-border-radius)',
  flatBase: {
    borderBottomLeftRadius: 'var(--badge-flat-base-border-bottom-left-radius)',
    borderBottomRightRadius: 'var(--badge-flat-base-border-bottom-right-radius)',
  },
  gap: 'var(--badge-gap)',
  outline: {
    blue: {
      color: 'var(--badge-outline-blue-color)',
    },
    borderColor: 'var(--badge-outline-border-color)',
    borderWidth: 'var(--badge-outline-border-width)',
    green: {
      color: 'var(--badge-outline-green-color)',
    },
    grey: {
      color: 'var(--badge-outline-grey-color)',
    },
    orange: {
      color: 'var(--badge-outline-orange-color)',
    },
    red: {
      color: 'var(--badge-outline-red-color)',
    },
  },
  paddingHorizontal: 'var(--badge-padding-horizontal)',
  paddingVertical: 'var(--badge-padding-vertical)',
  solid: {
    blue: {
      backgroundColor: 'var(--badge-solid-blue-background-color)',
    },
    color: 'var(--badge-solid-color)',
    green: {
      backgroundColor: 'var(--badge-solid-green-background-color)',
    },
    grey: {
      backgroundColor: 'var(--badge-solid-grey-background-color)',
    },
    orange: {
      backgroundColor: 'var(--badge-solid-orange-background-color)',
    },
    red: {
      backgroundColor: 'var(--badge-solid-red-background-color)',
    },
  },
} as const;

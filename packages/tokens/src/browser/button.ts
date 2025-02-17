export const button = {
  emphasis: {
    yellow: {
      '#fcfbf2': {
        backgroundColor: 'var(--button-emphasis-yellow-#fcfbf2-background-color)',
        backgroundColorActive: 'var(--button-emphasis-yellow-#fcfbf2-background-color-active)',
        backgroundColorHover: 'var(--button-emphasis-yellow-#fcfbf2-background-color-hover)',
        borderColor: 'var(--button-emphasis-yellow-#fcfbf2-border-color)',
        foregroundColor: 'var(--button-emphasis-yellow-#fcfbf2-foreground-color)',
        shadowColor: 'var(--button-emphasis-yellow-#fcfbf2-shadow-color)',
      },
      backgroundColor: 'var(--button-emphasis-yellow-background-color)',
      backgroundColorActive: 'var(--button-emphasis-yellow-background-color-active)',
      backgroundColorHover: 'var(--button-emphasis-yellow-background-color-hover)',
      borderColor: 'var(--button-emphasis-yellow-border-color)',
      foregroundColor: 'var(--button-emphasis-yellow-foreground-color)',
      shadowColor: 'var(--button-emphasis-yellow-shadow-color)',
    },
  },
  ghost: {
    green: {
      backgroundColorActive: 'var(--button-ghost-green-background-color-active)',
      backgroundColorHover: 'var(--button-ghost-green-background-color-hover)',
      foregroundColor: 'var(--button-ghost-green-foreground-color)',
    },
    grey: {
      backgroundColorActive: 'var(--button-ghost-grey-background-color-active)',
      backgroundColorHover: 'var(--button-ghost-grey-background-color-hover)',
      foregroundColor: 'var(--button-ghost-grey-foreground-color)',
      inverted: {
        backgroundColorActive: 'var(--button-ghost-grey-inverted-background-color-active)',
        backgroundColorHover: 'var(--button-ghost-grey-inverted-background-color-hover)',
        foregroundColor: 'var(--button-ghost-grey-inverted-foreground-color)',
      },
    },
    red: {
      backgroundColorActive: 'var(--button-ghost-red-background-color-active)',
      backgroundColorHover: 'var(--button-ghost-red-background-color-hover)',
      foregroundColor: 'var(--button-ghost-red-foreground-color)',
    },
  },
  md: {
    borderRadius: 'var(--button-md-border-radius)',
    gap: 'var(--button-md-gap)',
    paddingHorizontal: 'var(--button-md-padding-horizontal)',
    paddingVertical: 'var(--button-md-padding-vertical)',
  },
  outline: {
    green: {
      backgroundColorActive: 'var(--button-outline-green-background-color-active)',
      backgroundColorHover: 'var(--button-outline-green-background-color-hover)',
      borderColor: 'var(--button-outline-green-border-color)',
      foregroundColor: 'var(--button-outline-green-foreground-color)',
    },
    grey: {
      backgroundColorActive: 'var(--button-outline-grey-background-color-active)',
      backgroundColorHover: 'var(--button-outline-grey-background-color-hover)',
      borderColor: 'var(--button-outline-grey-border-color)',
      foregroundColor: 'var(--button-outline-grey-foreground-color)',
      inverted: {
        backgroundColorActive: 'var(--button-outline-grey-inverted-background-color-active)',
        backgroundColorHover: 'var(--button-outline-grey-inverted-background-color-hover)',
        borderColor: 'var(--button-outline-grey-inverted-border-color)',
        foregroundColor: 'var(--button-outline-grey-inverted-foreground-color)',
      },
    },
    red: {
      backgroundColorActive: 'var(--button-outline-red-background-color-active)',
      backgroundColorHover: 'var(--button-outline-red-background-color-hover)',
      borderColor: 'var(--button-outline-red-border-color)',
      foregroundColor: 'var(--button-outline-red-foreground-color)',
    },
  },
  sm: {
    borderRadius: 'var(--button-sm-border-radius)',
    gap: 'var(--button-sm-gap)',
    paddingHorizontal: 'var(--button-sm-padding-horizontal)',
    paddingVertical: 'var(--button-sm-padding-vertical)',
  },
  solid: {
    green: {
      backgroundColor: 'var(--button-solid-green-background-color)',
      backgroundColorActive: 'var(--button-solid-green-background-color-active)',
      backgroundColorHover: 'var(--button-solid-green-background-color-hover)',
      borderColor: 'var(--button-solid-green-border-color)',
      foregroundColor: 'var(--button-solid-green-foreground-color)',
    },
    red: {
      backgroundColor: 'var(--button-solid-red-background-color)',
      backgroundColorActive: 'var(--button-solid-red-background-color-active)',
      backgroundColorHover: 'var(--button-solid-red-background-color-hover)',
      borderColor: 'var(--button-solid-red-border-color)',
      foregroundColor: 'var(--button-solid-red-foreground-color)',
    },
    yellow: {
      backgroundColor: 'var(--button-solid-yellow-background-color)',
      backgroundColorActive: 'var(--button-solid-yellow-background-color-active)',
      backgroundColorHover: 'var(--button-solid-yellow-background-color-hover)',
      borderColor: 'var(--button-solid-yellow-border-color)',
      foregroundColor: 'var(--button-solid-yellow-foreground-color)',
      inverted: {
        backgroundColor: 'var(--button-solid-yellow-inverted-background-color)',
        backgroundColorActive: 'var(--button-solid-yellow-inverted-background-color-active)',
        backgroundColorHover: 'var(--button-solid-yellow-inverted-background-color-hover)',
        borderColor: 'var(--button-solid-yellow-inverted-border-color)',
        foregroundColor: 'var(--button-solid-yellow-inverted-foreground-color)',
      },
    },
  },
} as const;

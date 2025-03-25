export const switchComponent = {
  checked: {
    backgroundColor: 'var(--h-switch-checked-background-color)',
    backgroundColorActive: 'var(--h-switch-checked-background-color-active)',
    backgroundColorHover: 'var(--h-switch-checked-background-color-hover)',
    iconColor: 'var(--h-switch-checked-icon-color)',
  },
  circle: {
    backgroundColor: 'var(--h-switch-circle-background-color)',
  },
  md: {
    circle: {
      size: 'var(--h-switch-md-circle-size)',
    },
    height: 'var(--h-switch-md-height)',
    width: 'var(--h-switch-md-width)',
  },
  padding: 'var(--h-switch-padding)',
  radius: 'var(--h-switch-radius)',
  sm: {
    circle: {
      size: 'var(--h-switch-sm-circle-size)',
    },
    height: 'var(--h-switch-sm-height)',
    width: 'var(--h-switch-sm-width)',
  },
  unchecked: {
    backgroundColor: 'var(--h-switch-unchecked-background-color)',
    backgroundColorActive: 'var(--h-switch-unchecked-background-color-active)',
    backgroundColorHover: 'var(--h-switch-unchecked-background-color-hover)',
    iconColor: 'var(--h-switch-unchecked-icon-color)',
  },
} as const;

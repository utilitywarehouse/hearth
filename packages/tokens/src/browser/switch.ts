export const switchComponent = {
  checked: {
    backgroundColor: 'var(--switch-checked-background-color)',
    backgroundColorActive: 'var(--switch-checked-background-color-active)',
    backgroundColorHover: 'var(--switch-checked-background-color-hover)',
  },
  circleBackgroundColor: 'var(--switch-circle-background-color)',
  padding: 'var(--switch-padding)',
  radius: 'var(--switch-radius)',
  unchecked: {
    backgroundColor: 'var(--switch-unchecked-background-color)',
    backgroundColorActive: 'var(--switch-unchecked-background-color-active)',
    backgroundColorHover: 'var(--switch-unchecked-background-color-hover)',
  },
} as const;

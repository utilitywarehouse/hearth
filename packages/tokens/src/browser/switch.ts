export const switchComponent = {
  checked: {
    backgroundColor: 'var(--h-switch-checked-background-color)',
    backgroundColorActive: 'var(--h-switch-checked-background-color-active)',
    backgroundColorHover: 'var(--h-switch-checked-background-color-hover)',
    iconColor: 'var(--h-switch-checked-icon-color)',
  },
  circleBackgroundColor: 'var(--h-switch-circle-background-color)',
  padding: 'var(--h-switch-padding)',
  radius: 'var(--h-switch-radius)',
  unchecked: {
    backgroundColor: 'var(--h-switch-unchecked-background-color)',
    backgroundColorActive: 'var(--h-switch-unchecked-background-color-active)',
    backgroundColorHover: 'var(--h-switch-unchecked-background-color-hover)',
    iconColor: 'var(--h-switch-unchecked-icon-color)',
  },
} as const;

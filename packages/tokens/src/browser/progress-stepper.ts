export const progressStepper = {
  bar: {
    complete: {
      backgroundColor: 'var(--h-progress-stepper-bar-complete-background-color)',
    },
    height: 'var(--h-progress-stepper-bar-height)',
  },
  gapHorizontal: 'var(--h-progress-stepper-gap-horizontal)',
  gapVertical: 'var(--h-progress-stepper-gap-vertical)',
  indicator: {
    complete: {
      iconColor: 'var(--h-progress-stepper-indicator-complete-icon-color)',
    },
    future: {
      borderWidth: 'var(--h-progress-stepper-indicator-future-border-width)',
    },
    height: 'var(--h-progress-stepper-indicator-height)',
    width: 'var(--h-progress-stepper-indicator-width)',
  },
} as const;

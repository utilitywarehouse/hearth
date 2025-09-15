export const progressBar = {
  barColor: 'var(--h-progress-bar-bar-color)',
  circular: {
    md: {
      bar: {
        width: 'var(--h-progress-bar-circular-md-bar-width)',
      },
      gap: 'var(--h-progress-bar-circular-md-gap)',
      height: 'var(--h-progress-bar-circular-md-height)',
      label: {
        fontFamily: 'var(--h-progress-bar-circular-md-label-font-family)',
        fontSize: 'var(--h-progress-bar-circular-md-label-font-size)',
        fontWeight: 'var(--h-progress-bar-circular-md-label-font-weight)',
        lineHeight: 'var(--h-progress-bar-circular-md-label-line-height)',
      },
    },
    sm: {
      barWidth: 'var(--h-progress-bar-circular-sm-bar-width)',
      height: 'var(--h-progress-bar-circular-sm-height)',
    },
  },
  linear: {
    bar: {
      borderRadius: 'var(--h-progress-bar-linear-bar-border-radius)',
      height: 'var(--h-progress-bar-linear-bar-height)',
    },
    gap: 'var(--h-progress-bar-linear-gap)',
    label: {
      gap: 'var(--h-progress-bar-linear-label-gap)',
    },
  },
  progress: {
    dangerColor: 'var(--h-progress-bar-progress-danger-color)',
    defaultColor: 'var(--h-progress-bar-progress-default-color)',
    successColor: 'var(--h-progress-bar-progress-success-color)',
  },
} as const;

export declare const progressBar: {
  readonly barColor: 'var(--h-progress-bar-bar-color)';
  readonly circular: {
    readonly md: {
      readonly bar: {
        readonly width: 'var(--h-progress-bar-circular-md-bar-width)';
      };
      readonly gap: 'var(--h-progress-bar-circular-md-gap)';
      readonly height: 'var(--h-progress-bar-circular-md-height)';
      readonly label: {
        readonly fontFamily: 'var(--h-progress-bar-circular-md-label-font-family)';
        readonly fontSize: 'var(--h-progress-bar-circular-md-label-font-size)';
        readonly fontWeight: 'var(--h-progress-bar-circular-md-label-font-weight)';
        readonly lineHeight: 'var(--h-progress-bar-circular-md-label-line-height)';
      };
    };
    readonly sm: {
      readonly barWidth: 'var(--h-progress-bar-circular-sm-bar-width)';
      readonly height: 'var(--h-progress-bar-circular-sm-height)';
    };
  };
  readonly linear: {
    readonly bar: {
      readonly borderRadius: 'var(--h-progress-bar-linear-bar-border-radius)';
      readonly height: 'var(--h-progress-bar-linear-bar-height)';
    };
    readonly gap: 'var(--h-progress-bar-linear-gap)';
    readonly label: {
      readonly gap: 'var(--h-progress-bar-linear-label-gap)';
    };
  };
  readonly progress: {
    readonly dangerColor: 'var(--h-progress-bar-progress-danger-color)';
    readonly defaultColor: 'var(--h-progress-bar-progress-default-color)';
    readonly successColor: 'var(--h-progress-bar-progress-success-color)';
  };
};

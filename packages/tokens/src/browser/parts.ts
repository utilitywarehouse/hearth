export const parts = {
  homeIndicator: {
    foregroundColor: 'var(--h-parts-home-indicator-foreground-color)',
    foregroundColorInverted: 'var(--h-parts-home-indicator-foreground-color-inverted)',
  },
  modalStack: {
    backgroundColor: 'var(--h-parts-modal-stack-background-color)',
    backgroundColorCardBottom: 'var(--h-parts-modal-stack-background-color-card-bottom)',
    backgroundColorCardTop: 'var(--h-parts-modal-stack-background-color-card-top)',
  },
  placeholder: {
    borderColor: 'var(--h-parts-placeholder-border-color)',
  },
  statusBar: {
    foregroundColor: 'var(--h-parts-status-bar-foreground-color)',
    foregroundColorInverted: 'var(--h-parts-status-bar-foreground-color-inverted)',
    notch: 'var(--h-parts-status-bar-notch)',
  },
} as const;

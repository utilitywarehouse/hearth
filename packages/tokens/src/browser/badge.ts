export const badge = {
  borderRadius: 'var(--h-badge-border-radius)',
  flatBase: {
    borderBottomLeftRadius: 'var(--h-badge-flat-base-border-bottom-left-radius)',
    borderBottomRightRadius: 'var(--h-badge-flat-base-border-bottom-right-radius)',
  },
  gap: 'var(--h-badge-gap)',
  md: {
    height: 'var(--h-badge-md-height)',
    paddingVertical: 'var(--h-badge-md-padding-vertical)',
  },
  outline: {
    borderWidth: 'var(--h-badge-outline-border-width)',
  },
  paddingHorizontal: 'var(--h-badge-padding-horizontal)',
  sm: {
    height: 'var(--h-badge-sm-height)',
    paddingVertical: 'var(--h-badge-sm-padding-vertical)',
  },
} as const;

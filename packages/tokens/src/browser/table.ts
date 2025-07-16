export const table = {
  backgroundColor: 'var(--h-table-background-color)',
  borderRadius: 'var(--h-table-border-radius)',
  cell: {
    backgroundColorActive: 'var(--h-table-cell-background-color-active)',
    backgroundColorHover: 'var(--h-table-cell-background-color-hover)',
    borderWidth: 'var(--h-table-cell-border-width)',
    dividerColor: 'var(--h-table-cell-divider-color)',
    padding: 'var(--h-table-cell-padding)',
  },
  emphasis: {
    borderWidth: 'var(--h-table-emphasis-border-width)',
    dividerColor: 'var(--h-table-emphasis-divider-color)',
  },
  headerCell: {
    borderWidth: 'var(--h-table-header-cell-border-width)',
    gap: 'var(--h-table-header-cell-gap)',
    paddingHorizontal: 'var(--h-table-header-cell-padding-horizontal)',
    paddingVertical: 'var(--h-table-header-cell-padding-vertical)',
    purple: {
      backgroundColor: 'var(--h-table-header-cell-purple-background-color)',
      dividerColor: 'var(--h-table-header-cell-purple-divider-color)',
    },
    white: {
      backgroundColor: 'var(--h-table-header-cell-white-background-color)',
      dividerColor: 'var(--h-table-header-cell-white-divider-color)',
    },
  },
  subtle: {
    borderWidth: 'var(--h-table-subtle-border-width)',
    dividerColor: 'var(--h-table-subtle-divider-color)',
  },
} as const;

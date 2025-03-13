export const select = {
  backgroundColor: 'var(--select-background-color)',
  borderColor: 'var(--select-border-color)',
  borderColorInvalid: 'var(--select-border-color-invalid)',
  borderColorReadOnly: 'var(--select-border-color-read-only)',
  borderColorValid: 'var(--select-border-color-valid)',
  borderRadius: 'var(--select-border-radius)',
  borderWidth: 'var(--select-border-width)',
  borderWidthFocused: 'var(--select-border-width-focused)',
  colorPlaceholder: 'var(--select-color-placeholder)',
  dropdown: {
    backgroundColor: 'var(--select-dropdown-background-color)',
    borderColor: 'var(--select-dropdown-border-color)',
    borderWidth: 'var(--select-dropdown-border-width)',
    gap: 'var(--select-dropdown-gap)',
    item: {
      active: {
        backgroundColor: 'var(--select-dropdown-item-active-background-color)',
      },
      borderRadius: 'var(--select-dropdown-item-border-radius)',
      focus: {
        borderColor: 'var(--select-dropdown-item-focus-border-color)',
        borderWidthFocused: 'var(--select-dropdown-item-focus-border-width-focused)',
      },
      gap: 'var(--select-dropdown-item-gap)',
      hover: {
        backgroundColor: 'var(--select-dropdown-item-hover-background-color)',
      },
      padding: 'var(--select-dropdown-item-padding)',
    },
    padding: 'var(--select-dropdown-padding)',
  },
  gap: 'var(--select-gap)',
  gapContainer: 'var(--select-gap-container)',
  height: 'var(--select-height)',
  paddingHorizontal: 'var(--select-padding-horizontal)',
  paddingVertical: 'var(--select-padding-vertical)',
  validation: {
    gap: 'var(--select-validation-gap)',
  },
} as const;

export const card = {
  borderRadius: 'var(--h-card-border-radius)',
  brand: {
    borderWidth: 'var(--h-card-brand-border-width)',
    emphasis: {
      borderColor: 'var(--h-card-brand-emphasis-border-color)',
      broadbandGreenBackgroundColor:
        'var(--h-card-brand-emphasis-broadband-green-background-color)',
      cashbackLilacBackgroundColor: 'var(--h-card-brand-emphasis-cashback-lilac-background-color)',
      energyBlueBackgroundColor: 'var(--h-card-brand-emphasis-energy-blue-background-color)',
      insuranceOrangeBackgroundColor:
        'var(--h-card-brand-emphasis-insurance-orange-background-color)',
      mobileRoseBackgroundColor: 'var(--h-card-brand-emphasis-mobile-rose-background-color)',
      piggyPinkBackgroundColor: 'var(--h-card-brand-emphasis-piggy-pink-background-color)',
      purpleBackgroundColor: 'var(--h-card-brand-emphasis-purple-background-color)',
    },
    subtle: {
      borderColor: 'var(--h-card-brand-subtle-border-color)',
      broadbandGreenBackgroundColor: 'var(--h-card-brand-subtle-broadband-green-background-color)',
      cashbackLilacBackgroundColor: 'var(--h-card-brand-subtle-cashback-lilac-background-color)',
      energyBlueBackgroundColor: 'var(--h-card-brand-subtle-energy-blue-background-color)',
      insuranceOrangeBackgroundColor:
        'var(--h-card-brand-subtle-insurance-orange-background-color)',
      mobileRoseBackgroundColor: 'var(--h-card-brand-subtle-mobile-rose-background-color)',
      piggyPinkBackgroundColor: 'var(--h-card-brand-subtle-piggy-pink-background-color)',
      purpleBackgroundColor: 'var(--h-card-brand-subtle-purple-background-color)',
      yellowBackgroundColor: 'var(--h-card-brand-subtle-yellow-background-color)',
    },
  },
  neutral: {
    emphasis: {
      borderColor: 'var(--h-card-neutral-emphasis-border-color)',
      borderWidth: 'var(--h-card-neutral-emphasis-border-width)',
    },
    subtle: {
      borderColor: 'var(--h-card-neutral-subtle-border-color)',
      borderWidth: 'var(--h-card-neutral-subtle-border-width)',
    },
    warmWhiteBackgroundColor: 'var(--h-card-neutral-warm-white-background-color)',
    whiteBackgroundColor: 'var(--h-card-neutral-white-background-color)',
  },
  selectable: {
    backgroundColor: 'var(--h-card-selectable-background-color)',
    borderColor: 'var(--h-card-selectable-border-color)',
    borderColorSelected: 'var(--h-card-selectable-border-color-selected)',
    borderWidth: 'var(--h-card-selectable-border-width)',
    borderWidthSelected: 'var(--h-card-selectable-border-width-selected)',
    gap: 'var(--h-card-selectable-gap)',
  },
} as const;

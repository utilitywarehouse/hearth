export const components = {
  card: {
    padding: {
      desktop: 'var(--h-card-padding-desktop)',
      mobile: 'var(--h-card-padding-mobile)',
      tablet: 'var(--h-card-padding-tablet)',
    },
    paddingNone: {
      desktop: 'var(--h-card-padding-none-desktop)',
      mobile: 'var(--h-card-padding-none-mobile)',
      tablet: 'var(--h-card-padding-none-tablet)',
    },
  },
  dialog: {
    width: {
      desktop: 'var(--h-dialog-width-desktop)',
      mobile: 'var(--h-dialog-width-mobile)',
      tablet: 'var(--h-dialog-width-tablet)',
    },
  },
  modal: {
    padding: {
      desktop: 'var(--h-modal-padding-desktop)',
      mobile: 'var(--h-modal-padding-mobile)',
      tablet: 'var(--h-modal-padding-tablet)',
    },
    width: {
      desktop: 'var(--h-modal-width-desktop)',
      mobile: 'var(--h-modal-width-mobile)',
      tablet: 'var(--h-modal-width-tablet)',
    },
  },
  heading: {
    lg: {
      fontSize: {
        desktop: 'var(--h-heading-lg-font-size-desktop)',
        mobile: 'var(--h-heading-lg-font-size-mobile)',
        tablet: 'var(--h-heading-lg-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--h-heading-lg-line-height-desktop)',
        mobile: 'var(--h-heading-lg-line-height-mobile)',
        tablet: 'var(--h-heading-lg-line-height-tablet)',
      },
      fontWeight: 'var(--h-heading-lg-font-weight)',
    },
    md: {
      fontSize: {
        desktop: 'var(--h-heading-md-font-size-desktop)',
        mobile: 'var(--h-heading-md-font-size-mobile)',
        tablet: 'var(--h-heading-md-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--h-heading-md-line-height-desktop)',
        mobile: 'var(--h-heading-md-line-height-mobile)',
        tablet: 'var(--h-heading-md-line-height-tablet)',
      },
      fontWeight: 'var(--h-heading-md-font-weight)',
    },
    sm: {
      fontSize: {
        desktop: 'var(--h-heading-sm-font-size-desktop)',
        mobile: 'var(--h-heading-sm-font-size-mobile)',
        tablet: 'var(--h-heading-sm-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--h-heading-sm-line-height-desktop)',
        mobile: 'var(--h-heading-sm-line-height-mobile)',
        tablet: 'var(--h-heading-sm-line-height-tablet)',
      },
      fontWeight: 'var(--h-heading-sm-font-weight)',
    },
    xl: {
      fontSize: {
        desktop: 'var(--h-heading-xl-font-size-desktop)',
        mobile: 'var(--h-heading-xl-font-size-mobile)',
        tablet: 'var(--h-heading-xl-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--h-heading-xl-line-height-desktop)',
        mobile: 'var(--h-heading-xl-line-height-mobile)',
        tablet: 'var(--h-heading-xl-line-height-tablet)',
      },
      fontWeight: 'var(--h-heading-xl-font-weight)',
    },
  },
  bodyText: {
    fontWeight: 'var(--h-body-text-font-weight)',
    fontWeightBold: 'var(--h-body-text-font-weight-bold)',
    fontWeightSemibold: 'var(--h-body-text-font-weight-semibold)',
    lg: {
      fontSize: 'var(--h-body-text-lg-font-size)',
      lineHeight: 'var(--h-body-text-lg-line-height)',
      paragraphSpacing: 'var(--h-body-text-lg-paragraph-spacing)',
    },
    md: {
      fontSize: 'var(--h-body-text-md-font-size)',
      lineHeight: 'var(--h-body-text-md-line-height)',
      paragraphSpacing: 'var(--h-body-text-md-paragraph-spacing)',
    },
    sm: {
      fontSize: 'var(--h-body-text-sm-font-size)',
      lineHeight: 'var(--h-body-text-sm-line-height)',
      paragraphSpacing: 'var(--h-body-text-sm-paragraph-spacing)',
    },
  },
  detailText: {
    '2xl': {
      fontSize: 'var(--h-detail-text-2xl-font-size)',
      letterSpacing: 'var(--h-detail-text-2xl-letter-spacing)',
      lineHeight: 'var(--h-detail-text-2xl-line-height)',
    },
    '3xl': {
      fontSize: 'var(--h-detail-text-3xl-font-size)',
      letterSpacing: 'var(--h-detail-text-3xl-letter-spacing)',
      lineHeight: 'var(--h-detail-text-3xl-line-height)',
    },
    '4xl': {
      fontSize: 'var(--h-detail-text-4xl-font-size)',
      letterSpacing: 'var(--h-detail-text-4xl-letter-spacing)',
      lineHeight: 'var(--h-detail-text-4xl-line-height)',
    },
    fontWeight: 'var(--h-detail-text-font-weight)',
    lg: {
      fontSize: 'var(--h-detail-text-lg-font-size)',
      letterSpacing: 'var(--h-detail-text-lg-letter-spacing)',
      lineHeight: 'var(--h-detail-text-lg-line-height)',
    },
    md: {
      fontSize: 'var(--h-detail-text-md-font-size)',
      letterSpacing: 'var(--h-detail-text-md-letter-spacing)',
      lineHeight: 'var(--h-detail-text-md-line-height)',
    },
    sm: {
      fontSize: 'var(--h-detail-text-sm-font-size)',
      letterSpacing: 'var(--h-detail-text-sm-letter-spacing)',
      lineHeight: 'var(--h-detail-text-sm-line-height)',
    },
    xl: {
      fontSize: 'var(--h-detail-text-xl-font-size)',
      letterSpacing: 'var(--h-detail-text-xl-letter-spacing)',
      lineHeight: 'var(--h-detail-text-xl-line-height)',
    },
  },
} as const;

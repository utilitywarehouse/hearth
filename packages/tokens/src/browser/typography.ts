export const typography = {
  heading: {
    lg: {
      fontSize: {
        desktop: 'var(--heading-lg-font-size-desktop)',
        mobile: 'var(--heading-lg-font-size-mobile)',
        tablet: 'var(--heading-lg-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--heading-lg-line-height-desktop)',
        mobile: 'var(--heading-lg-line-height-mobile)',
        tablet: 'var(--heading-lg-line-height-tablet)',
      },
      fontWeight: 'var(--heading-lg-font-weight)',
    },
    md: {
      fontSize: {
        desktop: 'var(--heading-md-font-size-desktop)',
        mobile: 'var(--heading-md-font-size-mobile)',
        tablet: 'var(--heading-md-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--heading-md-line-height-desktop)',
        mobile: 'var(--heading-md-line-height-mobile)',
        tablet: 'var(--heading-md-line-height-tablet)',
      },
      fontWeight: 'var(--heading-md-font-weight)',
    },
    sm: {
      fontSize: {
        desktop: 'var(--heading-sm-font-size-desktop)',
        mobile: 'var(--heading-sm-font-size-mobile)',
        tablet: 'var(--heading-sm-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--heading-sm-line-height-desktop)',
        mobile: 'var(--heading-sm-line-height-mobile)',
        tablet: 'var(--heading-sm-line-height-tablet)',
      },
      fontWeight: 'var(--heading-sm-font-weight)',
    },
    xl: {
      fontSize: {
        desktop: 'var(--heading-xl-font-size-desktop)',
        mobile: 'var(--heading-xl-font-size-mobile)',
        tablet: 'var(--heading-xl-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--heading-xl-line-height-desktop)',
        mobile: 'var(--heading-xl-line-height-mobile)',
        tablet: 'var(--heading-xl-line-height-tablet)',
      },
      fontWeight: 'var(--heading-xl-font-weight)',
    },
  },
  bodyText: {
    fontWeight: 'var(--body-text-font-weight)',
    fontWeightBold: 'var(--body-text-font-weight-bold)',
    fontWeightSemibold: 'var(--body-text-font-weight-semibold)',
    lg: {
      fontSize: 'var(--body-text-lg-font-size)',
      lineHeight: 'var(--body-text-lg-line-height)',
      paragraphSpacing: 'var(--body-text-lg-paragraph-spacing)',
    },
    md: {
      fontSize: 'var(--body-text-md-font-size)',
      lineHeight: 'var(--body-text-md-line-height)',
      paragraphSpacing: 'var(--body-text-md-paragraph-spacing)',
    },
    sm: {
      fontSize: 'var(--body-text-sm-font-size)',
      lineHeight: 'var(--body-text-sm-line-height)',
      paragraphSpacing: 'var(--body-text-sm-paragraph-spacing)',
    },
  },
  detailText: {
    '2xl': {
      fontSize: 'var(--detail-text-2xl-font-size)',
      lineHeight: 'var(--detail-text-2xl-line-height)',
    },
    '3xl': {
      fontSize: 'var(--detail-text-3xl-font-size)',
      lineHeight: 'var(--detail-text-3xl-line-height)',
    },
    '4xl': {
      fontSize: 'var(--detail-text-4xl-font-size)',
      lineHeight: 'var(--detail-text-4xl-line-height)',
    },
    fontWeight: 'var(--detail-text-font-weight)',
    lg: {
      fontSize: 'var(--detail-text-lg-font-size)',
      lineHeight: 'var(--detail-text-lg-line-height)',
    },
    md: {
      fontSize: 'var(--detail-text-md-font-size)',
      lineHeight: 'var(--detail-text-md-line-height)',
    },
    sm: {
      fontSize: 'var(--detail-text-sm-font-size)',
      lineHeight: 'var(--detail-text-sm-line-height)',
    },
    xl: {
      fontSize: 'var(--detail-text-xl-font-size)',
      lineHeight: 'var(--detail-text-xl-line-height)',
    },
  },
} as const;

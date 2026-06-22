export const components = {
  accordion: {
    gap: 'var(--h-accordion-gap)',
    heading: {
      gap: 'var(--h-accordion-heading-gap)',
    },
    item: {
      content: {
        gap: 'var(--h-accordion-item-content-gap)',
        paddingBottom: 'var(--h-accordion-item-content-padding-bottom)',
        paddingHorizontal: 'var(--h-accordion-item-content-padding-horizontal)',
        paddingTop: 'var(--h-accordion-item-content-padding-top)',
      },
      gap: 'var(--h-accordion-item-gap)',
      heading: {
        gap: 'var(--h-accordion-item-heading-gap)',
        paddingHorizontal: 'var(--h-accordion-item-heading-padding-horizontal)',
        paddingVertical: 'var(--h-accordion-item-heading-padding-vertical)',
      },
    },
    maxWidth: 'var(--h-accordion-max-width)',
    minWidth: 'var(--h-accordion-min-width)',
    padding: 'var(--h-accordion-padding)',
  },
  alert: {
    borderRadius: 'var(--h-alert-border-radius)',
    borderWidth: 'var(--h-alert-border-width)',
    contentGap: 'var(--h-alert-content-gap)',
    gap: 'var(--h-alert-gap)',
    iconButton: {
      unstyled: {
        foregroundColor: 'var(--h-alert-icon-button-unstyled-foreground-color)',
        foregroundColorActive: 'var(--h-alert-icon-button-unstyled-foreground-color-active)',
        foregroundColorHover: 'var(--h-alert-icon-button-unstyled-foreground-color-hover)',
      },
    },
    link: {
      color: 'var(--h-alert-link-color)',
      colorActive: 'var(--h-alert-link-color-active)',
      colorHover: 'var(--h-alert-link-color-hover)',
    },
    padding: 'var(--h-alert-padding)',
  },
  avatar: {
    image: {
      borderWidth: 'var(--h-avatar-image-border-width)',
    },
    md: {
      borderRadius: 'var(--h-avatar-md-border-radius)',
      height: 'var(--h-avatar-md-height)',
      width: 'var(--h-avatar-md-width)',
    },
    sm: {
      borderRadius: 'var(--h-avatar-sm-border-radius)',
      height: 'var(--h-avatar-sm-height)',
      width: 'var(--h-avatar-sm-width)',
    },
  },
  badge: {
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
  },
  banner: {
    default: {
      content: {
        gap: 'var(--h-banner-default-content-gap)',
        textGap: 'var(--h-banner-default-content-text-gap)',
      },
      gap: 'var(--h-banner-default-gap)',
      horizontal: {
        illustrationWidth: 'var(--h-banner-default-horizontal-illustration-width)',
        imageMaxWidth: 'var(--h-banner-default-horizontal-image-max-width)',
        imageMinWidth: 'var(--h-banner-default-horizontal-image-min-width)',
        maxWidth: 'var(--h-banner-default-horizontal-max-width)',
        minWidth: 'var(--h-banner-default-horizontal-min-width)',
      },
      imageHeight: 'var(--h-banner-default-image-height)',
      padding: 'var(--h-banner-default-padding)',
      vertical: {
        maxWidth: 'var(--h-banner-default-vertical-max-width)',
        minWidth: 'var(--h-banner-default-vertical-min-width)',
      },
    },
    highlight: {
      content: {
        gap: 'var(--h-banner-highlight-content-gap)',
      },
      gap: 'var(--h-banner-highlight-gap)',
      padding: 'var(--h-banner-highlight-padding)',
    },
    imageContainerBorderColor: 'var(--h-banner-image-container-border-color)',
  },
  bottomSheet: {
    borderTopLeftRadius: 'var(--h-bottom-sheet-border-top-left-radius)',
    borderTopRightRadius: 'var(--h-bottom-sheet-border-top-right-radius)',
    gap: 'var(--h-bottom-sheet-gap)',
    handle: {
      backgroundColor: 'var(--h-bottom-sheet-handle-background-color)',
      borderRadius: 'var(--h-bottom-sheet-handle-border-radius)',
      height: 'var(--h-bottom-sheet-handle-height)',
      width: 'var(--h-bottom-sheet-handle-width)',
    },
    padding: 'var(--h-bottom-sheet-padding)',
  },
  breadcrumb: {
    gap: 'var(--h-breadcrumb-gap)',
  },
  button: {
    borderRadius: 'var(--h-button-border-radius)',
    borderWidth: 'var(--h-button-border-width)',
    gap: 'var(--h-button-gap)',
    md: {
      paddingHorizontal: 'var(--h-button-md-padding-horizontal)',
      paddingVertical: 'var(--h-button-md-padding-vertical)',
    },
    minWidth: 'var(--h-button-min-width)',
    shadowColor: 'var(--h-button-shadow-color)',
    sm: {
      paddingHorizontal: 'var(--h-button-sm-padding-horizontal)',
      paddingVertical: 'var(--h-button-sm-padding-vertical)',
    },
  },
  card: {
    borderRadius: 'var(--h-card-border-radius)',
    brand: {
      borderWidth: 'var(--h-card-brand-border-width)',
    },
    neutral: {
      emphasis: {
        borderWidth: 'var(--h-card-neutral-emphasis-border-width)',
      },
      subtle: {
        borderWidth: 'var(--h-card-neutral-subtle-border-width)',
      },
    },
    selectable: {
      borderWidth: 'var(--h-card-selectable-border-width)',
      borderWidthSelected: 'var(--h-card-selectable-border-width-selected)',
      gap: 'var(--h-card-selectable-gap)',
      label: {
        gap: 'var(--h-card-selectable-label-gap)',
      },
    },
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
  cardAccordion: {
    buttonGroup: {
      gap: 'var(--h-card-accordion-button-group-gap)',
    },
    gap: 'var(--h-card-accordion-gap)',
    item: {
      gap: 'var(--h-card-accordion-item-gap)',
    },
  },
  cardAction: {
    content: {
      gap: 'var(--h-card-action-content-gap)',
      paddingHorizontal: 'var(--h-card-action-content-padding-horizontal)',
      paddingVertical: 'var(--h-card-action-content-padding-vertical)',
    },
  },
  cardContent: {
    banner: {
      illustration: {
        lg: {
          width: 'var(--h-card-content-banner-illustration-lg-width)',
        },
        md: {
          width: 'var(--h-card-content-banner-illustration-md-width)',
        },
        sm: {
          width: 'var(--h-card-content-banner-illustration-sm-width)',
        },
        xl: {
          width: 'var(--h-card-content-banner-illustration-xl-width)',
        },
        xs: {
          width: 'var(--h-card-content-banner-illustration-xs-width)',
        },
      },
    },
  },
  carouselControl: {
    gap: 'var(--h-carousel-control-gap)',
    item: {
      borderWidth: 'var(--h-carousel-control-item-border-width)',
    },
    size: 'var(--h-carousel-control-size)',
  },
  checkbox: {
    borderRadius: 'var(--h-checkbox-border-radius)',
    borderWidth: 'var(--h-checkbox-border-width)',
    checked: {
      backgroundColor: 'var(--h-checkbox-checked-background-color)',
      icon: {
        color: 'var(--h-checkbox-checked-icon-color)',
      },
    },
    gap: 'var(--h-checkbox-gap)',
    group: {
      gap: 'var(--h-checkbox-group-gap)',
      stack: {
        gap: 'var(--h-checkbox-group-stack-gap)',
      },
    },
    outlineColorActive: 'var(--h-checkbox-outline-color-active)',
    outlineColorHover: 'var(--h-checkbox-outline-color-hover)',
    outlineWidth: 'var(--h-checkbox-outline-width)',
    tile: {
      borderRadius: 'var(--h-checkbox-tile-border-radius)',
      borderWidth: 'var(--h-checkbox-tile-border-width)',
      borderWidthSelected: 'var(--h-checkbox-tile-border-width-selected)',
      gap: 'var(--h-checkbox-tile-gap)',
      group: {
        gap: 'var(--h-checkbox-tile-group-gap)',
        heading: {
          gap: 'var(--h-checkbox-tile-group-heading-gap)',
        },
        stack: {
          gap: 'var(--h-checkbox-tile-group-stack-gap)',
        },
      },
      maxWidth: 'var(--h-checkbox-tile-max-width)',
      minWidth: 'var(--h-checkbox-tile-min-width)',
      padding: 'var(--h-checkbox-tile-padding)',
    },
  },
  datePicker: {
    borderRadius: 'var(--h-date-picker-border-radius)',
    borderWidth: 'var(--h-date-picker-border-width)',
    borderWidthFocused: 'var(--h-date-picker-border-width-focused)',
    calendar: {
      borderRadius: 'var(--h-date-picker-calendar-border-radius)',
      borderWidth: 'var(--h-date-picker-calendar-border-width)',
      columnGap: 'var(--h-date-picker-calendar-column-gap)',
      footer: {
        gap: 'var(--h-date-picker-calendar-footer-gap)',
      },
      gap: 'var(--h-date-picker-calendar-gap)',
      header: {
        controlGap: 'var(--h-date-picker-calendar-header-control-gap)',
        dateGap: 'var(--h-date-picker-calendar-header-date-gap)',
      },
      item: {
        borderRadius: 'var(--h-date-picker-calendar-item-border-radius)',
        minWidth: 'var(--h-date-picker-calendar-item-min-width)',
        rangeBackground: 'var(--h-date-picker-calendar-item-range-background)',
        roundelBackgroundColorInverted:
          'var(--h-date-picker-calendar-item-roundel-background-color-inverted)',
        roundelHeight: 'var(--h-date-picker-calendar-item-roundel-height)',
        roundelWidth: 'var(--h-date-picker-calendar-item-roundel-width)',
      },
      maxWidth: 'var(--h-date-picker-calendar-max-width)',
      minWidth: 'var(--h-date-picker-calendar-min-width)',
      padding: 'var(--h-date-picker-calendar-padding)',
      rowGap: 'var(--h-date-picker-calendar-row-gap)',
    },
    gap: 'var(--h-date-picker-gap)',
    gapContainer: 'var(--h-date-picker-gap-container)',
    header: {
      controlGap: 'var(--h-date-picker-header-control-gap)',
    },
    height: 'var(--h-date-picker-height)',
    maxWidth: 'var(--h-date-picker-max-width)',
    minWidth: 'var(--h-date-picker-min-width)',
    paddingHorizontal: 'var(--h-date-picker-padding-horizontal)',
    paddingVertical: 'var(--h-date-picker-padding-vertical)',
  },
  descriptionList: {
    gap: 'var(--h-description-list-gap)',
    item: {
      column: {
        gap: 'var(--h-description-list-item-column-gap)',
      },
      gap: 'var(--h-description-list-item-gap)',
      row: {
        gap: 'var(--h-description-list-item-row-gap)',
        headingWidth: 'var(--h-description-list-item-row-heading-width)',
      },
    },
    stack: {
      gap: 'var(--h-description-list-stack-gap)',
    },
  },
  divider: {
    color: 'var(--h-divider-color)',
    size: 'var(--h-divider-size)',
  },
  drawer: {
    footer: {
      horizontal: {
        gap: 'var(--h-drawer-footer-horizontal-gap)',
      },
      padding: 'var(--h-drawer-footer-padding)',
      vertical: {
        gap: 'var(--h-drawer-footer-vertical-gap)',
      },
    },
    gap: 'var(--h-drawer-gap)',
    heading: {
      gap: 'var(--h-drawer-heading-gap)',
    },
    width: 'var(--h-drawer-width)',
  },
  expandableCard: {
    gapHorizontal: 'var(--h-expandable-card-gap-horizontal)',
    gapVertical: 'var(--h-expandable-card-gap-vertical)',
    group: {
      gap: 'var(--h-expandable-card-group-gap)',
    },
  },
  formField: {
    gap: 'var(--h-form-field-gap)',
    helper: {
      gap: 'var(--h-form-field-helper-gap)',
    },
  },
  iconButton: {
    borderRadius: 'var(--h-icon-button-border-radius)',
    md: {
      height: 'var(--h-icon-button-md-height)',
      paddingHorizontal: 'var(--h-icon-button-md-padding-horizontal)',
      paddingVertical: 'var(--h-icon-button-md-padding-vertical)',
      width: 'var(--h-icon-button-md-width)',
    },
    sm: {
      height: 'var(--h-icon-button-sm-height)',
      paddingHorizontal: 'var(--h-icon-button-sm-padding-horizontal)',
      paddingVertical: 'var(--h-icon-button-sm-padding-vertical)',
      width: 'var(--h-icon-button-sm-width)',
    },
    unstyled: {
      foregroundColor: 'var(--h-icon-button-unstyled-foreground-color)',
      foregroundColorActive: 'var(--h-icon-button-unstyled-foreground-color-active)',
      foregroundColorHover: 'var(--h-icon-button-unstyled-foreground-color-hover)',
      inverted: {
        foregroundColor: 'var(--h-icon-button-unstyled-inverted-foreground-color)',
        foregroundColorActive: 'var(--h-icon-button-unstyled-inverted-foreground-color-active)',
        foregroundColorHover: 'var(--h-icon-button-unstyled-inverted-foreground-color-hover)',
      },
      md: {
        height: 'var(--h-icon-button-unstyled-md-height)',
        width: 'var(--h-icon-button-unstyled-md-width)',
      },
      paddingHorizontal: 'var(--h-icon-button-unstyled-padding-horizontal)',
      paddingVertical: 'var(--h-icon-button-unstyled-padding-vertical)',
      sm: {
        height: 'var(--h-icon-button-unstyled-sm-height)',
        width: 'var(--h-icon-button-unstyled-sm-width)',
      },
    },
  },
  iconContainer: {
    lg: {
      borderRadiusNone: 'var(--h-icon-container-lg-border-radius-none)',
      borderRadiusRounded: 'var(--h-icon-container-lg-border-radius-rounded)',
      height: 'var(--h-icon-container-lg-height)',
      padding: 'var(--h-icon-container-lg-padding)',
      width: 'var(--h-icon-container-lg-width)',
    },
    md: {
      borderRadiusRounded: 'var(--h-icon-container-md-border-radius-rounded)',
      height: 'var(--h-icon-container-md-height)',
      padding: 'var(--h-icon-container-md-padding)',
      width: 'var(--h-icon-container-md-width)',
    },
    sm: {
      borderRadiusRounded: 'var(--h-icon-container-sm-border-radius-rounded)',
      height: 'var(--h-icon-container-sm-height)',
      padding: 'var(--h-icon-container-sm-padding)',
      width: 'var(--h-icon-container-sm-width)',
    },
  },
  illustrations: {
    colorMode: 'var(--h-illustrations-color-mode)',
  },
  inlineLink: {
    color: 'var(--h-inline-link-color)',
    colorVisited: 'var(--h-inline-link-color-visited)',
    inverted: {
      color: 'var(--h-inline-link-inverted-color)',
      colorActive: 'var(--h-inline-link-inverted-color-active)',
      colorHover: 'var(--h-inline-link-inverted-color-hover)',
      colorVisited: 'var(--h-inline-link-inverted-color-visited)',
    },
  },
  input: {
    borderRadius: 'var(--h-input-border-radius)',
    borderWidth: 'var(--h-input-border-width)',
    borderWidthFocused: 'var(--h-input-border-width-focused)',
    currency: {
      gap: 'var(--h-input-currency-gap)',
      height: 'var(--h-input-currency-height)',
    },
    date: {
      gap: 'var(--h-input-date-gap)',
    },
    gap: 'var(--h-input-gap)',
    heading: {
      gap: 'var(--h-input-heading-gap)',
      text: {
        gap: 'var(--h-input-heading-text-gap)',
      },
    },
    height: 'var(--h-input-height)',
    label: {
      gap: 'var(--h-input-label-gap)',
    },
    maxWidth: 'var(--h-input-max-width)',
    minWidth: 'var(--h-input-min-width)',
    paddingHorizontal: 'var(--h-input-padding-horizontal)',
    paddingVertical: 'var(--h-input-padding-vertical)',
    stepper: {
      gap: 'var(--h-input-stepper-gap)',
    },
    textArea: {
      height: 'var(--h-input-text-area-height)',
    },
    validation: {
      gap: 'var(--h-input-validation-gap)',
    },
    verification: {
      gap: 'var(--h-input-verification-gap)',
    },
  },
  link: {
    color: 'var(--h-link-color)',
    colorActive: 'var(--h-link-color-active)',
    colorHover: 'var(--h-link-color-hover)',
    gap: 'var(--h-link-gap)',
    inverted: {
      color: 'var(--h-link-inverted-color)',
      colorActive: 'var(--h-link-inverted-color-active)',
      colorHover: 'var(--h-link-inverted-color-hover)',
    },
  },
  list: {
    container: {
      emphasisWarmWhite: {
        borderRadius: 'var(--h-list-container-emphasis-warm-white-border-radius)',
      },
      emphasisWhite: {
        borderRadius: 'var(--h-list-container-emphasis-white-border-radius)',
      },
      none: {
        borderRadius: 'var(--h-list-container-none-border-radius)',
        item: {
          paddingHorizontal: 'var(--h-list-container-none-item-padding-horizontal)',
        },
      },
      subtleWarmWhite: {
        borderRadius: 'var(--h-list-container-subtle-warm-white-border-radius)',
      },
      subtleWhite: {
        borderRadius: 'var(--h-list-container-subtle-white-border-radius)',
      },
    },
    gap: 'var(--h-list-gap)',
    indicator: {
      padding: 'var(--h-list-indicator-padding)',
    },
    item: {
      contentGap: 'var(--h-list-item-content-gap)',
      functional: {
        borderWidth: 'var(--h-list-item-functional-border-width)',
        padding: 'var(--h-list-item-functional-padding)',
        paddingNone: 'var(--h-list-item-functional-padding-none)',
      },
      gap: 'var(--h-list-item-gap)',
      stylised: {
        borderWidth: 'var(--h-list-item-stylised-border-width)',
        height: 'var(--h-list-item-stylised-height)',
        paddingLeft: 'var(--h-list-item-stylised-padding-left)',
        paddingRight: 'var(--h-list-item-stylised-padding-right)',
      },
    },
  },
  menu: {
    borderWidth: 'var(--h-menu-border-width)',
    gap: 'var(--h-menu-gap)',
    item: {
      borderRadius: 'var(--h-menu-item-border-radius)',
      gap: 'var(--h-menu-item-gap)',
      padding: {
        desktop: 'var(--h-menu-item-padding-desktop)',
        mobile: 'var(--h-menu-item-padding-mobile)',
        tablet: 'var(--h-menu-item-padding-tablet)',
      },
    },
    list: {
      gap: 'var(--h-menu-list-gap)',
    },
    maxWidth: 'var(--h-menu-max-width)',
    minWidth: 'var(--h-menu-min-width)',
    padding: 'var(--h-menu-padding)',
  },
  modal: {
    action: {
      gap: 'var(--h-modal-action-gap)',
    },
    borderRadius: 'var(--h-modal-border-radius)',
    content: {
      gap: 'var(--h-modal-content-gap)',
      mobile: {
        paddingBottom: 'var(--h-modal-content-mobile-padding-bottom)',
      },
    },
    gap: 'var(--h-modal-gap)',
    handle: {
      paddingBottom: 'var(--h-modal-handle-padding-bottom)',
    },
    heading: {
      gap: 'var(--h-modal-heading-gap)',
    },
    illustration: {
      padding: 'var(--h-modal-illustration-padding)',
    },
    padding: 'var(--h-modal-padding)',
    width: {
      desktop: 'var(--h-modal-width-desktop)',
      mobile: 'var(--h-modal-width-mobile)',
      tablet: 'var(--h-modal-width-tablet)',
    },
  },
  navigation: {
    bar: {
      borderRadiusNone: 'var(--h-navigation-bar-border-radius-none)',
      borderRadiusRounded: 'var(--h-navigation-bar-border-radius-rounded)',
    },
    borderBottom: 'var(--h-navigation-border-bottom)',
    borderRadius: 'var(--h-navigation-border-radius)',
    desktop: {
      customer: {
        gap: 'var(--h-navigation-desktop-customer-gap)',
      },
      height: 'var(--h-navigation-desktop-height)',
      partner: {
        gap: 'var(--h-navigation-desktop-partner-gap)',
        header: {
          gap: 'var(--h-navigation-desktop-partner-header-gap)',
        },
        padding: 'var(--h-navigation-desktop-partner-padding)',
      },
    },
    dividerBorderColor: 'var(--h-navigation-divider-border-color)',
    item: {
      customer: {
        container: {
          gap: 'var(--h-navigation-item-customer-container-gap)',
          paddingHorizontal: 'var(--h-navigation-item-customer-container-padding-horizontal)',
          paddingVertical: 'var(--h-navigation-item-customer-container-padding-vertical)',
        },
        mobile: {
          container: {
            paddingHorizontal:
              'var(--h-navigation-item-customer-mobile-container-padding-horizontal)',
            paddingVertical: 'var(--h-navigation-item-customer-mobile-container-padding-vertical)',
          },
          paddingHorizontal: 'var(--h-navigation-item-customer-mobile-padding-horizontal)',
          paddingVertical: 'var(--h-navigation-item-customer-mobile-padding-vertical)',
        },
        paddingHorizontal: 'var(--h-navigation-item-customer-padding-horizontal)',
        paddingVertical: 'var(--h-navigation-item-customer-padding-vertical)',
      },
      partner: {
        container: {
          gap: 'var(--h-navigation-item-partner-container-gap)',
          padding: 'var(--h-navigation-item-partner-container-padding)',
        },
        paddingHorizontal: 'var(--h-navigation-item-partner-padding-horizontal)',
        sub: {
          paddingLeft: 'var(--h-navigation-item-partner-sub-padding-left)',
          paddingRight: 'var(--h-navigation-item-partner-sub-padding-right)',
        },
      },
    },
    mobile: {
      gap: 'var(--h-navigation-mobile-gap)',
      height: 'var(--h-navigation-mobile-height)',
      padding: 'var(--h-navigation-mobile-padding)',
    },
  },
  overlay: {
    backgroundColor: 'var(--h-overlay-background-color)',
    opacity: 'var(--h-overlay-opacity)',
  },
  pagination: {
    gap: 'var(--h-pagination-gap)',
    item: {
      gap: 'var(--h-pagination-item-gap)',
      height: 'var(--h-pagination-item-height)',
      radius: 'var(--h-pagination-item-radius)',
      width: 'var(--h-pagination-item-width)',
    },
  },
  parts: {
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
    roundel: {
      borderRadius: 'var(--h-parts-roundel-border-radius)',
      pending: {
        borderWidth: 'var(--h-parts-roundel-pending-border-width)',
      },
    },
    scrollBar: {
      backgroundColor: 'var(--h-parts-scroll-bar-background-color)',
      borderRadius: 'var(--h-parts-scroll-bar-border-radius)',
    },
    statusBar: {
      foregroundColor: 'var(--h-parts-status-bar-foreground-color)',
      foregroundColorInverted: 'var(--h-parts-status-bar-foreground-color-inverted)',
      notch: 'var(--h-parts-status-bar-notch)',
    },
  },
  pill: {
    borderRadius: 'var(--h-pill-border-radius)',
    borderWidth: 'var(--h-pill-border-width)',
    gap: 'var(--h-pill-gap)',
    group: {
      gap: 'var(--h-pill-group-gap)',
    },
    height: 'var(--h-pill-height)',
    minWidth: 'var(--h-pill-min-width)',
    paddingHorizontal: 'var(--h-pill-padding-horizontal)',
    paddingVertical: 'var(--h-pill-padding-vertical)',
  },
  progressBar: {
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
  },
  progressStepper: {
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
  },
  radio: {
    borderRadius: 'var(--h-radio-border-radius)',
    borderWidth: 'var(--h-radio-border-width)',
    checked: {
      color: 'var(--h-radio-checked-color)',
    },
    gap: 'var(--h-radio-gap)',
    group: {
      gap: 'var(--h-radio-group-gap)',
      stack: {
        gap: 'var(--h-radio-group-stack-gap)',
      },
    },
    outlineColorActive: 'var(--h-radio-outline-color-active)',
    outlineColorHover: 'var(--h-radio-outline-color-hover)',
    outlineWidth: 'var(--h-radio-outline-width)',
    tile: {
      borderRadius: 'var(--h-radio-tile-border-radius)',
      borderWidth: 'var(--h-radio-tile-border-width)',
      borderWidthSelected: 'var(--h-radio-tile-border-width-selected)',
      gap: 'var(--h-radio-tile-gap)',
      group: {
        gap: 'var(--h-radio-tile-group-gap)',
        heading: {
          gap: 'var(--h-radio-tile-group-heading-gap)',
        },
        stack: {
          gap: 'var(--h-radio-tile-group-stack-gap)',
        },
      },
      maxWidth: 'var(--h-radio-tile-max-width)',
      minWidth: 'var(--h-radio-tile-min-width)',
      padding: 'var(--h-radio-tile-padding)',
    },
  },
  rating: {
    borderWidth: 'var(--h-rating-border-width)',
    gap: 'var(--h-rating-gap)',
  },
  sectionHeader: {
    gap: 'var(--h-section-header-gap)',
    textContent: {
      gap: 'var(--h-section-header-text-content-gap)',
    },
  },
  segmentedControl: {
    borderRadius: 'var(--h-segmented-control-border-radius)',
    gap: 'var(--h-segmented-control-gap)',
    group: {
      borderRadius: 'var(--h-segmented-control-group-border-radius)',
      borderWidth: 'var(--h-segmented-control-group-border-width)',
      gap: 'var(--h-segmented-control-group-gap)',
      height: 'var(--h-segmented-control-group-height)',
      padding: 'var(--h-segmented-control-group-padding)',
    },
    height: 'var(--h-segmented-control-height)',
    minWidth: 'var(--h-segmented-control-min-width)',
    paddingHorizontal: 'var(--h-segmented-control-padding-horizontal)',
    paddingVertical: 'var(--h-segmented-control-padding-vertical)',
  },
  select: {
    borderRadius: 'var(--h-select-border-radius)',
    borderWidth: 'var(--h-select-border-width)',
    borderWidthFocused: 'var(--h-select-border-width-focused)',
    dropdown: {
      borderWidth: 'var(--h-select-dropdown-border-width)',
      gap: 'var(--h-select-dropdown-gap)',
      gapContent: 'var(--h-select-dropdown-gap-content)',
      item: {
        borderRadius: 'var(--h-select-dropdown-item-border-radius)',
        gap: 'var(--h-select-dropdown-item-gap)',
        padding: 'var(--h-select-dropdown-item-padding)',
      },
      padding: 'var(--h-select-dropdown-padding)',
    },
    gap: 'var(--h-select-gap)',
    gapContainer: 'var(--h-select-gap-container)',
    height: 'var(--h-select-height)',
    maxWidth: 'var(--h-select-max-width)',
    minWidth: 'var(--h-select-min-width)',
    paddingHorizontal: 'var(--h-select-padding-horizontal)',
    paddingVertical: 'var(--h-select-padding-vertical)',
    validation: {
      gap: 'var(--h-select-validation-gap)',
    },
    item: {
      padding: {
        desktop: 'var(--h-select-item-padding-desktop)',
        mobile: 'var(--h-select-item-padding-mobile)',
        tablet: 'var(--h-select-item-padding-tablet)',
      },
    },
  },
  skeleton: {
    loadingColor: 'var(--h-skeleton-loading-color)',
  },
  spinner: {
    defaultFill: 'var(--h-spinner-default-fill)',
    lg: {
      size: 'var(--h-spinner-lg-size)',
      strokeWidth: 'var(--h-spinner-lg-stroke-width)',
    },
    md: {
      size: 'var(--h-spinner-md-size)',
      strokeWidth: 'var(--h-spinner-md-stroke-width)',
    },
    padding: 'var(--h-spinner-padding)',
    sm: {
      size: 'var(--h-spinner-sm-size)',
      strokeWidth: 'var(--h-spinner-sm-stroke-width)',
    },
    xs: {
      size: 'var(--h-spinner-xs-size)',
      strokeWidth: 'var(--h-spinner-xs-stroke-width)',
    },
  },
  switch: {
    md: {
      circle: {
        size: 'var(--h-switch-md-circle-size)',
      },
      height: 'var(--h-switch-md-height)',
      width: 'var(--h-switch-md-width)',
    },
    padding: 'var(--h-switch-padding)',
    radius: 'var(--h-switch-radius)',
    sm: {
      circle: {
        size: 'var(--h-switch-sm-circle-size)',
      },
      height: 'var(--h-switch-sm-height)',
      width: 'var(--h-switch-sm-width)',
    },
    unchecked: {
      backgroundColorHover: 'var(--h-switch-unchecked-background-color-hover)',
    },
  },
  table: {
    borderRadius: 'var(--h-table-border-radius)',
    cell: {
      borderWidth: 'var(--h-table-cell-border-width)',
      minHeight: 'var(--h-table-cell-min-height)',
      padding: 'var(--h-table-cell-padding)',
    },
    emphasis: {
      borderWidth: 'var(--h-table-emphasis-border-width)',
    },
    headerCell: {
      borderWidth: 'var(--h-table-header-cell-border-width)',
      foregoundColor: 'var(--h-table-header-cell-foregound-color)',
      foregoundColorInverted: 'var(--h-table-header-cell-foregound-color-inverted)',
      gap: 'var(--h-table-header-cell-gap)',
      height: 'var(--h-table-header-cell-height)',
      paddingHorizontal: 'var(--h-table-header-cell-padding-horizontal)',
      paddingVertical: 'var(--h-table-header-cell-padding-vertical)',
    },
    subtle: {
      borderWidth: 'var(--h-table-subtle-border-width)',
    },
  },
  tabs: {
    divider: {
      borderWidth: 'var(--h-tabs-divider-border-width)',
    },
    gap: 'var(--h-tabs-gap)',
    item: {
      gap: 'var(--h-tabs-item-gap)',
      paddingHorizontal: 'var(--h-tabs-item-padding-horizontal)',
      paddingVertical: 'var(--h-tabs-item-padding-vertical)',
      selected: {
        borderBottomRadius: 'var(--h-tabs-item-selected-border-bottom-radius)',
        borderTopRadius: 'var(--h-tabs-item-selected-border-top-radius)',
      },
    },
    lg: {
      height: 'var(--h-tabs-lg-height)',
    },
    md: {
      height: 'var(--h-tabs-md-height)',
    },
  },
  timePicker: {
    fade: 'var(--h-time-picker-fade)',
    gap: 'var(--h-time-picker-gap)',
    gapContainer: 'var(--h-time-picker-gap-container)',
    minWidth: 'var(--h-time-picker-min-width)',
    paddingHorizontal: 'var(--h-time-picker-padding-horizontal)',
    paddingVertical: 'var(--h-time-picker-padding-vertical)',
    time: {
      columnGap: 'var(--h-time-picker-time-column-gap)',
      content: {
        gap: 'var(--h-time-picker-time-content-gap)',
        item: {
          gap: 'var(--h-time-picker-time-content-item-gap)',
        },
      },
      footer: {
        gap: 'var(--h-time-picker-time-footer-gap)',
      },
      gap: 'var(--h-time-picker-time-gap)',
      item: {
        height: 'var(--h-time-picker-time-item-height)',
        width: 'var(--h-time-picker-time-item-width)',
      },
      rowGap: 'var(--h-time-picker-time-row-gap)',
    },
  },
  timeline: {
    bar: {
      width: 'var(--h-timeline-bar-width)',
    },
    content: {
      gap: 'var(--h-timeline-content-gap)',
      paddingBottom: 'var(--h-timeline-content-padding-bottom)',
      paddingTop: 'var(--h-timeline-content-padding-top)',
    },
    gap: 'var(--h-timeline-gap)',
    progress: {
      circle: {
        height: 'var(--h-timeline-progress-circle-height)',
        width: 'var(--h-timeline-progress-circle-width)',
      },
    },
    static: {
      circle: {
        height: 'var(--h-timeline-static-circle-height)',
        width: 'var(--h-timeline-static-circle-width)',
      },
    },
  },
  toast: {
    backgroundColor: 'var(--h-toast-background-color)',
    borderRadius: 'var(--h-toast-border-radius)',
    bottomPosition: 'var(--h-toast-bottom-position)',
    gap: 'var(--h-toast-gap)',
    padding: 'var(--h-toast-padding)',
    stack: {
      gap: 'var(--h-toast-stack-gap)',
    },
    text: {
      gap: 'var(--h-toast-text-gap)',
    },
  },
  toggleButton: {
    borderRadius: 'var(--h-toggle-button-border-radius)',
    borderWidth: 'var(--h-toggle-button-border-width)',
    gap: 'var(--h-toggle-button-gap)',
    height: 'var(--h-toggle-button-height)',
    minWidth: 'var(--h-toggle-button-min-width)',
    paddingHorizontal: 'var(--h-toggle-button-padding-horizontal)',
    paddingVertical: 'var(--h-toggle-button-padding-vertical)',
  },
  tooltip: {
    backgroundColor: 'var(--h-tooltip-background-color)',
    borderRadius: 'var(--h-tooltip-border-radius)',
    gapHorizontal: 'var(--h-tooltip-gap-horizontal)',
    gapVertical: 'var(--h-tooltip-gap-vertical)',
    maxWidth: 'var(--h-tooltip-max-width)',
    paddingHorizontal: 'var(--h-tooltip-padding-horizontal)',
    paddingVertical: 'var(--h-tooltip-padding-vertical)',
  },
  container: {
    marginHorizontal: {
      desktop: 'var(--h-container-margin-horizontal-desktop)',
      mobile: 'var(--h-container-margin-horizontal-mobile)',
      tablet: 'var(--h-container-margin-horizontal-tablet)',
    },
    paddingBottom: {
      desktop: 'var(--h-container-padding-bottom-desktop)',
      mobile: 'var(--h-container-padding-bottom-mobile)',
      tablet: 'var(--h-container-padding-bottom-tablet)',
    },
    paddingTop: {
      desktop: 'var(--h-container-padding-top-desktop)',
      mobile: 'var(--h-container-padding-top-mobile)',
      tablet: 'var(--h-container-padding-top-tablet)',
    },
    width: {
      desktop: 'var(--h-container-width-desktop)',
      mobile: 'var(--h-container-width-mobile)',
      tablet: 'var(--h-container-width-tablet)',
    },
  },
  heading: {
    '2xl': {
      fontSize: {
        desktop: 'var(--h-heading-2xl-font-size-desktop)',
        mobile: 'var(--h-heading-2xl-font-size-mobile)',
        tablet: 'var(--h-heading-2xl-font-size-tablet)',
      },
      lineHeight: {
        desktop: 'var(--h-heading-2xl-line-height-desktop)',
        mobile: 'var(--h-heading-2xl-line-height-mobile)',
        tablet: 'var(--h-heading-2xl-line-height-tablet)',
      },
      fontWeight: 'var(--h-heading-2xl-font-weight)',
    },
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
  listSpacing: {
    desktop: 'var(--h-list-spacing-desktop)',
    mobile: 'var(--h-list-spacing-mobile)',
    tablet: 'var(--h-list-spacing-tablet)',
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
    xl: {
      fontSize: 'var(--h-body-text-xl-font-size)',
      lineHeight: 'var(--h-body-text-xl-line-height)',
      paragraphSpacing: 'var(--h-body-text-xl-paragraph-spacing)',
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

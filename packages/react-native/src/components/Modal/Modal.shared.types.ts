import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { ButtonWithoutChildrenProps } from '../Button/Button.props';
import { UnstyledIconButtonProps } from '../UnstyledIconButton';

export interface ModalCommonBaseProps {
  /** Applied to the modal content container, useful for locating the modal in e2e tests. */
  testID?: string;
  /** Whether to show a loading state with a spinner.
   * @default false */
  loading?: boolean;
  /** Image to display in the modal, shown as centered content with text below. */
  image?: ReactNode;
  /** Whether to show the close button in the top-right corner.
   * @default true */
  showCloseButton?: boolean;
  /** The heading text displayed at the top of the modal. */
  heading?: string;
  /** The heading text shown while `loading` is true, instead of the regular heading.
   * @default 'Loading...' */
  loadingHeading?: string;
  /** The description text shown while `loading` is true, instead of the regular description. */
  loadingDescription?: string;
  /** The description content displayed below the heading; pass a string for the default styling, or JSX for custom content. */
  description?: ReactNode;
  /** Whether the footer stays fixed to the bottom of the modal while content scrolls.
   * @default true */
  stickyFooter?: boolean;
  /** Custom content to display in the modal body. */
  children?: ViewProps['children'];
  /** Called when the close button is pressed. */
  onPressCloseButton?: () => void;
  /** Additional props passed to the close button. */
  closeButtonProps?: Omit<UnstyledIconButtonProps, 'children'>;
}

export interface ModalButtonFooterProps {
  /** Called when the primary button is pressed. */
  onPressPrimaryButton?: () => void;
  /** Text for the primary action button. */
  primaryButtonText?: string;
  /** Called when the secondary button is pressed. */
  onPressSecondaryButton?: () => void;
  /** Text for the secondary action button. */
  secondaryButtonText?: string;
  /** Additional props passed to the primary button; `colorScheme` defaults to `highlight`, `variant` to `solid`. */
  primaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  /** Additional props passed to the secondary button; `colorScheme` defaults to `functional`, `variant` to `outline`. */
  secondaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  /** Not applicable when using the built-in primary/secondary action buttons. */
  footer?: never;
  /** Styles applied to the footer container, useful for sticky footer shadows or custom spacing. */
  footerStyle?: StyleProp<ViewStyle>;
}

export interface ModalCustomFooterProps {
  /** Custom footer content that replaces the built-in action buttons. */
  footer: ReactNode;
  /** Styles applied to the footer container, useful for sticky footer shadows or custom spacing. */
  footerStyle?: StyleProp<ViewStyle>;
  /** Not applicable when a custom `footer` is provided. */
  onPressPrimaryButton?: never;
  /** Not applicable when a custom `footer` is provided. */
  primaryButtonText?: never;
  /** Not applicable when a custom `footer` is provided. */
  onPressSecondaryButton?: never;
  /** Not applicable when a custom `footer` is provided. */
  secondaryButtonText?: never;
  /** Not applicable when a custom `footer` is provided. */
  primaryButtonProps?: never;
  /** Not applicable when a custom `footer` is provided. */
  secondaryButtonProps?: never;
}

export type ModalCommonProps = ModalCommonBaseProps &
  (ModalButtonFooterProps | ModalCustomFooterProps);

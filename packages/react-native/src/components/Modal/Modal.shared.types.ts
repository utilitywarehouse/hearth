import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { ButtonWithoutChildrenProps } from '../Button/Button.props';
import { UnstyledIconButtonProps } from '../UnstyledIconButton';

export interface ModalCommonBaseProps {
  testID?: string;
  loading?: boolean;
  image?: ReactNode;
  showCloseButton?: boolean;
  heading?: string;
  loadingHeading?: string;
  loadingDescription?: string;
  description?: string;
  stickyFooter?: boolean;
  children?: ViewProps['children'];
  onPressCloseButton?: () => void;
  closeButtonProps?: Omit<UnstyledIconButtonProps, 'children'>;
}

export interface ModalButtonFooterProps {
  onPressPrimaryButton?: () => void;
  primaryButtonText?: string;
  onPressSecondaryButton?: () => void;
  secondaryButtonText?: string;
  primaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  secondaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  footer?: never;
  footerStyle?: StyleProp<ViewStyle>;
}

export interface ModalCustomFooterProps {
  footer: ReactNode;
  footerStyle?: StyleProp<ViewStyle>;
  onPressPrimaryButton?: never;
  primaryButtonText?: never;
  onPressSecondaryButton?: never;
  secondaryButtonText?: never;
  primaryButtonProps?: never;
  secondaryButtonProps?: never;
}

export type ModalCommonProps = ModalCommonBaseProps &
  (ModalButtonFooterProps | ModalCustomFooterProps);

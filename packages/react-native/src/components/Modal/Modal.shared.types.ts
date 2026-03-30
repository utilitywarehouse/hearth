import { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { ButtonWithoutChildrenProps } from '../Button/Button.props';
import { UnstyledIconButtonProps } from '../UnstyledIconButton';

export interface ModalCommonProps {
  loading?: boolean;
  image?: ReactNode;
  showCloseButton?: boolean;
  heading?: string;
  loadingHeading?: string;
  description?: string;
  stickyFooter?: boolean;
  children?: ViewProps['children'];
  onPressPrimaryButton?: () => void;
  primaryButtonText?: string;
  onPressSecondaryButton?: () => void;
  secondaryButtonText?: string;
  onPressCloseButton?: () => void;
  primaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  secondaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  closeButtonProps?: Omit<UnstyledIconButtonProps, 'children'>;
}

import { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { BottomSheetProps } from '../BottomSheet';
import { ButtonWithoutChildrenProps } from '../Button/Button.props';
import { UnstyledIconButtonProps } from '../UnstyledIconButton';

interface ModalPropsBase extends Omit<BottomSheetProps, 'children'> {
  loading?: boolean;
  image?: ReactNode;
  showCloseButton?: boolean;
  heading?: string;
  loadingHeading?: string;
  description?: string;
  fullscreen?: boolean;
  children?: ViewProps['children'];
  onPressPrimaryButton?: () => void;
  primaryButtonText?: string;
  onPressSecondaryButton?: () => void;
  closeOnPrimaryButtonPress?: boolean;
  secondaryButtonText?: string;
  onPressCloseButton?: () => void;
  closeOnSecondaryButtonPress?: boolean;
  primaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  secondaryButtonProps?: Omit<ButtonWithoutChildrenProps, 'children'>;
  closeButtonProps?: Omit<UnstyledIconButtonProps, 'children'>;
}

type ModalProps =
  | (ModalPropsBase & {
      inNavModal?: false | undefined;
      stickyFooter?: boolean;
      background?: never;
    })
  | (ModalPropsBase & {
      inNavModal: true;
      stickyFooter?: never;
      background?: 'default' | 'brand';
    });

export default ModalProps;

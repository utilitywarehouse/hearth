import { ImageProps, ViewProps } from 'react-native';
import { BottomSheetProps } from '../BottomSheet';
import { ButtonWithoutChildrenProps } from '../Button/Button.props';
import { UnstyledIconButtonProps } from '../UnstyledIconButton';

interface ModalProps extends Omit<BottomSheetProps, 'children'> {
  loading?: boolean;
  image?: ImageProps;
  showCloseButton?: boolean;
  heading?: string;
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

export default ModalProps;

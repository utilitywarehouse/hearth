import { ImageProps, ViewProps } from 'react-native';
import { BottomSheetProps } from '../BottomSheet';

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
}

export default ModalProps;

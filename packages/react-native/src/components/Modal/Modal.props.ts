import { BottomSheetProps } from '../BottomSheet';
import { ModalCommonProps } from './Modal.shared.types';

interface ModalProps extends Omit<BottomSheetProps, 'children'>, ModalCommonProps {
  fullscreen?: boolean;
  closeOnPrimaryButtonPress?: boolean;
  closeOnSecondaryButtonPress?: boolean;
}

export default ModalProps;

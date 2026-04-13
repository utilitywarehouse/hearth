import { BottomSheetProps } from '../BottomSheet';
import {
  ModalButtonFooterProps,
  ModalCommonBaseProps,
  ModalCustomFooterProps,
} from './Modal.shared.types';

type ModalBaseProps = Omit<BottomSheetProps, 'children'> &
  ModalCommonBaseProps & {
    fullscreen?: boolean;
  };

type ModalProps =
  | (ModalBaseProps &
      ModalButtonFooterProps & {
        closeOnPrimaryButtonPress?: boolean;
        closeOnSecondaryButtonPress?: boolean;
      })
  | (ModalBaseProps &
      ModalCustomFooterProps & {
        closeOnPrimaryButtonPress?: never;
        closeOnSecondaryButtonPress?: never;
      });

export default ModalProps;

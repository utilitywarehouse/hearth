import { BottomSheetProps } from '../BottomSheet';
import {
  ModalButtonFooterProps,
  ModalCommonBaseProps,
  ModalCustomFooterProps,
} from './Modal.shared.types';

type ModalBaseProps = Omit<BottomSheetProps, 'children'> &
  ModalCommonBaseProps & {
    /** Whether the modal should take up the full screen height.
     * @default false */
    fullscreen?: boolean;
  };

type ModalProps =
  | (ModalBaseProps &
      ModalButtonFooterProps & {
        /** Whether to automatically close the modal when the primary button is pressed.
         * @default true */
        closeOnPrimaryButtonPress?: boolean;
        /** Whether to automatically close the modal when the secondary button is pressed.
         * @default true */
        closeOnSecondaryButtonPress?: boolean;
      })
  | (ModalBaseProps &
      ModalCustomFooterProps & {
        closeOnPrimaryButtonPress?: never;
        closeOnSecondaryButtonPress?: never;
      });

export default ModalProps;

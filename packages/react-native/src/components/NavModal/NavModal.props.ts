import { Ref } from 'react';
import { ScrollViewProps } from 'react-native';
import {
  ModalButtonFooterProps,
  ModalCommonBaseProps,
  ModalCustomFooterProps,
} from '../Modal/Modal.shared.types';

export interface NavModalRef {
  triggerCloseAnimation?: () => void;
}

type NavModalBaseProps = ModalCommonBaseProps & {
  ref?: Ref<NavModalRef>;
  background?: 'default' | 'brand' | 'primary';
  scrollable?: boolean;
  presentation?:
    | 'fullScreenModal'
    | 'modal'
    | 'transparentModal'
    | 'containedModal'
    | 'containedTransparentModal';
  useSafeAreaInsets?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
};

type NavModalProps =
  | (NavModalBaseProps & ModalButtonFooterProps)
  | (NavModalBaseProps & ModalCustomFooterProps);

export default NavModalProps;

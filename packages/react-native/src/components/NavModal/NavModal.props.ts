import { Ref } from 'react';
import { ScrollViewProps } from 'react-native';
import { ModalCommonProps } from '../Modal/Modal.shared.types';

export interface NavModalRef {
  triggerCloseAnimation?: () => void;
}

interface NavModalProps extends ModalCommonProps {
  ref?: Ref<NavModalRef>;
  background?: 'default' | 'brand';
  scrollable?: boolean;
  presentation?:
    | 'fullScreenModal'
    | 'modal'
    | 'transparentModal'
    | 'containedModal'
    | 'containedTransparentModal';
  useSafeAreaInsets?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
}

export default NavModalProps;

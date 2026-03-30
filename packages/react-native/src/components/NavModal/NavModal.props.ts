import { Ref } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
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
  safeAreaViewProps?: Omit<SafeAreaViewProps, 'children'>;
  scrollViewProps?: Omit<SafeAreaViewProps, 'children'>;
}

export default NavModalProps;

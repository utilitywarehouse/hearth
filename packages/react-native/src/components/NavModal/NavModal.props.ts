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
  /** Ref exposing `triggerCloseAnimation`, used to play the Android close animation before dismissal. */
  ref?: Ref<NavModalRef>;
  /** Switches between the default surface background, the brand background, and the primary background treatment.
   * @default 'default' */
  background?: 'default' | 'brand' | 'primary';
  /** Wraps the content area in a `ScrollView`; set to `false` for custom layouts that should not scroll.
   * @default true */
  scrollable?: boolean;
  /** Matches the React Navigation screen presentation; `fullScreenModal` uses the full-screen layout, the other values use the sheet-style layout.
   * @default 'modal' */
  presentation?:
    | 'fullScreenModal'
    | 'modal'
    | 'transparentModal'
    | 'containedModal'
    | 'containedTransparentModal';
  /** Whether to apply safe area insets as padding within the component.
   * @default true */
  useSafeAreaInsets?: boolean;
  /** Extra props forwarded to the `ScrollView` wrapping the modal content when `scrollable` is true. */
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
};

type NavModalProps =
  | (NavModalBaseProps & ModalButtonFooterProps)
  | (NavModalBaseProps & ModalCustomFooterProps);

export default NavModalProps;

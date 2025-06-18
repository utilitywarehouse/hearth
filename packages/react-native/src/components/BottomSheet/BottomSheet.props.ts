 
import { ReactNode, Ref } from 'react';
import { ViewStyle } from 'react-native';
import {
  BottomSheetProps as GorhomBottomSheetProps,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from '@gorhom/bottom-sheet/lib/typescript/types';

interface BottomSheetProps extends Omit<GorhomBottomSheetProps, 'handleComponent'> {
  /**
   * The content to be displayed within the bottom sheet.
   */
  children: ReactNode;

  /**
   * The backdrop component for the bottom sheet.
   * When true, default backdrop will be used.
   * When false, no backdrop will be displayed.
   * You can also provide a custom backdrop component.
   * @default true
   */
  backdrop?: boolean | React.FC<BottomSheetBackdropProps>;

  /**
   * Style for the bottom sheet container.
   */
  containerStyle?: ViewStyle;

  /**
   * Style for the bottom sheet handle.
   */
  handleStyle?: ViewStyle;

  /**
   * Whether to show the handle component.
   * @default true
   */
  showHandle?: boolean;

  contentStyle?: ViewStyle;

  ref?: Ref<BottomSheetMethods> | Ref<BottomSheetModalMethods<any>>;
}

export default BottomSheetProps;

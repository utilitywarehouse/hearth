import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';

export interface MenuMethods {
  present: () => void;
  dismiss: () => void;
}

export interface MenuProps {
  /**
   * Heading text displayed at the top of the menu
   */
  heading?: string;
  /**
   * Menu items to display
   */
  children: ReactNode;
  /**
   * Optional bottom sheet modal props to customise the menu behavior
   */
  bottomSheetProps?: Partial<BottomSheetModalProps>;
}

export default MenuProps;

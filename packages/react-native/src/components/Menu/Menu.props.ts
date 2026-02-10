import type { ReactNode } from 'react';
import { BottomSheetProps } from '../BottomSheet';

export interface MenuMethods {
  present: () => void;
  dismiss: () => void;
}

export interface MenuProps extends BottomSheetProps {
  /**
   * Heading text displayed at the top of the menu
   */
  heading?: string;
  /**
   * Menu items to display
   */
  children: ReactNode;
}

export default MenuProps;

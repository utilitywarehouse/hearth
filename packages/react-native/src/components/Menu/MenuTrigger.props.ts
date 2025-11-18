import type { ReactElement } from 'react';

export interface MenuTriggerProps {
  /**
   * The child element that triggers the menu (should be a single pressable element like Button)
   */
  children: ReactElement;
}

export default MenuTriggerProps;

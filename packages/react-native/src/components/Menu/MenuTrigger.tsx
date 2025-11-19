import { cloneElement, isValidElement } from 'react';
import type MenuTriggerProps from './MenuTrigger.props';

interface MenuTriggerInternalProps extends MenuTriggerProps {
  onPress: () => void;
}

const MenuTrigger = ({ children, onPress }: MenuTriggerInternalProps) => {
  if (!isValidElement(children)) {
    throw new Error('MenuTrigger: children must be a valid React element');
  }

  return cloneElement(children, {
    onPress,
  } as { onPress?: () => void });
};

MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;

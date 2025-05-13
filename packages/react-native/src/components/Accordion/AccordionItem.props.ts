import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export interface AccordionItemProps extends ViewProps {
  value?: string;
  disabled?: boolean;
  title?: string;
  expanded?: boolean;
  /**
   * Event handler called when the trigger is pressed.
   */
  toggleItem?: () => void;
  children?: JSX.Element | Array<JSX.Element>;
  noPadding?: boolean;
  /**
   * Sets the extra custom content of the accordion item trigger.
   * @default undefined
   */
  triggerContent?: ReactNode;
}

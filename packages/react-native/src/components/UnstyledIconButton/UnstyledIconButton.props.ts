import type { ComponentType } from 'react';
import type { PressableProps } from 'react-native';

export type UnstyledIconButtonProps = {
  /*
   * If `true`, the button will be disabled.
   * @default  false
   */
  disabled?: boolean;
  pressed?: boolean;
  /*
   * The icon to display on the button.
   * @default undefined
   */
  icon: ComponentType;
  /*
   * If `true`, the button will show a spinner.
   * @default  false
   */
  loading?: boolean;
} & Omit<PressableProps, 'children'>;

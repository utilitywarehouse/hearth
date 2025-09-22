import type { ComponentType } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

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
  /*
   * The size of the button.
   * @default  'md'
   */
  size?: 'sm' | 'md';
  /*
   * If `true`, the button colours will be inverted.
   * @default  false
   */
  inverted?: boolean;
  children?: React.ReactNode;
  iconStyle?: ViewProps['style'];
} & PressableProps;

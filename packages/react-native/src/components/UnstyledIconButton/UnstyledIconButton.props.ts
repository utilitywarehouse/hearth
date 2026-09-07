import type { ComponentType } from 'react';
import type { PressableProps, ViewProps } from 'react-native';
import { ColorValue } from '../../types';

export type UnstyledIconButtonProps = {
  /*
   * If `true`, the button will be disabled.
   * @default  false
   */
  disabled?: boolean;
  /** Whether the button is currently pressed. */
  pressed?: boolean;
  /**
   * The icon component displayed on the button.
   */
  icon: ComponentType;
  /**
   * If `true`, the button will show a spinner.
   * @default false
   */
  loading?: boolean;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * If `true`, the button colours will be inverted.
   * @default false
   */
  inverted?: boolean;
  children?: React.ReactNode;
  /** Style applied to the icon. */
  iconStyle?: ViewProps['style'] & { color?: ColorValue };
} & PressableProps;

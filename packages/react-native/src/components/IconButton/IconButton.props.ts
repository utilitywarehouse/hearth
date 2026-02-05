import type { ComponentType } from 'react';
import type { PressableProps } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { ColorValue } from '../../types';
import { ButtonVariants } from '../Button/Button.props';

export type IconButtonProps = {
  /*
   * If `true`, the button will be disabled.
   * @default  false
   */
  disabled?: boolean;
  size?: 'sm' | 'md';
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
  children?: ViewProps['children'];
  /**
   * Custom background color override.
   * ⚠️ Use sparingly and only for specific use cases (e.g., service buttons).
   * @default undefined
   */
  backgroundColor?: ColorValue;
  /**
   * Custom active/pressed background color override.
   * ⚠️ Use sparingly and only for specific use cases (e.g., service buttons).
   * @default undefined
   */
  activeBackgroundColor?: ColorValue;
  /**
   * Custom shadow color override.
   * ⚠️ Use sparingly and only for specific use cases (e.g., service buttons).
   * @default undefined
   */
  shadowColor?: ColorValue;
} & Omit<PressableProps, 'children'> &
  ButtonVariants;

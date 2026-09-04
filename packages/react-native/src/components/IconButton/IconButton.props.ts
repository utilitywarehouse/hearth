import type { ComponentType } from 'react';
import type { PressableProps } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { ColorValue } from '../../types';
import { ButtonVariants } from '../Button/Button.props';

export type IconButtonProps = {
  /**
   * Disables the button.
   * @default false
   */
  disabled?: boolean;
  /** The size of the button. */
  size?: 'sm' | 'md';
  /** Changes the button to a pressed state. */
  pressed?: boolean;
  /** The icon component to display on the button. */
  icon: ComponentType;
  /** Changes the button to a loading state. */
  loading?: boolean;
  /** Content rendered inside the button. */
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

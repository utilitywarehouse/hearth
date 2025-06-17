import { PropsWithChildren } from 'react';
import type { PressableProps } from 'react-native';

export interface ToggleButtonProps extends PressableProps, PropsWithChildren {
  text?: string;
  toggled?: boolean;
  onToggle?: (toggled: boolean) => void;
}

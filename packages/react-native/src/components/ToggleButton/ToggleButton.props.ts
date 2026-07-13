import type { PressableProps } from 'react-native';

export interface ToggleButtonProps extends PressableProps {
  text?: string;
  toggled?: boolean;
  onToggle?: (toggled: boolean) => void;
}

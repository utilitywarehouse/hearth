import type { PressableProps } from 'react-native';

export interface ToggleButtonProps extends PressableProps {
  /** The text label of the button. */
  text?: string;
  /**
   * Whether the button is in the toggled (pressed/selected) state.
   * @default false
   */
  toggled?: boolean;
  /** Called with the new toggled state whenever the button is pressed. */
  onToggle?: (toggled: boolean) => void;
}

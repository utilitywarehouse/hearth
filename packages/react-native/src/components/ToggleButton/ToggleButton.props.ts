import type { ReactNode } from 'react';
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
  /**
   * Identifies the button inside a `ToggleGroup`. Inside a group, the button's toggled state
   * comes from the group's value and `toggled` is ignored. Must be unique within the group.
   */
  value?: string;
  /**
   * Custom content, typically `ToggleButtonIcon` and `ToggleButtonText`. When provided, it
   * replaces the built-in tick icon and `text` label. The parts read `toggled` from the button.
   */
  children?: ReactNode;
}

import type { AccessibilityProps, PressableProps } from 'react-native';

type SwitchSize = 'sm' | 'md';

/**
 * @deprecated Use `'sm' | 'md'` instead. These values will be removed in a
 * future release.
 */
type DeprecatedSwitchSize = 'small' | 'medium';

interface SwitchProps extends PressableProps, AccessibilityProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  /**
   * The size of the switch.
   * @default 'md'
   */
  size?: SwitchSize | DeprecatedSwitchSize;
}

export default SwitchProps;

import { ViewProps, ViewStyle } from 'react-native';
import { space } from '../../tokens';
import { GridProps } from '../Grid';

// Base props shared by both layout modes
type ToggleButtonCardGroupBaseProps = {
  /** The value of the currently selected toggle button card. */
  value?: string;
  /** Called when the selected toggle button card changes. */
  onValueChange?: (value: string) => void;
  /**
   * Called when any child ToggleButtonCard is checked or unchecked.
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
  /**
   * Gap between child elements.
   * @default '200'
   */
  gap?: keyof typeof space;
} & ViewProps;

// Props specific to flexbox layout (when columns is not set)
type ToggleButtonCardGroupFlexProps = {
  columns?: never;
  /**
   * Flex direction.
   * @default 'row'
   */
  flexDirection?: ViewStyle['flexDirection'];
  /** Flex wrap. */
  flexWrap?: ViewStyle['flexWrap'];
  /** Align items. */
  alignItems?: ViewStyle['alignItems'];
  /** Justify content. */
  justifyContent?: ViewStyle['justifyContent'];
};

// Props specific to grid layout (when columns is set)
type ToggleButtonCardGroupGridProps = {
  /** Number of grid columns. When set, the group uses a grid layout instead of flexbox. */
  columns: GridProps['columns'];
  flexDirection?: never;
  flexWrap?: never;
  alignItems?: never;
  justifyContent?: never;
};

// Combine base props with either flex or grid specific props
type ToggleButtonCardGroupProps = ToggleButtonCardGroupBaseProps &
  (ToggleButtonCardGroupFlexProps | ToggleButtonCardGroupGridProps);

export default ToggleButtonCardGroupProps;

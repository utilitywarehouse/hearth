import { ViewProps, ViewStyle } from 'react-native';
import { space } from '../../tokens';
import { GridProps } from '../Grid';

// Base props shared by both layout modes
type ToggleButtonCardGroupBaseProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  /**
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
  gap?: keyof typeof space;
} & ViewProps;

// Props specific to flexbox layout (when columns is not set)
type ToggleButtonCardGroupFlexProps = {
  columns?: never;
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
};

// Props specific to grid layout (when columns is set)
type ToggleButtonCardGroupGridProps = {
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

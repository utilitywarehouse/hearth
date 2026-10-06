import { View, ViewProps, ViewStyle } from 'react-native';
import { space } from '../../tokens';
import { GridProps } from '../Grid';
import { Ref } from 'react';

// Base props shared by both layout modes
type RadioCardGroupBaseProps = {
  /** The value of the currently selected `RadioCard`. */
  value?: string;
  /** Called when the selected `RadioCard` changes. */
  onValueChange?: (value: string) => void;
  /**
   * Called when any child RadioCard is checked or unchecked.
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
  /** The gap between the `RadioCard` items. */
  gap?: keyof typeof space;
  /** If `true`, disables all `RadioCard`s in the group. */
  disabled?: boolean;
  /** Forwarded ref to the underlying view. */
  ref?: Ref<View>;
} & ViewProps;

// Props specific to flexbox layout (when columns is not set)
type RadioCardGroupFlexProps = {
  columns?: never;
  /**
   * (Flexbox only) Sets the direction of the flex items.
   * @default 'row'
   */
  flexDirection?: ViewStyle['flexDirection'];
  /**
   * (Flexbox only) Sets whether flex items are forced onto one line or can wrap.
   * @default 'wrap'
   */
  flexWrap?: ViewStyle['flexWrap'];
  /** (Flexbox only) Sets the alignment of flex items on the cross axis. */
  alignItems?: ViewStyle['alignItems'];
  /** (Flexbox only) Sets the alignment of flex items on the main axis. */
  justifyContent?: ViewStyle['justifyContent'];
};

// Props specific to grid layout (when columns is set)
type RadioCardGroupGridProps = {
  /** If set, uses a grid layout with this many columns instead of flexbox. */
  columns: GridProps['columns'];
  flexDirection?: never;
  flexWrap?: never;
  alignItems?: never;
  justifyContent?: never;
};

// Combine base props with either flex or grid specific props
type RadioCardGroupProps = RadioCardGroupBaseProps &
  (RadioCardGroupFlexProps | RadioCardGroupGridProps);

export default RadioCardGroupProps;

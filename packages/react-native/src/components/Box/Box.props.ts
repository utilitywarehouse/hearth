import React from 'react';
import type { ViewProps } from 'react-native';
import type { AllUtilityProps, SpacingValues } from '../../types';

interface CustomBoxProps {
  // Custom props
  /** The component or element type to render the Box as, in place of `View`. */
  as?: React.ElementType;
  /** Gap between child elements. */
  spacing?: SpacingValues;
}

export interface BoxProps extends AllUtilityProps, ViewProps, CustomBoxProps {}

export default BoxProps;

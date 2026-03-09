import React from 'react';
import type { ViewProps } from 'react-native';
import type { AllUtilityProps, SpacingValues } from '../../types';

interface CustomBoxProps {
  // Custom props
  as?: React.ElementType;
  spacing?: SpacingValues;
}

export interface BoxProps extends AllUtilityProps, ViewProps, CustomBoxProps {}

export default BoxProps;

import React from 'react';
import { PressableProps } from 'react-native';

export interface PillProps extends Omit<PressableProps, 'children'> {
  /** Value returned when selected */
  value: string;

  /** Text label shown inside the pill */
  label: string;

  /** Left icon */
  icon?: React.ComponentType<any>;
}

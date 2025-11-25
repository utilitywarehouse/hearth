import React from 'react';
import { ScrollViewProps, ViewStyle } from 'react-native';

export interface PillGroupProps
  extends Omit<ScrollViewProps, 'horizontal' | 'contentContainerStyle' | 'showsHorizontalScrollIndicator'> {
  /** Controlled selected value(s) */
  value: string | string[];

  /** Multi-select mode. Default = false */
  multiple?: boolean;

  /** Allow pills to wrap lines. Default = true */
  wrap?: boolean;

  /** Handle selection changes */
  onChange?: (value: string | string[]) => void;

  /** Children must be <Pill> elements */
  children: React.ReactNode;

  style?: ViewStyle | ViewStyle[];
}

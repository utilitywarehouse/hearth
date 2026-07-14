import React from 'react';
import { ScrollViewProps, ViewStyle } from 'react-native';

export interface PillGroupBaseProps
  extends Omit<
    ScrollViewProps,
    'horizontal' | 'contentContainerStyle' | 'showsHorizontalScrollIndicator'
  > {
  /** Allow pills to wrap lines. Default = true */
  wrap?: boolean;

  /** Children must be <Pill> elements */
  children: React.ReactNode;

  style?: ViewStyle | ViewStyle[];
}

interface SinglePillGroupProps extends PillGroupBaseProps {
  /** Multi-select mode. Default = false */
  multiple?: false;
  /** Controlled selected value */
  value: string;
  /** Handle selection changes */
  onValueChange?: (value: string) => void;
  /**
   * Handle selection changes
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
}

interface MultiPillGroupProps extends PillGroupBaseProps {
  /** Multi-select mode. Default = false */
  multiple: true;
  /** Controlled selected value(s) */
  value: string[];
  /** Handle selection changes */
  onValueChange?: (value: string[]) => void;
  /**
   * Handle selection changes
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string[]) => void;
}

export type PillGroupProps = SinglePillGroupProps | MultiPillGroupProps;

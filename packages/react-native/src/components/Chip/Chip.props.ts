import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export interface ChipProps extends Omit<PressableProps, 'children'> {
  /** The chip's visible text content. */
  children: ReactNode;
}

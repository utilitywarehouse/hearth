import type { ComponentPropsWithRef, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface ChipProps extends ComponentPropsWithRef<'button'>, MarginProps {
  /** The chip's visible text content. */
  children: ReactNode;
}

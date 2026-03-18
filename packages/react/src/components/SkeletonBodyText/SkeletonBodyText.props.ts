import type { BodyTextProps } from '../BodyText/BodyText.props';

export interface SkeletonBodyTextProps extends Omit<BodyTextProps, 'children' | 'as' | 'asChild'> {
  /**
   * Number of skeleton lines to render.
   * @default 1
   */
  lines?: number;
}

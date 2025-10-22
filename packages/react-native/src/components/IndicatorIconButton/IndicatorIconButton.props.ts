import { UnstyledIconButtonProps } from '../UnstyledIconButton';

export type IndicatorIconButtonProps = Omit<
  UnstyledIconButtonProps,
  'size' | 'disabled' | 'loading'
> & {
  /**
   * If `true`, displays a red dot indicator in the top-right corner.
   * @default false
   */
  indicator?: boolean;
};

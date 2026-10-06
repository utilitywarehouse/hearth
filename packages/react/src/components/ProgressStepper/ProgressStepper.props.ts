import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithRef } from 'react';

export interface CommonProgressStepperProps extends MarginProps {
  /**
   * Whether to hide step labels
   * @default false
   */
  hideLabels?: boolean;
}

type ProgressStepperDivProps = {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * @default div
   */
  as?: 'div';
} & ComponentPropsWithRef<'div'>;
type ProgressStepperNavProps = {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   */
  as: 'nav';
} & ComponentPropsWithRef<'nav'>;

export type ProgressStepperProps = CommonProgressStepperProps &
  (ProgressStepperDivProps | ProgressStepperNavProps);

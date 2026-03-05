import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithRef } from 'react';

export interface CommonProgressStepperProps extends MarginProps {
  /**
   * Whether to hide step labels
   * @default false
   */
  hideLabels?: boolean;
}

type ProgressStepperDivProps = { as?: 'div' } & ComponentPropsWithRef<'div'>;
type ProgressStepperNavProps = { as: 'nav' } & ComponentPropsWithRef<'nav'>;

export type ProgressStepperProps = CommonProgressStepperProps &
  (ProgressStepperDivProps | ProgressStepperNavProps);

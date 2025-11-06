import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

interface CommonProgressStepperProps extends MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * @default div
   */
  as?: 'div' | 'nav';
  /**
   * Whether to hide step labels
   * @default false
   */
  hideLabels?: boolean;
}

type ProgressStepperDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type ProgressStepperNavProps = { as: 'nav' } & ComponentPropsWithout<'nav', RemovedProps>;

export type ProgressStepperProps = CommonProgressStepperProps &
  (ProgressStepperDivProps | ProgressStepperNavProps);

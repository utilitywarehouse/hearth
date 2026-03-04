import { MarginProps } from '../../props/margin.props';

export interface CommonProgressStepperProps extends MarginProps {
  /**
   * Whether to hide step labels
   * @default false
   */
  hideLabels?: boolean;
}

type ProgressStepperDivProps = { as?: 'div' } & React.ComponentPropsWithRef<'div'>;
type ProgressStepperNavProps = { as: 'nav' } & React.ComponentPropsWithRef<'nav'>;

export type ProgressStepperProps = CommonProgressStepperProps &
  (ProgressStepperDivProps | ProgressStepperNavProps);

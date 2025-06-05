import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type LegendProps = ComponentPropsWithout<'legend', RemovedProps> & MarginProps;

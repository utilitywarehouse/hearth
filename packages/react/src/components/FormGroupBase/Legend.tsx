import clsx from 'clsx';
import type { LegendProps } from './Legend.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Legend';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Legend = (props: LegendProps) => {
  const { className, ...legendProps } = extractProps(props, marginPropDefs);
  return <legend className={clsx(componentClassName, className)} {...legendProps} />;
};

Legend.displayName = COMPONENT_NAME;

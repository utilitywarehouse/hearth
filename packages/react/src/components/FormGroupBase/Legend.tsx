import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { LegendProps } from './Legend.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Legend';
const componentClassName = withClassnameGlobalPrefix(componentName);

type LegendElement = ElementRef<'legend'>;

export const Legend = React.forwardRef<LegendElement, LegendProps>((props, ref) => {
  const { className, ...legendProps } = extractProps(props, marginPropDefs);
  return <legend ref={ref} className={clsx(componentClassName, className)} {...legendProps} />;
});

Legend.displayName = componentName;

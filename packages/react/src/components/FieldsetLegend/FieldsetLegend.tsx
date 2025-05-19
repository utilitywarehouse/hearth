import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { FieldsetLegendProps } from './FieldsetLegend.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'FieldsetLegend';
const componentClassName = withGlobalPrefix(componentName);

type FieldsetLegendElement = ElementRef<'legend'>;

export const FieldsetLegend = React.forwardRef<FieldsetLegendElement, FieldsetLegendProps>(
  (props, ref) => {
    const { className, ...legendProps } = extractProps(props, marginPropDefs);
    return <legend ref={ref} className={clsx(componentClassName, className)} {...legendProps} />;
  }
);

FieldsetLegend.displayName = componentName;

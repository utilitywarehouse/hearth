import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { FieldsetLegendProps } from './FieldsetLegend.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'FieldsetLegend';
const componentClassName = withGlobalPrefix(componentName);

type FieldsetLegendElement = ElementRef<'legend'>;

export const FieldsetLegend = React.forwardRef<FieldsetLegendElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => {
    return <legend ref={ref} className={clsx(componentClassName, className)} {...props} />;
  }
);

FieldsetLegend.displayName = componentName;

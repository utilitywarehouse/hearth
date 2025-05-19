import * as React from 'react';

import clsx from 'clsx';

import type { FieldsetProps } from './Fieldset.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';

const componentName = 'Fieldset';
const componentClassName = withGlobalPrefix(componentName);

type FieldsetElement = ElementRef<'fieldset'>;

export const Fieldset = React.forwardRef<FieldsetElement, FieldsetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <fieldset className={clsx(componentClassName, className)} ref={ref} {...props}>
        {children}
      </fieldset>
    );
  }
);

Fieldset.displayName = componentName;

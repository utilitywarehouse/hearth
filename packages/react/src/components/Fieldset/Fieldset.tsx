import * as React from 'react';

import clsx from 'clsx';

import type { FieldsetProps } from './Fieldset.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Fieldset';
const componentClassName = withGlobalPrefix(componentName);

type FieldsetElement = ElementRef<'fieldset'>;

export const Fieldset = React.forwardRef<FieldsetElement, FieldsetProps>((props, ref) => {
  const { children, className, ...fieldsetProps } = extractProps(props, marginPropDefs);
  return (
    <fieldset className={clsx(componentClassName, className)} ref={ref} {...fieldsetProps}>
      {children}
    </fieldset>
  );
});

Fieldset.displayName = componentName;

import * as React from 'react';

import clsx from 'clsx';

import { spinnerPropDefs, SpinnerProps } from './Spinner.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';

const componentName = 'Spinner';
const componentClassName = withGlobalPrefix(componentName);

type SpinnerElement = ElementRef<'div'>;

export const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>((props, ref) => {
  const { className, ...spinnerProps } = extractProps(props, spinnerPropDefs);
  return (
    <div ref={ref} className={clsx(componentClassName, className)} {...spinnerProps}>
      <svg width="24" height="24x" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  );
});

Spinner.displayName = componentName;
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-hidden>
//   <circle cx="20" cy="20" r="18"></circle>
// </svg>

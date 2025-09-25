import * as React from 'react';

import clsx from 'clsx';

import { spinnerPropDefs, SpinnerProps } from './Spinner.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { colorPropDefs } from '../../props/color.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Spinner';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SpinnerElement = ElementRef<'div'>;

export const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(
  ({ currentColor, ...props }, ref) => {
    const { className, ...spinnerProps } = extractProps(
      props,
      spinnerPropDefs,
      colorPropDefs,
      marginPropDefs
    );
    return (
      <div
        ref={ref}
        className={clsx(componentClassName, className)}
        data-currentColor={currentColor ? '' : undefined}
        {...spinnerProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = COMPONENT_NAME;

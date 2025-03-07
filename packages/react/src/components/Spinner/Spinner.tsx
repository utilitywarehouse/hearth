import * as React from 'react';

import clsx from 'clsx';

import { spinnerPropDefs, SpinnerProps } from './Spinner.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { colorPropDefs } from '../../props/color.props';
import { DATA_ATTRIBUTES } from '../../helpers/data-attributes';

const componentName = 'Spinner';
const componentClassName = withGlobalPrefix(componentName);

type SpinnerElement = ElementRef<'div'>;

export const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(
  ({ currentColor, ...props }, ref) => {
    const { className, ...spinnerProps } = extractProps(props, spinnerPropDefs, colorPropDefs);
    const dataAttributeProps = {
      [DATA_ATTRIBUTES.currentColor]: currentColor ? '' : undefined,
    };
    return (
      <div
        ref={ref}
        className={clsx(componentClassName, className)}
        {...spinnerProps}
        {...dataAttributeProps}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = componentName;

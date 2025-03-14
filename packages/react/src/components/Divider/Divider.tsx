import * as React from 'react';

import clsx from 'clsx';

import type { DividerProps } from './Divider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ORIENTATIONS, type Orientation } from '../../types/orientation';
import type { ElementRef } from 'react';

const componentName = 'Divider';
const componentClassName = withGlobalPrefix(componentName);

type DividerElement = ElementRef<'hr'>;

function isValidOrientation(orientation?: Orientation) {
  if (orientation === undefined) return false;
  return ORIENTATIONS.includes(orientation);
}

/**
 * Used to provide a visual break and semantically divide content. Supports
 * vertical and horizontal orientations. Vertical dividers will only be visible
 * when contained inside an element with display set to `flexbox` or `grid`.
 */
export const Divider = React.forwardRef<DividerElement, DividerProps>(
  ({ decorative, orientation: providedOrientation, className, ...dividerProps }, ref) => {
    const orientation = isValidOrientation(providedOrientation)
      ? providedOrientation
      : 'horizontal';

    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
    const semanticProps = decorative
      ? { 'aria-hidden': true }
      : { 'aria-orientation': ariaOrientation };

    return (
      <hr
        ref={ref}
        className={clsx(componentClassName, className)}
        data-orientation={orientation}
        {...semanticProps}
        {...dividerProps}
      />
    );
  }
);

Divider.displayName = componentName;

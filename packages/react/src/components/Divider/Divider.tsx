import * as React from 'react';

import clsx from 'clsx';

import type { DividerProps } from './Divider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ORIENTATIONS, type Orientation } from '../../types/orientation';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Divider';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type DividerElement = ElementRef<'hr'>;

function isValidOrientation(orientation?: Orientation) {
  if (orientation === undefined) return false;
  return ORIENTATIONS.includes(orientation);
}

export const Divider = React.forwardRef<DividerElement, DividerProps>((props, ref) => {
  const {
    decorative,
    orientation: providedOrientation,
    className,
    ...dividerProps
  } = extractProps(props, marginPropDefs);
  const orientation = isValidOrientation(providedOrientation) ? providedOrientation : 'horizontal';

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
});

Divider.displayName = displayName;

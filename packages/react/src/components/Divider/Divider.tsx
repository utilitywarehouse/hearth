import * as React from 'react';
import { cn } from '../../helpers/cn';
import type { DividerProps } from './Divider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ORIENTATIONS } from '../../types/orientation';
import type { Orientation } from '../../types/orientation';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Divider';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

function isValidOrientation(orientation?: Orientation) {
  if (orientation === undefined) return false;
  return ORIENTATIONS.includes(orientation);
}

export const Divider = (props: DividerProps) => {
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
      className={cn(componentClassName, className)}
      data-orientation={orientation}
      {...semanticProps}
      {...dividerProps}
    />
  );
};

Divider.displayName = COMPONENT_NAME;

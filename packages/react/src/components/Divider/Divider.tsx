import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
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

type DividerElement = ComponentRef<'hr'>;

/**
 * Use Divider to provide a visual break and semantically divide content.
 * It renders an `hr` with a `separator` role by default — use the
 * `decorative` prop instead of CSS styling when you need a purely visual
 * separation removed from the accessibility tree. A vertical orientation
 * is only visible inside a flex or grid container.
 *
 * @summary A line that provides a visual break and semantic division between content.
 */
export const Divider = forwardRef<DividerElement, DividerProps>((props, ref) => {
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
      className={cn(componentClassName, className)}
      data-orientation={orientation}
      data-testid={componentClassName}
      {...semanticProps}
      {...dividerProps}
    />
  );
});

Divider.displayName = COMPONENT_NAME;

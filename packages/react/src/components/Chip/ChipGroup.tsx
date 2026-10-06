'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { useIds } from '../../hooks/use-ids';
import { BodyText } from '../BodyText/BodyText';
import type { ChipGroupProps } from './ChipGroup.props';

const COMPONENT_NAME = 'ChipGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ChipGroupElement = ComponentRef<'div'>;

/**
 * Use ChipGroup to lay out a collection of `Chip` components, such as the
 * filters currently applied to a list of results. Pass `label` to introduce
 * the group, e.g. "Currently showing:".
 *
 * @summary A wrapping layout container for a collection of `Chip` components.
 */
export const ChipGroup = forwardRef<ChipGroupElement, ChipGroupProps>((props, ref) => {
  const {
    className,
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    ...chipGroupProps
  } = extractProps(props, marginPropDefs);
  const { labelId } = useIds({ prefix: 'chip-group' });

  return (
    <div
      ref={ref}
      className={cn(componentClassName, className)}
      role="group"
      aria-labelledby={ariaLabelledby ?? (label ? labelId : undefined)}
      data-testid={componentClassName}
      {...chipGroupProps}
    >
      {label ? (
        <BodyText as="span" weight="semibold" id={labelId}>
          {label}
        </BodyText>
      ) : null}
      {children}
    </div>
  );
});

ChipGroup.displayName = COMPONENT_NAME;

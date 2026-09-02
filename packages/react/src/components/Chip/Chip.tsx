'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { CloseSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { ChipProps } from './Chip.props';

const COMPONENT_NAME = 'Chip';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ChipElement = ComponentRef<'button'>;

/**
 * Use Chip to represent an input, attribute, or filter that a user can remove
 * with a single click. Commonly used to show active filters applied to a list
 * of results.
 *
 * @summary A compact, removable element representing an active filter or attribute.
 */
export const Chip = forwardRef<ChipElement, ChipProps>((props, ref) => {
  const {
    className,
    children,
    disabled,
    onClick,
    'aria-label': ariaLabel,
    ...chipProps
  } = extractProps(props, marginPropDefs);

  // A Chip's only interaction is removal, so its accessible name should say
  // so rather than just repeating the visible label.
  // Pass `aria-label` to override this for a different action or wording.
  const defaultAriaLabel = typeof children === 'string' ? `Remove ${children} filter` : undefined;

  return (
    <button
      ref={ref}
      className={cn(componentClassName, className)}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel ?? defaultAriaLabel}
      onClick={disabled ? undefined : onClick}
      type="button"
      data-testid={componentClassName}
      {...chipProps}
    >
      {children}
      <CloseSmallIcon />
    </button>
  );
});

Chip.displayName = COMPONENT_NAME;

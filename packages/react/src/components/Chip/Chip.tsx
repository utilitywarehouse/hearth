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
  const { className, children, disabled, onClick, ...chipProps } = extractProps(
    props,
    marginPropDefs
  );

  return (
    <button
      ref={ref}
      className={cn(componentClassName, className)}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      data-testid={componentClassName}
      {...chipProps}
    >
      {children}
      <CloseSmallIcon />
    </button>
  );
});

Chip.displayName = COMPONENT_NAME;

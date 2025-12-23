'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { buttonBasePropDefs } from './ButtonBase.props';
import type { ButtonBaseProps } from './ButtonBase.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'ButtonBase';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ButtonBase = (props: ButtonBaseProps) => {
  const {
    colorScheme,
    inverted,
    className,
    disabled,
    onClick,
    asChild,
    children,
    ...buttonBaseProps
  } = extractProps(props, buttonBasePropDefs, marginPropDefs);
  const { variant = 'solid' } = props;

  const defaultColorScheme =
    variant === 'emphasis' || variant === 'solid' ? 'highlight' : 'functional';
  const dataAttributeProps = {
    'data-colorscheme': colorScheme || defaultColorScheme,
    'data-inverted': inverted ? '' : undefined,
  };

  // We're rendering a different component here so that we don't have to apply
  // transitions to box-shadow, which causes re-paints on every frame, heavily
  // impacting performance.
  if (variant === 'emphasis') {
    return (
      <Slot.Root
        aria-disabled={disabled || undefined}
        className={cn(componentClassName, className)}
        // as we're using aria-disabled instead of disabled then we need to
        // disable the onClick event
        onClick={disabled ? undefined : onClick}
        {...dataAttributeProps}
        {...buttonBaseProps}
      >
        {getSubtree({ asChild, children }, children => (
          <>
            <span className={`${componentClassName}Shadow`}></span>
            <span className={`${componentClassName}Front`}>{children}</span>
          </>
        ))}
      </Slot.Root>
    );
  }
  return (
    <Slot.Root
      aria-disabled={disabled || undefined}
      className={cn(componentClassName, className)}
      onClick={disabled ? undefined : onClick}
      {...dataAttributeProps}
      {...buttonBaseProps}
    >
      {children}
    </Slot.Root>
  );
};

ButtonBase.displayName = COMPONENT_NAME;

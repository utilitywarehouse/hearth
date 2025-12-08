'use client';

import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { unstyledIconButtonPropDefs } from './UnstyledIconButton.props';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { extractProps } from '../../helpers/extract-props';
import { Spinner } from '../Spinner/Spinner';
import type { SpinnerProps } from '../Spinner/Spinner.props';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';
import { getResponsiveTranslation } from '../../helpers/get-responsive-translation';

const COMPONENT_NAME = 'UnstyledIconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export type UnstyledIconButtonElement = ElementRef<'button'>;

export const UnstyledIconButton = React.forwardRef<
  UnstyledIconButtonElement,
  UnstyledIconButtonProps
>((props, forwardedRef) => {
  const {
    className,
    children,
    label,
    disabled,
    inverted,
    loading,
    onClick,
    asChild,
    ...unstyledIconButtonProps
  } = extractProps(props, unstyledIconButtonPropDefs);

  const spinnerSize = getResponsiveTranslation(props.size || 'md', { md: 'sm', sm: 'xs' });
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      aria-label={label}
      aria-disabled={disabled || loading}
      data-inverted={inverted ? '' : undefined}
      onClick={disabled ? undefined : onClick}
      {...unstyledIconButtonProps}
    >
      {loading
        ? getSubtree({ asChild, children }, () => (
            <Spinner size={spinnerSize as SpinnerProps['size']} currentColor />
          ))
        : children}
    </Component>
  );
});

UnstyledIconButton.displayName = COMPONENT_NAME;

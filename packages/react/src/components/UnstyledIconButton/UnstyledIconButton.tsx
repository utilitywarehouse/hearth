'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
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

type UnstyledIconButtonElement = ComponentRef<'button'>;

export const UnstyledIconButton = forwardRef<UnstyledIconButtonElement, UnstyledIconButtonProps>(
  (props, ref) => {
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
        ref={ref}
        className={cn(componentClassName, className)}
        aria-label={label}
        aria-disabled={disabled || loading}
        data-inverted={inverted ? '' : undefined}
        onClick={disabled ? undefined : onClick}
        data-testid={componentClassName}
        {...unstyledIconButtonProps}
      >
        {loading
          ? getSubtree({ asChild, children }, () => (
              <Spinner size={spinnerSize as SpinnerProps['size']} currentColor />
            ))
          : children}
      </Component>
    );
  }
);

UnstyledIconButton.displayName = COMPONENT_NAME;

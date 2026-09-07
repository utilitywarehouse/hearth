'use client';

import { cn } from '../../helpers/cn';
import type { CardActionButtonProps } from './CardActionButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

type CardActionButtonElement = ComponentRef<'button'>;

const COMPONENT_NAME = 'CardActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

/**
 * Use CardActionButton within a Card to trigger an action, such as opening
 * a dialog or performing an in-page action. Use `CardActionLink` instead
 * when the action navigates to a new location.
 *
 * @summary A Card action that renders a button.
 */
export const CardActionButton = forwardRef<CardActionButtonElement, CardActionButtonProps>(
  (
    {
      className,
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      trailingIcon,
      badge,
      badgePlacement,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const contentProps = {
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      badge,
      badgePlacement,
    };
    return (
      <button
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
      >
        <CardActionContent
          trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
          {...contentProps}
        />
      </button>
    );
  }
);

CardActionButton.displayName = COMPONENT_NAME;

'use client';

import { cn } from '../../helpers/cn';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'ListItemButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemButtonElement = ComponentRef<'button'>;

export const ListItemButton = React.forwardRef<ListItemButtonElement, ListItemButtonProps>(
  (
    {
      className,
      heading,
      helperText,
      leadingContent,
      trailingContent,
      badge,
      badgePlacement,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const contentProps = {
      heading,
      helperText,
      leadingContent,
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
        <ListItemContent
          trailingContent={trailingContent ? trailingContent : <ChevronRightSmallIcon />}
          {...contentProps}
        >
          {children}
        </ListItemContent>
      </button>
    );
  }
);

ListItemButton.displayName = COMPONENT_NAME;

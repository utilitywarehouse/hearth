'use client';

import { cn } from '../../helpers/cn';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'ListItemLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemLinkElement = ComponentRef<'a'>;

export const ListItemLink = React.forwardRef<ListItemLinkElement, ListItemLinkProps>(
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
      asChild,
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
    const Component = asChild ? Slot.Root : 'a';
    return (
      <Component ref={ref} className={cn(componentClassName, className)} {...props}>
        {getSubtree({ asChild, children }, children => (
          <ListItemContent
            trailingContent={trailingContent ? trailingContent : <ChevronRightSmallIcon />}
            {...contentProps}
          >
            {children}
          </ListItemContent>
        ))}
      </Component>
    );
  }
);

ListItemLink.displayName = COMPONENT_NAME;

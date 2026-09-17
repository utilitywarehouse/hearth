'use client';

import { cn } from '../../helpers/cn';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'ListItemLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemLinkElement = ComponentRef<'a'>;

/**
 * Use ListItemLink for a `List` item that navigates to another page or
 * location, rendering an `a` element with a trailing chevron icon by
 * default. Use `asChild` to render as a different element, such as a
 * framework `Link` component.
 *
 * @summary A List item that renders as a link.
 */
export const ListItemLink = forwardRef<ListItemLinkElement, ListItemLinkProps>(
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

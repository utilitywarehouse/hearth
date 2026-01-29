'use client';

import { cn } from '../../helpers/cn';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'ListItemLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListItemLink = ({
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
}: ListItemLinkProps) => {
  const contentProps = {
    heading,
    helperText,
    leadingContent,
    badge,
    badgePlacement,
  };
  const Component = asChild ? Slot.Root : 'a';
  return (
    <Component className={cn(componentClassName, className)} {...props}>
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
};

ListItemLink.displayName = COMPONENT_NAME;

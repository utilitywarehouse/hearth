'use client';

import { cn } from '../../helpers/cn';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';

const COMPONENT_NAME = 'ListItemButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListItemButton = ({
  className,
  heading,
  helperText,
  leadingContent,
  trailingContent,
  badge,
  badgePlacement,
  children,
  ...props
}: ListItemButtonProps) => {
  const contentProps = {
    heading,
    helperText,
    leadingContent,
    badge,
    badgePlacement,
  };
  return (
    <button className={cn(componentClassName, className)} {...props}>
      <ListItemContent
        trailingContent={trailingContent ? trailingContent : <ChevronRightSmallIcon />}
        {...contentProps}
      >
        {children}
      </ListItemContent>
    </button>
  );
};

ListItemButton.displayName = COMPONENT_NAME;

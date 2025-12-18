'use client';

import clsx from 'clsx';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from './ListItemContent';

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
  ...props
}: ListItemLinkProps) => {
  const contentProps = {
    heading,
    helperText,
    leadingContent,
    badge,
    badgePlacement,
  };
  return (
    <a className={clsx(componentClassName, className)} {...props}>
      <ListItemContent
        trailingContent={trailingContent ? trailingContent : <ChevronRightSmallIcon />}
        {...contentProps}
      >
        {children}
      </ListItemContent>
    </a>
  );
};

ListItemLink.displayName = COMPONENT_NAME;

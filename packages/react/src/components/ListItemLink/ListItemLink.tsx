import * as React from 'react';
import clsx from 'clsx';
import type { ListItemLinkProps } from './ListItemLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListItemContent } from '../ListItemContent/ListItemContent';

const COMPONENT_NAME = 'ListItemLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemLinkElement = ElementRef<'a'>;

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
      <a ref={ref} className={clsx(componentClassName, className)} {...props}>
        <ListItemContent
          trailingContent={trailingContent ? trailingContent : <ChevronRightSmallIcon />}
          {...contentProps}
        >
          {children}
        </ListItemContent>
      </a>
    );
  }
);

ListItemLink.displayName = COMPONENT_NAME;

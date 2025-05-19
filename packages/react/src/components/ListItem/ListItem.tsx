import * as React from 'react';
import clsx from 'clsx';
import type { ListItemProps } from './ListItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { BodyText } from '../BodyText/BodyText';

const componentName = 'ListItem';
const componentClassName = withGlobalPrefix(componentName);

type ListItemElement = ElementRef<'li'>;

export const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BodyText size="lg" asChild className={clsx(componentClassName, className)}>
        <li ref={ref} {...props}>
          {children}
        </li>
      </BodyText>
    );
  }
);

ListItem.displayName = componentName;

import * as React from 'react';
import clsx from 'clsx';
import type { ListItemProps } from './ListItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';

const componentName = 'ListItem';
const componentClassName = withGlobalPrefix(componentName);

type ListItemElement = ElementRef<'li'>;

export const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  ({ className, children, leadingIcon, helperText, ...props }, ref) => {
    const Content = helperText ? (
      <Flex direction="column">
        {children}
        <HelperText>{helperText}</HelperText>
      </Flex>
    ) : (
      children
    );
    return (
      <BodyText asChild size="lg">
        <li ref={ref} className={clsx(componentClassName, className)} {...props}>
          {leadingIcon ? (
            <Flex direction="row" gap="150">
              {leadingIcon} {Content}
            </Flex>
          ) : (
            Content
          )}
        </li>
      </BodyText>
    );
  }
);

ListItem.displayName = componentName;

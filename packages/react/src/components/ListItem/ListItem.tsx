import * as React from 'react';
import clsx from 'clsx';
import type { ListItemProps } from './ListItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ListItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemElement = ElementRef<'li'>;

export const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  (
    {
      className,
      children,
      direction,
      alignItems,
      alignContent,
      justifyContent,
      wrap,
      width,
      maxWidth,
      minWidth,
      height,
      maxHeight,
      minHeight,
      gap,
      rowGap,
      columnGap,
      ...props
    },
    ref
  ) => {
    const flexProps = {
      direction,
      alignItems,
      alignContent,
      justifyContent,
      wrap,
      width,
      maxWidth,
      minWidth,
      height,
      maxHeight,
      minHeight,
      gap,
      rowGap,
      columnGap,
    };
    return (
      <Flex asChild {...flexProps}>
        <BodyText size="lg" asChild className={clsx(componentClassName, className)}>
          <li ref={ref} {...props}>
            {children}
          </li>
        </BodyText>
      </Flex>
    );
  }
);

ListItem.displayName = COMPONENT_NAME;

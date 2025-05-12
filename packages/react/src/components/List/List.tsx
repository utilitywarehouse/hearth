import * as React from 'react';
import clsx from 'clsx';
import { type ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import type { ElementRef } from 'react';
import { DetailText } from '../DetailText/DetailText';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';

const componentName = 'List';
const componentClassName = withGlobalPrefix(componentName);

type ListElement = ElementRef<'ul'>;

export const List = React.forwardRef<ListElement, ListProps>(
  (
    {
      className,
      colorScheme = undefined,
      heading,
      headingElement: HeadingEl = 'div',
      helperText,
      // linkText,
      // linkHref,
      children,
      variant,
      ...props
    },
    ref
  ) => {
    const ListContainer = (
      <ul role="list" ref={ref} {...props}>
        {children}
      </ul>
    );

    return (
      <div className={clsx(componentClassName, className)}>
        <Flex direction="column">
          <DetailText asChild size="lg">
            <HeadingEl>{heading}</HeadingEl>
          </DetailText>
          {helperText ? <HelperText disableUserSelect>{helperText}</HelperText> : null}
        </Flex>
        {variant === undefined || colorScheme === undefined ? (
          <Box asChild className="hearth-ListContainer">
            {ListContainer}
          </Box>
        ) : (
          <Card
            className="hearth-ListContainer"
            paddingNone
            variant={variant}
            colorScheme={colorScheme}
          >
            {ListContainer}
          </Card>
        )}
      </div>
    );
  }
);

List.displayName = componentName;

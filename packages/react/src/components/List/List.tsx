import * as React from 'react';
import clsx from 'clsx';
import { listPropDefs, type ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { useIds } from '../../hooks/use-ids';
import type { ElementRef } from 'react';
import { DetailText } from '../DetailText/DetailText';
import { extractProps } from '../../helpers/extract-props';
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
      // href,
      children,
      id: providedId,
      variant,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'list' });

    const ListContainer = (
      <ul
        role="list"
        ref={ref}
        id={id}
        data-colorscheme={colorScheme}
        aria-labelledby={labelId}
        aria-describedby={helperText ? helperTextId : undefined}
        {...props}
      >
        {children}
      </ul>
    );

    return (
      <div className={clsx(componentClassName, className)}>
        <Flex direction="column">
          <DetailText asChild size="lg" id={labelId}>
            <HeadingEl>{heading}</HeadingEl>
          </DetailText>
          {helperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
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

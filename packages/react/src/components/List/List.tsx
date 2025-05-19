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
import { Link } from '../Link/Link';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const componentName = 'List';
const componentClassName = withGlobalPrefix(componentName);

type ListElement = ElementRef<'ol'>;

export const List = React.forwardRef<ListElement, ListProps>(
  (
    {
      as: Tag = 'ul',
      className,
      colorScheme = undefined,
      heading,
      headingElement: HeadingEl = 'div',
      helperText,
      linkText,
      linkHref,
      children,
      variant,
      ...props
    },
    ref
  ) => {
    const showLink = linkHref && linkText;
    return (
      <div className={clsx(componentClassName, className)}>
        <div className="hearth-ListHeader">
          <Flex direction="column" flexGrow="1">
            <DetailText asChild size="lg">
              <HeadingEl>{heading}</HeadingEl>
            </DetailText>
            {helperText ? <HelperText disableUserSelect>{helperText}</HelperText> : null}
          </Flex>
          {showLink ? (
            <Link href={linkHref}>
              {linkText}
              <ChevronRightSmallIcon />
            </Link>
          ) : null}
        </div>
        {variant === undefined || colorScheme === undefined ? (
          <Box asChild className="hearth-ListContainer">
            <Tag role="list" ref={ref} {...props}>
              {children}
            </Tag>
          </Box>
        ) : (
          <Card
            className="hearth-ListContainer"
            paddingNone
            variant={variant}
            colorScheme={colorScheme}
          >
            <Tag role="list" ref={ref} {...props}>
              {children}
            </Tag>
          </Card>
        )}
      </div>
    );
  }
);

List.displayName = componentName;

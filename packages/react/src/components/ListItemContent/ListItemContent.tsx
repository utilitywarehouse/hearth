import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { ListItemContentProps } from './ListItemContent.props';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListItemContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemContentElement = ElementRef<'div'>;

export const ListItemContent = React.forwardRef<ListItemContentElement, ListItemContentProps>(
  ({ heading, leadingContent, trailingContent, helperText, className }) => {
    return (
      <Flex
        width="100%"
        gap="150"
        alignItems="start"
        className={clsx(componentClassName, className)}
      >
        {leadingContent ? leadingContent : null}
        <Flex direction="column" flexGrow="1">
          <BodyText size="lg">{heading}</BodyText>
          {helperText ? <HelperText>{helperText}</HelperText> : null}
        </Flex>
        {trailingContent ? trailingContent : null}
      </Flex>
    );
  }
);

ListItemContent.displayName = COMPONENT_NAME;

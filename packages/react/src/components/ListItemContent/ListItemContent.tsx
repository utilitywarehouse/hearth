import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { ListItemContentProps } from './ListItemContent.props';
import clsx from 'clsx';

const COMPONENT_NAME = 'ListItemContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListItemContentElement = ElementRef<'div'>;

export const ListItemContent = React.forwardRef<ListItemContentElement, ListItemContentProps>(
  ({ heading, leadingContent, helperText, className }) => {
    return (
      <Flex gap="150" className={clsx(componentClassName, className)}>
        {leadingContent ? leadingContent : null}
        <Flex direction="column">
          <p>{heading}</p>
          {helperText ? <HelperText>{helperText}</HelperText> : null}
        </Flex>
      </Flex>
    );
  }
);

ListItemContent.displayName = COMPONENT_NAME;

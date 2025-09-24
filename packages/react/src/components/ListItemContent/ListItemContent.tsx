import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { ListItemContentProps } from './ListItemContent.props';
import clsx from 'clsx';

const componentName = 'ListItemContent';
const componentClassName = withClassnameGlobalPrefix(componentName);

type ListItemContentElement = ElementRef<'div'>;

export const ListItemContent = React.forwardRef<ListItemContentElement, ListItemContentProps>(
  ({ heading, leadingIcon, helperText, className }) => {
    return (
      <Flex gap="150" className={clsx(componentClassName, className)}>
        {leadingIcon ? leadingIcon : null}
        <Flex direction="column">
          <p>{heading}</p>
          {helperText ? <HelperText>{helperText}</HelperText> : null}
        </Flex>
      </Flex>
    );
  }
);

ListItemContent.displayName = componentName;

import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { ListItemTextProps } from './ListItemText.props';
import clsx from 'clsx';

const componentName = 'ListItemText';
const componentClassName = withGlobalPrefix(componentName);

type ListItemTextElement = ElementRef<'div'>;

export const ListItemText = React.forwardRef<ListItemTextElement, ListItemTextProps>(
  ({ children, leadingIcon, helperText, className }) => {
    return (
      <Flex gap="150" className={clsx(componentClassName, className)} flexGrow="1">
        {leadingIcon ? leadingIcon : null}
        <Flex direction="column">
          <span>{children}</span>
          {helperText ? <HelperText>{helperText}</HelperText> : null}
        </Flex>
      </Flex>
    );
  }
);

ListItemText.displayName = componentName;

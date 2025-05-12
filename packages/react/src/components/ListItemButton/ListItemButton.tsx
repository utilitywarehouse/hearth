import * as React from 'react';
import clsx from 'clsx';
import type { ListItemButtonProps } from './ListItemButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';

const componentName = 'ListItemButton';
const componentClassName = withGlobalPrefix(componentName);

type ListItemButtonElement = ElementRef<'button'>;

export const ListItemButton = React.forwardRef<ListItemButtonElement, ListItemButtonProps>(
  ({ className, children, leadingIcon, helperText, ...props }, ref) => {
    const Content = helperText ? (
      <Flex direction="column">
        <BodyText size="lg">{children}</BodyText>
        <HelperText>{helperText}</HelperText>
      </Flex>
    ) : (
      <BodyText size="lg">{children}</BodyText>
    );
    return (
      <button ref={ref} className={clsx(componentClassName, className)} {...props}>
        {leadingIcon ? (
          <Flex direction="row" gap="150">
            {leadingIcon} {Content}
          </Flex>
        ) : (
          Content
        )}
      </button>
    );
  }
);

ListItemButton.displayName = componentName;

import React, { forwardRef } from 'react';
import type { LinkProps } from './Link.props';
import { createLink } from '@gluestack-ui/link';
import LinkRoot from './LinkRoot';
import LinkTextComponent from './LinkText';
import { PressableRef } from '../../types';
import LinkIcon from './LinkIcon';
import { ChevronRightSmallIcon } from '../../../docs/components/icons';

const LinkComponent = createLink({
  Root: LinkRoot,
  Text: LinkTextComponent,
});

export const LinkText = LinkComponent.Text;

LinkText.displayName = 'LinkText';

const Link = forwardRef<PressableRef, LinkProps>(
  (
    {
      children,
      icon = ChevronRightSmallIcon,
      disabled = false,
      target = '_self',
      iconPosition = 'right',
      inline = false,
      ...props
    },
    ref
  ) => {
    return (
      <LinkComponent
        // @ts-expect-error - ref
        ref={ref}
        {...props}
        inline={inline}
        isDisabled={disabled}
        isExternal={target === '_blank'}
      >
        {!inline && icon && iconPosition === 'left' ? <LinkIcon as={icon} /> : null}
        <LinkText>{children}</LinkText>
        {!inline && icon && iconPosition === 'right' ? <LinkIcon as={icon} /> : null}
      </LinkComponent>
    );
  }
);

Link.displayName = 'Link';

export default Link;

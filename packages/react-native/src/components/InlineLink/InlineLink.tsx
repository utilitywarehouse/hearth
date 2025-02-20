import React, { forwardRef } from 'react';
import type { InlineLinkProps } from './InlineLink.props';
import { createLink } from '@gluestack-ui/link';
import InlineLinkRoot from './InlineLinkRoot';
import { PressableRef } from '../../types';
import { Text } from 'react-native';

const InlineLinkComponent = createLink({
  Root: InlineLinkRoot,
  Text: Text,
});

const InlineLink = forwardRef<PressableRef, InlineLinkProps>(
  ({ children, disabled = false, target = '_self', ...props }, ref) => {
    return (
      <InlineLinkComponent
        // @ts-expect-error - ref
        ref={ref}
        {...props}
        isDisabled={disabled}
        isExternal={target === '_blank'}
      >
        {children}
      </InlineLinkComponent>
    );
  }
);

InlineLink.displayName = 'InlineLink';

export default InlineLink;

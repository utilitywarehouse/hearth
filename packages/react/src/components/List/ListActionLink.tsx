'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'ListActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListActionLinkElement = ComponentRef<'a'>;

export const ListActionLink = React.forwardRef<
  ListActionLinkElement,
  React.ComponentPropsWithRef<'a'>
>(({ className, children, ...props }, ref) => {
  return (
    <BodyText ref={ref} size="md" weight="semibold" asChild>
      <a className={cn(componentClassName, className)} {...props}>
        {children}
        <ChevronRightSmallIcon />
      </a>
    </BodyText>
  );
});

ListActionLink.displayName = COMPONENT_NAME;

'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListActionLink = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'a'>) => {
  return (
    <BodyText size="md" weight="semibold" asChild>
      <a className={cn(componentClassName, className)} {...props}>
        {children}
        <ChevronRightSmallIcon />
      </a>
    </BodyText>
  );
};

ListActionLink.displayName = COMPONENT_NAME;

'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListActionButton = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'button'>) => {
  return (
    <BodyText size="md" weight="semibold" asChild>
      <button className={clsx(componentClassName, className)} {...props}>
        {children}
        <ChevronRightSmallIcon />
      </button>
    </BodyText>
  );
};

ListActionButton.displayName = COMPONENT_NAME;

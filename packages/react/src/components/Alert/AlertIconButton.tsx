'use client';

import * as React from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { UnstyledIconButtonProps } from '../UnstyledIconButton/UnstyledIconButton.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AlertIconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AlertIconButtonElement = ComponentRef<'button'>;

export const AlertIconButton = React.forwardRef<AlertIconButtonElement, UnstyledIconButtonProps>(
  ({ children, label = 'Alert action', title = 'Alert action', className, ...props }, ref) => {
    return (
      <UnstyledIconButton
        ref={ref}
        className={cn(componentClassName, className)}
        label={label}
        title={title}
        {...props}
      >
        {children || <ChevronRightSmallIcon />}
      </UnstyledIconButton>
    );
  }
);

AlertIconButton.displayName = COMPONENT_NAME;

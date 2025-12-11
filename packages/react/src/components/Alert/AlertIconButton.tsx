'use client';

import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { UnstyledIconButtonProps } from '../UnstyledIconButton/UnstyledIconButton.props';

const COMPONENT_NAME = 'AlertIconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export type AlertIconButtonProps = UnstyledIconButtonProps;

type AlertIconButtonElement = ElementRef<'button'>;

export const AlertIconButton = React.forwardRef<AlertIconButtonElement, AlertIconButtonProps>(
  ({ children, label = 'Alert action', title = 'Alert action', className, ...props }, ref) => {
    return (
      <UnstyledIconButton
        ref={ref}
        className={clsx(componentClassName, className)}
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

'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { DropdownMenu as RadixMenu } from 'radix-ui';
import { MenuTriggerProps } from './MenuTrigger.props';

const COMPONENT_NAME = 'MenuTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuTriggerElement = ElementRef<'button'>;

export const MenuTrigger = React.forwardRef<MenuTriggerElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixMenu.DropdownMenuTrigger
        ref={ref}
        className={clsx(componentClassName, className)}
        asChild
        {...props}
      />
    );
  }
);

MenuTrigger.displayName = COMPONENT_NAME;

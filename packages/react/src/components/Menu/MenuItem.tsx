import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { DropdownMenu as RadixMenu } from 'radix-ui';
import { MenuItemProps } from './MenuItem.props';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuItemElement = ElementRef<'div'>;

export const MenuItem = React.forwardRef<MenuItemElement, MenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixMenu.DropdownMenuItem
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
      />
    );
  }
);

MenuItem.displayName = COMPONENT_NAME;

'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import type { MenuItemProps } from './MenuItem.props';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuItem = ({ className, colorScheme = 'functional', ...props }: MenuItemProps) => {
  return (
    <MenuPrimitive.DropdownMenuItem
      className={clsx(componentClassName, className)}
      data-colorscheme={colorScheme}
      {...props}
    />
  );
};

MenuItem.displayName = COMPONENT_NAME;

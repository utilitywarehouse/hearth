'use client';

import type { MenuProps } from './Menu.props';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export const Menu = (props: MenuProps) => <MenuPrimitive.Root {...props} />;

Menu.displayName = 'Menu';

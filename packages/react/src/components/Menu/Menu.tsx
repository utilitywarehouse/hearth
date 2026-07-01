'use client';

import type { MenuProps } from './Menu.props';
import { Menu as MenuPrimitive } from '@base-ui/react';

export const Menu = (props: MenuProps) => <MenuPrimitive.Root {...props} />;

Menu.displayName = 'Menu';

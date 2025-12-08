'use client';

import * as React from 'react';
import { MenuProps } from './Menu.props';
import { DropdownMenu as RadixMenu } from 'radix-ui';

export const Menu: React.FC<MenuProps> = props => <RadixMenu.Root {...props} />;

Menu.displayName = 'Menu';

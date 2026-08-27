'use client';

import type { MenuProps } from './Menu.props';
import { Menu as MenuPrimitive } from '@base-ui/react';

/**
 * Use Menu to present a short list of actions or options in response to a
 * user's interaction, such as sorting, filtering, or additional options,
 * without navigating away from the current screen. Compose the root Menu
 * with MenuTrigger and MenuContent, which wraps any number of MenuItem
 * components. Set `modal={false}` when multiple Menu components are used
 * together, such as in a navigation bar.
 *
 * @summary A menu that presents a short list of actions or options triggered by user interaction.
 */
export const Menu = (props: MenuProps) => <MenuPrimitive.Root {...props} />;

Menu.createHandle = MenuPrimitive.createHandle;

Menu.displayName = 'Menu';

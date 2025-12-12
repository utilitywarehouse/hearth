'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import type { MenuTriggerProps } from './MenuTrigger.props';

const COMPONENT_NAME = 'MenuTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => {
  return (
    <MenuPrimitive.DropdownMenuTrigger
      className={clsx(componentClassName, className)}
      asChild
      {...props}
    />
  );
};

MenuTrigger.displayName = COMPONENT_NAME;

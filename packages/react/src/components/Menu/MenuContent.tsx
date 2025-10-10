import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as RadixMenu } from 'radix-ui';
import { MenuContentProps } from './MenuContent.props';

const COMPONENT_NAME = 'MenuContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuContent: React.FC<MenuContentProps> = ({
  className,
  forceMount,
  container,
  ...props
}) => {
  const portalProps = { forceMount, container };
  return (
    <RadixMenu.DropdownMenuPortal {...portalProps}>
      <RadixMenu.DropdownMenuContent className={clsx(componentClassName, className)} {...props} />
    </RadixMenu.DropdownMenuPortal>
  );
};

MenuContent.displayName = COMPONENT_NAME;

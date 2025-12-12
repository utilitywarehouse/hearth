import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export type MenuContentProps = Omit<
  React.ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenuPortal>,
  'container'
> &
  Omit<
    React.ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenuContent>,
    | 'asChild'
    | 'loop'
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'avoidCollisions'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'arrowPadding'
    | 'sticky'
    | 'hideWhenDetached'
    | 'onCloseAutoFocus'
    | 'onEscapeKeyDown'
    | 'onPointerDownOutside'
    | 'onFocusOutside'
    | 'onInteractOutside'
  > & {
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  };

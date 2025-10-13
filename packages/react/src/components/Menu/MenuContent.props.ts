import { DropdownMenu as RadixMenu } from 'radix-ui';

export type MenuContentProps = Omit<RadixMenu.DropdownMenuPortalProps, 'container'> &
  Omit<
    RadixMenu.DropdownMenuContentProps,
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

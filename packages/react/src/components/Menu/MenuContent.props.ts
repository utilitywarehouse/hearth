import { DropdownMenu as RadixMenu } from 'radix-ui';

export type MenuContentProps = RadixMenu.DropdownMenuPortalProps &
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
  > & {};

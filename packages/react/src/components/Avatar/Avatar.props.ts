import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { Avatar as RadixAvatar } from 'radix-ui';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const avatarPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface AvatarProps
  extends Omit<
      ComponentPropsWithoutRef<typeof RadixAvatar.Root>,
      keyof RadixAvatar.AvatarImageProps
    >,
    Omit<ComponentProps<typeof RadixAvatar.Image>, 'alt'>,
    Omit<ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>, keyof RadixAvatar.AvatarImageProps>,
    MarginProps {
  /**
   * Set the name associated with the avatar, used for creating initials, and an accessible description.
   * @default md
   */
  name?: RadixAvatar.AvatarImageProps['alt'];
  /**
   * Sets the badge size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
}

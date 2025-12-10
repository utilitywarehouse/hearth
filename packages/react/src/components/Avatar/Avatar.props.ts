import { MarginProps } from '../../props/margin.props';
import { Avatar as AvatarPrimitive } from 'radix-ui';
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
      React.ComponentPropsWithRef<typeof AvatarPrimitive.Root>,
      keyof AvatarPrimitive.AvatarImageProps | 'asChild'
    >,
    Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>, 'alt' | 'asChild'>,
    Omit<
      React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
      keyof AvatarPrimitive.AvatarImageProps | 'asChild'
    >,
    MarginProps {
  /**
   * Set the name associated with the avatar, used for creating initials, and an accessible description.
   */
  name?: AvatarPrimitive.AvatarImageProps['alt'];
  /**
   * Sets the avatar size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
}

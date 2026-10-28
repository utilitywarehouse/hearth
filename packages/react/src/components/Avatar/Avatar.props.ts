import type { ComponentPropsWithRef, ComponentPropsWithoutRef, CSSProperties } from 'react';
import { MarginProps } from '../../props/margin.props';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const avatarPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface AvatarProps
  extends
    Omit<
      ComponentPropsWithRef<typeof AvatarPrimitive.Root>,
      keyof AvatarPrimitive.Image.Props | 'render' | 'className' | 'style'
    >,
    Omit<
      ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
      'alt' | 'render' | 'className' | 'style'
    >,
    Omit<
      ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
      keyof AvatarPrimitive.Image.Props | 'render' | 'className' | 'style'
    >,
    MarginProps {
  className?: string;
  style?: CSSProperties;
  /**
   * Set the name associated with the avatar, used for creating initials, and an accessible description.
   */
  name?: string;
  /**
   * How long to wait, in milliseconds, before showing the fallback.
   */
  delay?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>['delay'];
  /** @deprecated Use `delay` instead. Will be removed in the next major version. */
  delayMs?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>['delay'];
  /**
   * Sets the avatar size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
}

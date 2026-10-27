import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';
import { MarginProps } from '../../props/margin.props';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

const sizes = ['sm', 'md'] as const;

export const switchPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SwitchProps
  extends
    Omit<
      ComponentPropsWithRef<typeof SwitchPrimitive.Root>,
      'render' | 'nativeButton' | 'className' | 'style'
    >,
    MarginProps {
  className?: string;
  style?: CSSProperties;
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own DOM element, so the child determines the rendered tag.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * Sets the Switch size.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * The label for the Switch, describing its purpose.
   */
  label?: string;
}

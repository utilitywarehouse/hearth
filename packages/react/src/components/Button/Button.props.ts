import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const buttonPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export type ButtonProps = ComponentPropsWithout<'div', RemovedProps> & {
  /**
   * Sets the button height.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
};

import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export const spinnerPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export type SpinnerProps = ComponentPropsWithout<'div', RemovedProps> & {
  /**
   * Sets the button height.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
};

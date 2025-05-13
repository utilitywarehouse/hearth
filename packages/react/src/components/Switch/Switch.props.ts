import type { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const switchPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SwitchProps extends RadixSwitchProps {
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * The label for the Switch, describing its purpose.
   */
  label: string;
}

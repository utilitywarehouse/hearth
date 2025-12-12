import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';
import { MarginProps } from '../../props/margin.props';
import { Switch as SwitchPrimitive } from 'radix-ui';

const sizes = ['sm', 'md'] as const;

export const switchPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface SwitchProps
  extends React.ComponentPropsWithRef<typeof SwitchPrimitive.Switch>,
    MarginProps {
  size?: Responsive<(typeof sizes)[number]>;
  /**
   * The label for the Switch, describing its purpose.
   */
  label?: string;
}

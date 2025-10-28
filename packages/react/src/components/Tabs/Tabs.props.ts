import { Tabs as RadixTabs } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['md', 'lg'] as const;

export const tabsPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface TabsProps
  extends Omit<RadixTabs.TabsProps, 'asChild' | 'dir' | 'orientation' | keyof MarginProps>,
    MarginProps {
  /** Size variant */
  size?: Responsive<(typeof sizes)[number]>;
}

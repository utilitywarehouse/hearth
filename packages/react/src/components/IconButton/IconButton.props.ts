import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';
import { ButtonBaseProps } from '../ButtonBase/ButtonBase.props';

const sizes = ['sm', 'md'] as const;

export const iconButtonPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export type IconButtonProps = ButtonBaseProps & {
  /**
   * An accessibility label that describes the button.
   * Make sure this label reflects the visual icon.
   */
  label: string;
  /**
   * Sets the button height.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
};

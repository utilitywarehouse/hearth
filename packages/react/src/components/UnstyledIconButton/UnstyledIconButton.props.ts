import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';
import { IconButtonProps } from '../IconButton/IconButton.props';

const sizes = ['sm', 'md'] as const;

export const unstyledIconButtonPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export type UnstyledIconButtonProps = ComponentPropsWithout<'button', RemovedProps> &
  Pick<IconButtonProps, 'label' | 'loading' | 'asChild'> & {
    /**
     * Sets the button height.
     * @default md
     */
    size?: Responsive<(typeof sizes)[number]>;
    /** Inverts the component colours, for use on darker surface colours. */
    inverted?: boolean;
  };

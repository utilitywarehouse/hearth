import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

const variants = ['emphasis', 'solid', 'outline', 'ghost'] as const;

export const buttonBasePropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'solid' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export type ButtonBaseProps = ComponentPropsWithout<'button', RemovedProps> &
  (
    | {
        /**
         * Sets the button's visual variant
         */
        variant?: 'emphasis';
        /**
         * Sets the button's colour scheme
         */
        colorScheme?: 'yellow';
      }
    | {
        /**
         * Sets the button's visual variant
         */
        variant?: 'solid';
        /**
         * Sets the button's colour scheme
         */
        colorScheme?: 'yellow' | 'green' | 'red';
      }
    | {
        variant?: 'outline' | 'ghost';
        colorScheme?: 'grey' | 'green' | 'red';
      }
  ) & {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     */
    asChild?: boolean;
    /**
     * Indicate when the button is in a loading state, will also disable the button.
     */
    loading?: boolean;
    /** Inverts the component colours, for use on darker surface colours. */
    inverted?: boolean;
  };

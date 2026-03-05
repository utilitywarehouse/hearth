import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';

const variants = ['emphasis', 'solid', 'outline', 'ghost'] as const;

export const buttonBasePropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'solid' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export type ButtonBaseProps = ComponentPropsWithRef<'button'> &
  MarginProps &
  (
    | {
        /**
         * Sets the button's visual variant
         */
        variant?: 'emphasis';
        /**
         * Sets the button's colour scheme
         */
        colorScheme?: 'highlight';
      }
    | {
        /**
         * Sets the button's visual variant
         */
        variant?: 'solid';
        /**
         * Sets the button's colour scheme
         */
        colorScheme?: 'highlight' | 'affirmative' | 'destructive';
      }
    | {
        variant?: 'outline' | 'ghost';
        colorScheme?: 'functional' | 'affirmative' | 'destructive';
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

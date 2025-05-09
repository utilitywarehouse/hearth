import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { LinkProps } from '../Link/Link.props';

const variants = ['subtle', 'emphasis'] as const;

export const listPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export type ListProps = ComponentPropsWithout<'ul', RemovedProps> &
  (
    | {
        /**
         * Sets the visual variant of the list.
         * @default undefined
         */
        variant: undefined;
        colorScheme: undefined;
      }
    | {
        variant: (typeof variants)[number];
        /**
         * Sets the color scheme of the list.
         */
        colorScheme?: 'white' | 'warmWhite';
      }
  ) & {
    /**
     * The heading for the list, describing its purpose.
     */
    heading: string;
    headingElement: 'div' | 'h1' | 'h2' | 'h3' | 'h4';
    /**
     * Optional helper text to provide additional context or instructions.
     */
    helperText?: string;
    linkText?: string;
    href: LinkProps['href'];
  };

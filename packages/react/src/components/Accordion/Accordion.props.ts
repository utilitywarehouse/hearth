import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { ComponentPropsWithout } from '../../types/component-props';
import { ComponentProps } from 'react';

export type AccordionProps = ComponentPropsWithout<
  typeof RadixAccordion.Root,
  'orientation' | 'type'
> &
  Omit<SectionHeaderProps, 'headingElement'> & {
    type?: ComponentProps<typeof RadixAccordion.Root>['type'];
    /**
     * @default h2
     */
    headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  };

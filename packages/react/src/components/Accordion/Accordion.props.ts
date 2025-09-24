import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { ComponentProps } from 'react';

export type AccordionProps = Omit<ComponentProps<typeof RadixAccordion.Root>, 'orientation'> &
  Omit<SectionHeaderProps, 'headingElement'> & {
    /**
     * @default h2
     */
    headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
    collapsible?: RadixAccordion.AccordionSingleProps['collapsible'];
  };

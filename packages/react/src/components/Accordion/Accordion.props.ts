import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout } from '../../types/component-props';

export type AccordionProps = ComponentPropsWithout<
  typeof RadixAccordion.Root,
  'orientation' | 'asChild' | 'dir'
> &
  Omit<SectionHeaderProps, 'headingElement'> &
  MarginProps & {
    /**
     * @default h2
     */
    headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
    collapsible?: RadixAccordion.AccordionSingleProps['collapsible'];
  };

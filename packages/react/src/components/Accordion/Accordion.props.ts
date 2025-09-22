import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export type AccordionProps = Omit<React.ComponentProps<typeof RadixAccordion.Root>, 'orientation'> &
  SectionHeaderProps & {};

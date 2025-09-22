import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export type AccordionProps = Omit<
  RadixAccordion.AccordionSingleProps | RadixAccordion.AccordionMultipleProps,
  'orientation'
> &
  SectionHeaderProps & {};

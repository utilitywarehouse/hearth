import { Accordion as AccordionPrimitive } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { MarginProps } from '../../props/margin.props';

export interface AccordionProps
  extends Omit<
      React.ComponentPropsWithRef<typeof AccordionPrimitive.Root>,
      'orientation' | 'asChild' | 'dir'
    >,
    Omit<SectionHeaderProps, 'headingElement'>,
    MarginProps {
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  collapsible?: AccordionPrimitive.AccordionSingleProps['collapsible'];
}

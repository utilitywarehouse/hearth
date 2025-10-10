import { ComponentProps } from 'react';
import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { Responsive } from '../../types/responsive';

export interface DescriptionListProps
  extends ComponentPropsWithout<'dl', RemovedProps>,
    Omit<SectionHeaderProps, keyof ComponentProps<'dl'>>,
    MarginProps {
  direction?: Responsive<'row' | 'column'>;
}

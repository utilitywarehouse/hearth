import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { Responsive } from '../../types/responsive';

type ElementProps = ComponentPropsWithRef<'dl'>;

export interface DescriptionListProps
  extends ElementProps, Omit<SectionHeaderProps, keyof ElementProps>, MarginProps {
  direction?: Responsive<'row' | 'column'>;
}

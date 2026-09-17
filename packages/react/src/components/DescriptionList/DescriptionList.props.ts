import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { Responsive } from '../../types/responsive';
import { SizeProps } from '../../props/size.props';

type ElementProps = ComponentPropsWithRef<'dl'>;

export interface DescriptionListProps
  extends
    ElementProps,
    Omit<SectionHeaderProps, keyof ElementProps>,
    MarginProps,
    Pick<SizeProps, 'width' | 'maxWidth' | 'minWidth'> {
  /**
   * The layout direction of the `DescriptionListItem` children. Responsive —
   * can be set per breakpoint.
   */
  direction?: Responsive<'row' | 'column'>;
}

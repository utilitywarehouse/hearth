import { ComponentProps } from 'react';
import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export interface DescriptionListProps
  extends ComponentPropsWithout<'dl', RemovedProps>,
    Omit<SectionHeaderProps, keyof ComponentProps<'dl'>>,
    MarginProps {
  direction?: FlexProps['direction'];
}

import { Ref } from 'react';
import type { View, ViewProps } from 'react-native';
import BadgeProps from '../Badge/Badge.props';

interface SectionHeaderBaseProps extends Omit<ViewProps, 'children'> {
  ref?: Ref<View>;
}

export interface SectionHeaderWithChildren extends SectionHeaderBaseProps {
  children: ViewProps['children'];
  heading?: never;
  helperText?: never;
  trailingContent?: never;
  badge?: never;
  invalidText?: never;
}

export interface SectionHeaderWithoutChildren extends SectionHeaderBaseProps {
  children?: never;
  heading: string;
  helperText?: string;
  trailingContent?: React.ReactNode;
  badge?: BadgeProps;
  invalidText?: string;
}

type SectionHeaderProps = SectionHeaderWithChildren | SectionHeaderWithoutChildren;

export default SectionHeaderProps;

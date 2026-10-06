import { Ref } from 'react';
import type { View, ViewProps } from 'react-native';
import BadgeProps from '../Badge/Badge.props';

interface SectionHeaderBaseProps extends Omit<ViewProps, 'children'> {
  /** Forwarded ref to the underlying view. */
  ref?: Ref<View>;
}

export interface SectionHeaderWithChildren extends SectionHeaderBaseProps {
  /** Custom content rendered in place of the default heading, helper text, badge and trailing content. */
  children: ViewProps['children'];
  heading?: never;
  helperText?: never;
  trailingContent?: never;
  badge?: never;
  invalidText?: never;
}

export interface SectionHeaderWithoutChildren extends SectionHeaderBaseProps {
  children?: never;
  /** The text to display in the heading of the section. */
  heading: string;
  /** The helper text to display below the heading. */
  helperText?: string;
  /** Optional content to display on the right side. */
  trailingContent?: React.ReactNode;
  /** Optional badge to display next to the heading. */
  badge?: BadgeProps;
  /** The invalid text to be displayed below the helper text. */
  invalidText?: string;
}

type SectionHeaderProps = SectionHeaderWithChildren | SectionHeaderWithoutChildren;

export default SectionHeaderProps;

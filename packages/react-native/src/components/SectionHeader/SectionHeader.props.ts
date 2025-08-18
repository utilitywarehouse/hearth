import { ComponentType, Ref } from 'react';
import type { ViewProps, View } from 'react-native';

interface SectionHeaderBaseProps extends Omit<ViewProps, 'children'> {
  ref?: Ref<View>;
}

export interface SectionHeaderWithChildren extends SectionHeaderBaseProps {
  children: ViewProps['children'];
  heading?: never;
  helperText?: never;
  linkText?: never;
  linkHref?: never;
  linkOnPress?: never;
  linkTarget?: never;
  linkIcon?: never;
  linkIconPosition?: never;
  linkShowIcon?: never;
}

export interface SectionHeaderWithoutChildren extends SectionHeaderBaseProps {
  children?: never;
  heading: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  linkOnPress?: () => void;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  linkIcon?: ComponentType;
  linkIconPosition?: 'left' | 'right';
  linkShowIcon?: boolean;
}

type SectionHeaderProps = SectionHeaderWithChildren | SectionHeaderWithoutChildren;

export default SectionHeaderProps;

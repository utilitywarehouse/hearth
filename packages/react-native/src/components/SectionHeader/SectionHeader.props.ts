import { ComponentType, Ref } from 'react';
import type { ViewProps, View } from 'react-native';

interface SectionHeaderBaseProps extends Omit<ViewProps, 'children'> {
  ref?: Ref<View>;
}

export interface SectionHeaderWithChildren extends SectionHeaderBaseProps {
  children: ViewProps['children'];
  text?: never;
  helperText?: never;
  linkText?: never;
  linkHref?: never;
  linkOnPress?: never;
  linkTarget?: never;
  linkDisabled?: never;
  linkIcon?: never;
  linkIconPosition?: never;
  linkShowIcon?: never;
}

export interface SectionHeaderWithoutChildren extends SectionHeaderBaseProps {
  children?: never;
  text: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  linkOnPress?: () => void;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  linkDisabled?: boolean;
  linkIcon?: ComponentType;
  linkIconPosition?: 'left' | 'right';
  linkShowIcon?: boolean;
}

type SectionHeaderProps = SectionHeaderWithChildren | SectionHeaderWithoutChildren;

export default SectionHeaderProps;

import { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface ListHeadingBaseProps extends Omit<ViewProps, 'children'> {}

export interface ListHeadingWithChildren extends ListHeadingBaseProps {
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

export interface ListHeadingWithoutChildren extends ListHeadingBaseProps {
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

type ListHeadingProps = ListHeadingWithChildren | ListHeadingWithoutChildren;

export default ListHeadingProps;

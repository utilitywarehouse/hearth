import { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface AccordionHeadingBaseProps extends Omit<ViewProps, 'children'> {}

export interface AccordionHeadingWithChildren extends AccordionHeadingBaseProps {
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

export interface AccordionHeadingWithoutChildren extends AccordionHeadingBaseProps {
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

type AccordionHeadingProps = AccordionHeadingWithChildren | AccordionHeadingWithoutChildren;

export default AccordionHeadingProps;

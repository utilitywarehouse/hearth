import { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface AccordionHeadingBaseProps extends Omit<ViewProps, 'children'> {}

export interface AccordionHeadingWithChildren extends AccordionHeadingBaseProps {
  children: ViewProps['children'];
  text?: never;
  helperText?: never;
}

export interface AccordionHeadingWithoutChildren extends AccordionHeadingBaseProps {
  children?: never;
  text: string;
  helperText?: string;
}

type AccordionHeadingProps = AccordionHeadingWithChildren | AccordionHeadingWithoutChildren;

export default AccordionHeadingProps;

import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface DescriptionListItemProps extends ViewProps {
  /** Heading / label part */
  heading: ReactNode;
  /** Description / value part */
  description: ReactNode;
  headingWidth?: number;
  trailingContent?: ReactNode;
  invalidText?: string;
  numericValue?: string;
}

export default DescriptionListItemProps;

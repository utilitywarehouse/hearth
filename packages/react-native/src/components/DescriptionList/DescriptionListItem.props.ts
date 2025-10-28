import type { ComponentType, ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface DescriptionListItemProps extends ViewProps {
  /** Heading / label part */
  heading: ReactNode;
  /** Description / value part */
  description: ReactNode;
  headingWidth?: number;
  linkText?: string;
  linkHref?: string;
  linkIcon?: ComponentType;
  linkIconPosition?: 'left' | 'right';
  linkOnPress?: () => void;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  linkShowIcon?: boolean;
  invalidText?: string;
}

export default DescriptionListItemProps;

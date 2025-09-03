import { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export interface DescriptionListProps extends ViewProps {
  /** Direction orientation for items */
  direction?: 'row' | 'column';
  /** Override heading/term column width when layout is row (defaults to token) */
  itemHeadingWidth?: number;
  heading?: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  linkIcon?: ComponentType;
  linkIconPosition?: 'left' | 'right';
  linkOnPress?: () => void;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  linkShowIcon?: boolean;
}

export default DescriptionListProps;

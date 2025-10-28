import { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface ListProps extends ViewProps {
  container?: 'none' | 'subtleWhite' | 'emphasisWhite' | 'subtleWarmWhite' | 'emphasisWarmWhite';
  heading?: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  linkIcon?: ComponentType;
  linkIconPosition?: 'left' | 'right';
  linkOnPress?: () => void;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
  linkShowIcon?: boolean;
  disabled?: boolean;
  loading?: boolean;
  divider?: boolean;
}

export default ListProps;

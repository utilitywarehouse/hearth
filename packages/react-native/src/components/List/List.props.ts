import type { ViewProps } from 'react-native';
import { ComponentType } from 'react';

interface ListProps extends ViewProps {
  container?:
    | 'none'
    | 'subtle white'
    | 'emphasis white'
    | 'subtle warm white'
    | 'emphasis warm white';
  headingText?: string;
  headingSupportingText?: string;
  headingLinkText?: string;
  headingLinkHref?: string;
  linkOnPress?: () => void;
  headingLinkTarget?: '_blank' | '_self' | '_parent' | '_top';
  headingLinkDisabled?: boolean;
  headingLinkIcon?: ComponentType;
  headingLinkIconPosition?: 'left' | 'right';
  headingLinkShowIcon?: boolean;
  disabled?: boolean;
  loading?: boolean;
  divider?: boolean;
}

export default ListProps;

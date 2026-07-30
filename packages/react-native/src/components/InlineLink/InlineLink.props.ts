import { TextProps } from 'react-native';

export interface InlineLinkProps extends TextProps {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Defaults to `noopener noreferrer` when `target` is `_blank`. */
  rel?: string;
  inverted?: boolean;
  disabled?: boolean;
}

export default InlineLinkProps;

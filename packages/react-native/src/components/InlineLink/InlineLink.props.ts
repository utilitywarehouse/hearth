import { TextProps } from 'react-native';

export interface InlineLinkProps extends TextProps {
  /** The URL to navigate to. */
  href?: string;
  /** The target of the link.
   * @default '_self' */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Defaults to `noopener noreferrer` when `target` is `_blank`. */
  rel?: string;
  /** Invert the link colours for purple backgrounds. */
  inverted?: boolean;
  disabled?: boolean;
}

export default InlineLinkProps;

import { TextProps } from 'react-native';

export interface InlineLinkProps extends TextProps {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  inverted?: boolean;
  disabled?: boolean;
}

export default InlineLinkProps;

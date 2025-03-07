import type TextProps from '../BodyText/BodyText.props';

interface LabelProps extends TextProps {
  nested?: boolean;
  disabled?: boolean;
}

export default LabelProps;

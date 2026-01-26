import { BodyTextProps } from '../BodyText';

interface LabelProps extends Omit<BodyTextProps, 'size' | 'weight'> {
  nested?: boolean;
  disabled?: boolean;
  variant?: 'heading' | 'body';
}

export default LabelProps;

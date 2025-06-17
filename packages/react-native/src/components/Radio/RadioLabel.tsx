import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const RadioLabel = ({ children, ...props }: LabelProps) => {
  return (
    <Label nested {...props}>
      {children}
    </Label>
  );
};

RadioLabel.displayName = 'RadioLabel';

export default RadioLabel;

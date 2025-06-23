import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const CheckboxLabel = ({ children, ...props }: LabelProps) => {
  return (
    <Label nested {...props}>
      {children}
    </Label>
  );
};

CheckboxLabel.displayName = 'CheckboxLabel';

export default CheckboxLabel;

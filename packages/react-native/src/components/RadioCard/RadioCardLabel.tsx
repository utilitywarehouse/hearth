import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const RadioCardLabel = ({ children, ...props }: LabelProps) => <Label {...props}>{children}</Label>;

RadioCardLabel.displayName = 'RadioCardLabel';

export default RadioCardLabel;

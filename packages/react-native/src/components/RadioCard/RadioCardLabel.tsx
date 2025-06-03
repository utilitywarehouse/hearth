import React, { forwardRef } from 'react';
import { Text } from 'react-native';
import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const RadioCardLabel = forwardRef<Text, LabelProps>(({ children, ...props }, ref) => {
  return (
    <Label ref={ref} {...props}>
      {children}
    </Label>
  );
});

RadioCardLabel.displayName = 'RadioCardLabel';

export default RadioCardLabel;

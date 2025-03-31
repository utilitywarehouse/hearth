import React, { forwardRef } from 'react';
import { Text } from 'react-native';
import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const RadioLabel = forwardRef<Text, LabelProps>(({ children, ...props }, ref) => {
  return (
    <Label ref={ref} nested {...props}>
      {children}
    </Label>
  );
});

RadioLabel.displayName = 'RadioLabel';

export default RadioLabel;

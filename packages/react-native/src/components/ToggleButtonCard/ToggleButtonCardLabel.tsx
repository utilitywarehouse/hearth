import React, { forwardRef } from 'react';
import { Text } from 'react-native';
import { Label } from '../Label';
import LabelProps from '../Label/Label.props';

const ToggleButtonCardLabel = forwardRef<Text, LabelProps>(({ children, ...props }, ref) => {
  return (
    <Label ref={ref} {...props}>
      {children}
    </Label>
  );
});

ToggleButtonCardLabel.displayName = 'ToggleButtonCardLabel';

export default ToggleButtonCardLabel;

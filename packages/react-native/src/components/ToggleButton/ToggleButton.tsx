import React, { forwardRef } from 'react';
import type { ToggleButtonProps } from './ToggleButton.props';
import ToggleButtonTextComponent from './ToggleButtonText';
import ToggleButtonIconComponent from './ToggleButtonIcon';
import { createButton } from '@gluestack-ui/button';

import ToggleButtonRoot from './ToggleButtonRoot';
import { PressableRef } from '../../types';
import { View } from 'react-native';

const ToggleButtonComponent = createButton({
  Root: ToggleButtonRoot,
  Group: View,
  Icon: ToggleButtonIconComponent,
  Spinner: View,
  Text: ToggleButtonTextComponent,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof ToggleButtonRoot> & React.RefAttributes<View>
> & {
  Text: typeof ToggleButtonTextComponent;
  Icon: typeof ToggleButtonIconComponent;
  // Group and Spinner could also be added here if accessed, for completeness:
  // Group: React.ComponentType<React.ComponentProps<typeof View>>;
  // Spinner: React.ComponentType<React.ComponentProps<typeof View>>;
};

export const ToggleButtonText = ToggleButtonComponent.Text;
export const ToggleButtonIcon = ToggleButtonComponent.Icon;

ToggleButtonText.displayName = 'ToggleButtonText';
ToggleButtonIcon.displayName = 'ToggleButtonIcon';

const ToggleButton = forwardRef<PressableRef, ToggleButtonProps>(
  ({ text, toggled = false, onToggle, ...props }, ref) => {
    return (
      <ToggleButtonComponent ref={ref} toggled={toggled} onToggle={onToggle} {...props}>
        {toggled && <ToggleButtonIcon toggled={toggled} />}
        <ToggleButtonText toggled={toggled}>{text}</ToggleButtonText>
      </ToggleButtonComponent>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;

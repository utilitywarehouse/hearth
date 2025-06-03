import React, { forwardRef } from 'react';
import { Icon, IconProps } from '../../components/Icon';
import { IconRef } from '../../types';
import { useTheme } from '../../hooks';

export const AccordionIcon = forwardRef<IconRef, IconProps>(({ as, ...props }, ref) => {
  const { components } = useTheme();
  return <Icon ref={ref} as={as} color={components.icon.color} {...props} />;
});

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;

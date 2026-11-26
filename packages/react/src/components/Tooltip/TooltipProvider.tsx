import { Tooltip as TooltipPrimitive } from '@base-ui/react';
import type { TooltipProviderProps } from './TooltipProvider.props';

const COMPONENT_NAME = 'TooltipProvider';

const DELAY = 500;
const TIMEOUT = 300;

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider delay={DELAY} timeout={TIMEOUT}>
      {children}
    </TooltipPrimitive.Provider>
  );
};

TooltipProvider.displayName = COMPONENT_NAME;

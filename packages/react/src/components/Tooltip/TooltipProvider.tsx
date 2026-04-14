import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { TooltipProviderProps } from './TooltipProvider.props';

const COMPONENT_NAME = 'TooltipProvider';

const DELAY_DURATION = 500;
const SKIP_DELAY_DURATION = 300;

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={DELAY_DURATION}
      skipDelayDuration={SKIP_DELAY_DURATION}
      disableHoverableContent={false}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
};

TooltipProvider.displayName = COMPONENT_NAME;

'use client';

import { TooltipProvider } from '../Tooltip/TooltipProvider';
import type { HearthProviderProps } from './HearthProvider.props';

const COMPONENT_NAME = 'HearthProvider';

export const HearthProvider = ({ children }: HearthProviderProps) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

HearthProvider.displayName = COMPONENT_NAME;

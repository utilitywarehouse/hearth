import React, { useContext } from 'react';
import type BadgeProps from './Badge.props';

export const BadgeContext = React.createContext<{
  colorScheme?: BadgeProps['colorScheme'];
  variant?: BadgeProps['variant'];
}>({});

export const useBadgeContext = () => useContext(BadgeContext);

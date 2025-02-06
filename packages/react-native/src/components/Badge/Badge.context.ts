import React, { useContext } from 'react';
import type BadgeProps from './Badge.props';

export const BadgeContext = React.createContext<{
  colorScheme?: BadgeProps['colorScheme'];
}>({});

export const useBadgeContext = () => useContext(BadgeContext);

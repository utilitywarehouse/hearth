import React, { useContext } from 'react';
import type BadgeProps from './Badge.props';

export const BadgeContext = React.createContext<{
  colorScheme?: BadgeProps['colorScheme'];
  variant?: BadgeProps['variant'];
  flatBase?: BadgeProps['flatBase'];
  size?: BadgeProps['size'];
}>({});

export const useBadgeContext = () => useContext(BadgeContext);

import { createContext, useContext } from 'react';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';

export const UnstyledIconButtonContext = createContext<{
  disabled?: UnstyledIconButtonProps['disabled'];
  active?: boolean;
}>({});

export const useUnstyledIconButtonContext = () => useContext(UnstyledIconButtonContext);

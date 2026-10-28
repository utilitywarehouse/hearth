/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

const AccordionContext = createContext<{
  noPadding?: boolean;
  disabled?: boolean;
  divider?: boolean;
  contentNoPadding?: boolean;
  expandedValues?: string[];
  toggleItem?: (value: string, disabled?: boolean) => void;
}>({});

export const useAccordionContext = () => useContext(AccordionContext);

export default AccordionContext;

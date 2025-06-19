/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

const AccordionItemContext = createContext<{
  noPadding?: boolean;
  disabled?: boolean;
}>({});

export const useAccordionItemContext = () => useContext(AccordionItemContext);

export default AccordionItemContext;

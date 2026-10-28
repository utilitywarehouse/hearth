/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

const AccordionItemContext = createContext<{
  noPadding?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onPress?: () => void;
  triggerId?: string;
  contentId?: string;
}>({});

export const useAccordionItemContext = () => useContext(AccordionItemContext);

export default AccordionItemContext;

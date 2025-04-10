import { createContext, useContext } from 'react';

interface BottomSheetContextProps {
  handle?: boolean;
}

export const BottomSheetContext = createContext<BottomSheetContextProps>({});

export const useBottomSheetContext = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  return context;
};

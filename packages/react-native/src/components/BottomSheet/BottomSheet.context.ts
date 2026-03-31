import { createContext, useContext } from 'react';

interface BottomSheetContextProps {
  handle?: boolean;
  useSafeAreaInsets: boolean;
}

export const BottomSheetContext = createContext<BottomSheetContextProps>({
  useSafeAreaInsets: true,
});

export const useBottomSheetContext = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  return context;
};

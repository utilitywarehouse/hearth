import { BottomSheetModalProvider as GorhomBottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { BottomSheetModalProviderProps as GorhomBottomSheetModalProviderProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types';
import { useMemo } from 'react';
import { BottomSheetContext, useBottomSheetContext } from './BottomSheet.context';

export interface BottomSheetModalProviderProps extends GorhomBottomSheetModalProviderProps {
  useSafeAreaInsets?: boolean;
}

const BottomSheetModalProvider = ({
  children,
  useSafeAreaInsets = true,
  ...props
}: BottomSheetModalProviderProps) => {
  const parentContext = useBottomSheetContext();
  const value = useMemo(
    () => ({
      ...parentContext,
      useSafeAreaInsets,
    }),
    [parentContext, useSafeAreaInsets]
  );

  return (
    <GorhomBottomSheetModalProvider {...props}>
      <BottomSheetContext.Provider value={value}>{children}</BottomSheetContext.Provider>
    </GorhomBottomSheetModalProvider>
  );
};

BottomSheetModalProvider.displayName = 'BottomSheetModalProvider';

export default BottomSheetModalProvider;

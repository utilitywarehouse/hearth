import React, { useMemo } from 'react';
import { BottomSheetModal as BottomSheetModalCore } from '@gorhom/bottom-sheet';
import type BottomSheetProps from './BottomSheet.props';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import useBottomSheetLogic from './useBottomSheetLogic';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetModalCore = withUnistyles(BottomSheetModalCore);

type BottomSheetModal<T = any> = BottomSheetModalMethods<T>;

const BottomSheetModal = ({
  children,
  containerStyle,
  handleStyle,
  backdrop = true,
  showHandle = true,
  contentStyle,
  ref,
  ...rest
}: BottomSheetProps) => {
  const bottomSheetRef = React.useRef<BottomSheetModalMethods<any>>(null);

  const { renderBackdrop, renderHandle } = useBottomSheetLogic<BottomSheetModal>({
    // @ts-ignore
    ref,
    bottomSheetRef,
    backdrop,
    showHandle,
    handleStyle,
  });

  const value = useMemo(() => ({ handle: showHandle }), [showHandle]);

  return (
    <StyledBottomSheetModalCore
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      style={[styles.container, containerStyle]}
      backgroundStyle={styles.background}
      {...rest}
    >
      <BottomSheetContext.Provider value={value}>{children}</BottomSheetContext.Provider>
    </StyledBottomSheetModalCore>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  background: {
    borderTopLeftRadius: theme.components.bottomSheet.borderTopLeftRadius,
    borderTopRightRadius: theme.components.bottomSheet.borderTopRightRadius,
    backgroundColor: theme.components.bottomSheet.backgroundColor,
  },
}));

BottomSheetModal.displayName = 'BottomSheetModal';

export default BottomSheetModal;

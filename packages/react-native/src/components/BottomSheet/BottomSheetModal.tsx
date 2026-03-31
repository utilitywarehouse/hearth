import { BottomSheetModal as BottomSheetModalCore } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useMemo } from 'react';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { BottomSheetContext } from './BottomSheet.context';
import type BottomSheetProps from './BottomSheet.props';
import useBottomSheetLogic from './useBottomSheetLogic';

const StyledBottomSheetModalCore = withUnistyles(BottomSheetModalCore);

type BottomSheetModal<T = any> = BottomSheetModalMethods<T>;

const BottomSheetModal = ({
  children,
  containerStyle,
  handleStyle,
  backdrop = true,
  showHandle = true,
  ref,
  ...rest
}: BottomSheetProps) => {
  const bottomSheetRef = React.useRef<BottomSheetModalMethods<any>>(null);
  const parentContext = React.useContext(BottomSheetContext);

  const { renderBackdrop, renderHandle } = useBottomSheetLogic<BottomSheetModal>({
    // @ts-expect-error - ref
    ref,
    bottomSheetRef,
    backdrop,
    showHandle,
    handleStyle,
  });

  const value = useMemo(
    () => ({
      ...parentContext,
      handle: showHandle,
    }),
    [parentContext, showHandle]
  );

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
    backgroundColor: theme.color.surface.neutral.strong,
  },
}));

BottomSheetModal.displayName = 'BottomSheetModal';

export default BottomSheetModal;

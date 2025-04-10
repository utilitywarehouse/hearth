import React, { forwardRef, useMemo } from 'react';
import { BottomSheetModal as BottomSheetModalCore } from '@gorhom/bottom-sheet';
import type BottomSheetProps from './BottomSheet.props';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import useBottomSheetLogic from './useBottomSheetLogic';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetModalCore = withUnistyles(BottomSheetModalCore);

type BottomSheetModal<T = any> = BottomSheetModalMethods<T>;

const BottomSheetModal = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      children,
      containerStyle,
      handleStyle,
      backdrop = true,
      showHandle = true,
      contentStyle,
      ...rest
    },
    ref
  ) => {
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    const { renderBackdrop, renderHandle, wrappedChildren } = useBottomSheetLogic<BottomSheetModal>(
      {
        ref,
        bottomSheetRef,
        children,
        backdrop,
        showHandle,
        handleStyle,
        contentStyle,
        isModal: true,
      }
    );

    const value = useMemo(() => ({ handle: showHandle }), [showHandle]);

    return (
      <StyledBottomSheetModalCore
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        style={[styles.container, containerStyle]}
        backgroundStyle={styles.background}
        index={-1}
        {...rest}
      >
        <BottomSheetContext.Provider value={value}>{wrappedChildren}</BottomSheetContext.Provider>
      </StyledBottomSheetModalCore>
    );
  }
);

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

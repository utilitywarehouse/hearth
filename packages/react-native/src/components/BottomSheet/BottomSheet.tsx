import React, { useMemo } from 'react';
import BottomSheetCore, { BottomSheetProps as RootBottomSheetProps } from '@gorhom/bottom-sheet';
import type BottomSheetProps from './BottomSheet.props';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import useBottomSheetLogic from './useBottomSheetLogic';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetCore = withUnistyles(BottomSheetCore) as React.ForwardRefExoticComponent<
  RootBottomSheetProps & React.RefAttributes<BottomSheetMethods>
>;

type BottomSheet = BottomSheetMethods;

const BottomSheet = ({
  children,
  containerStyle,
  handleStyle,
  backdrop = true,
  showHandle = true,
  ref,
  ...rest
}: BottomSheetProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const { renderBackdrop, renderHandle } = useBottomSheetLogic<BottomSheet>({
    ref,
    bottomSheetRef,
    backdrop,
    showHandle,
    handleStyle,
  });

  const value = useMemo(() => ({ handle: showHandle }), [showHandle]);

  return (
    <StyledBottomSheetCore
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      style={[styles.container, containerStyle]}
      backgroundStyle={styles.background}
      {...rest}
    >
      <BottomSheetContext.Provider value={value}>{children}</BottomSheetContext.Provider>
    </StyledBottomSheetCore>
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

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

import React, { forwardRef } from 'react';
import { BottomSheetBackdrop as Backdrop } from '@gorhom/bottom-sheet';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const StyledBottomSheetBackdrop = withUnistyles(Backdrop);

const BottomSheetBackdrop = forwardRef<typeof Backdrop, BottomSheetDefaultBackdropProps>(
  ({ style, ...props }, ref) => {
    const theme = useTheme();
    return (
      <StyledBottomSheetBackdrop
        ref={ref}
        style={[styles.backdrop, style]}
        opacity={theme.components.overlay.opacity / 100}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create(theme => ({
  backdrop: {
    backgroundColor: theme.components.overlay.backgroundColor,
  },
}));

BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';

export default BottomSheetBackdrop;

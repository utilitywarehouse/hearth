import React, { forwardRef } from 'react';
import { BottomSheetView as View } from '@gorhom/bottom-sheet';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { useBottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetView = withUnistyles(View);

const BottomSheetView = forwardRef<typeof View, BottomSheetViewProps & { isModal?: boolean }>(
  ({ children, style, isModal, ...props }, ref) => {
    const { handle } = useBottomSheetContext();
    styles.useVariants({
      isModal,
      handle,
    });
    return (
      <StyledBottomSheetView ref={ref} style={[styles.contentContainer, style]} {...props}>
        {children}
      </StyledBottomSheetView>
    );
  }
);

const styles = StyleSheet.create((theme, rt) => ({
  contentContainer: {
    paddingHorizontal: theme.components.bottomSheet.padding,
    paddingBottom: theme.components.bottomSheet.padding,
    variants: {
      isModal: {
        true: {
          paddingBottom: theme.components.bottomSheet.padding + rt.insets.bottom,
        },
      },
      handle: {
        false: {
          paddingTop: theme.components.bottomSheet.padding,
        },
      },
    },
  },
}));

BottomSheetView.displayName = 'BottomSheetView';

export default BottomSheetView;

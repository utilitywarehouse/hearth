import React, { forwardRef, useContext } from 'react';
import { BottomSheetScrollView as ScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { BottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetScrollView = withUnistyles(ScrollView);

const BottomSheetScrollView = forwardRef<
  typeof ScrollView,
  BottomSheetScrollViewProps & { isModal?: boolean }
>(({ children, style, contentContainerStyle, isModal, ...props }, ref) => {
  const { handle } = useContext(BottomSheetContext);
  styles.useVariants({
    isModal,
    handle,
  });

  return (
    <StyledBottomSheetScrollView
      // @ts-ignore - ref
      ref={ref}
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...props}
    >
      {children}
    </StyledBottomSheetScrollView>
  );
});

const styles = StyleSheet.create((theme, rt) => ({
  container: {},
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

BottomSheetScrollView.displayName = 'BottomSheetScrollView';

export default BottomSheetScrollView;

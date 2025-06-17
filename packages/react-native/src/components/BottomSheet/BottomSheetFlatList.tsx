import React from 'react';
import { BottomSheetFlatList as FlatList } from '@gorhom/bottom-sheet';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { useBottomSheetContext } from './BottomSheet.context';
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

const StyledBottomSheetFlatList = withUnistyles(FlatList);

const BottomSheetFlatList = ({
  children,
  style,
  contentContainerStyle,
  isModal = true,
  ...props
}: BottomSheetFlatListProps<any> & { isModal?: boolean }) => {
  const { handle } = useBottomSheetContext();
  styles.useVariants({
    isModal,
    handle,
  });

  return (
    <StyledBottomSheetFlatList
      // @ts-expect-error - style
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...props}
    />
  );
};

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

BottomSheetFlatList.displayName = 'BottomSheetFlatList';

export default BottomSheetFlatList;

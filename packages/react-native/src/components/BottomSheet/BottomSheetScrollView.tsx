import { BottomSheetScrollView as ScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { useBottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetScrollView = withUnistyles(
  ScrollView
) as React.ForwardRefExoticComponent<BottomSheetScrollViewProps>;

const BottomSheetScrollView = ({
  children,
  style,
  contentContainerStyle,
  isModal = true,
  ...props
}: BottomSheetScrollViewProps & { isModal?: boolean }) => {
  const { handle, useSafeAreaInsets } = useBottomSheetContext();
  styles.useVariants({
    isModal,
    handle,
    useSafeAreaInsets,
  });

  return (
    <StyledBottomSheetScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...props}
    >
      {children}
    </StyledBottomSheetScrollView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.color.surface.neutral.strong,
    borderTopLeftRadius: theme.components.bottomSheet.borderTopLeftRadius,
    borderTopRightRadius: theme.components.bottomSheet.borderTopRightRadius,
  },
  contentContainer: {
    paddingHorizontal: theme.components.bottomSheet.padding,
    paddingBottom: theme.components.bottomSheet.padding,
    variants: {
      isModal: {
        true: {
          paddingBottom: theme.components.bottomSheet.padding,
        },
      },
      handle: {
        false: {
          paddingTop: theme.components.bottomSheet.padding,
        },
      },
      useSafeAreaInsets: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        isModal: true,
        useSafeAreaInsets: true,
        styles: {
          paddingBottom: theme.components.bottomSheet.padding + rt.insets.bottom,
        },
      },
    ],
  },
}));

BottomSheetScrollView.displayName = 'BottomSheetScrollView';

export default BottomSheetScrollView;

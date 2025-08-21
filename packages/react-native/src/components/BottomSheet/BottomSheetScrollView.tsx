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
  const { handle } = useBottomSheetContext();
  styles.useVariants({
    isModal,
    handle,
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
  },
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

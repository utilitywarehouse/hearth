import { BottomSheetView as View } from '@gorhom/bottom-sheet';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { useBottomSheetContext } from './BottomSheet.context';

const StyledBottomSheetView = withUnistyles(View) as React.ForwardRefExoticComponent<
  BottomSheetViewProps & React.RefAttributes<typeof View>
>;

const BottomSheetView = ({
  children,
  style,
  isModal = true,
  ...props
}: BottomSheetViewProps & { isModal?: boolean }) => {
  const { handle } = useBottomSheetContext();
  styles.useVariants({
    isModal,
    handle,
  });
  return (
    <StyledBottomSheetView style={[styles.contentContainer, style]} {...props}>
      {children}
    </StyledBottomSheetView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  contentContainer: {
    borderTopLeftRadius: theme.components.bottomSheet.borderTopLeftRadius,
    borderTopRightRadius: theme.components.bottomSheet.borderTopRightRadius,
    backgroundColor: theme.color.surface.neutral.strong,
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

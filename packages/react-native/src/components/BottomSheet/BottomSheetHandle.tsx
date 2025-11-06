import { BottomSheetHandle as Handle } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultHandleProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetHandle/types';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

const StyledBottomSheetHandle = withUnistyles(Handle);

const BottomSheetHandle = ({ style, indicatorStyle, ...props }: BottomSheetDefaultHandleProps) => {
  return (
    <StyledBottomSheetHandle
      // @ts-expect-error - style prop type issue
      style={[styles.handle, style]}
      indicatorStyle={[styles.indicator, indicatorStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  handle: {
    backgroundColor: theme.color.surface.neutral.strong,
    borderTopLeftRadius: theme.components.bottomSheet.borderTopLeftRadius,
    borderTopRightRadius: theme.components.bottomSheet.borderTopRightRadius,
    paddingTop: theme.components.bottomSheet.padding,
    paddingHorizontal: theme.components.bottomSheet.padding,
    paddingBottom: theme.components.bottomSheet.gap,
  },
  indicator: {
    width: theme.components.bottomSheet.handle.width,
    height: theme.components.bottomSheet.handle.height,
    backgroundColor: theme.components.bottomSheet.handle.backgroundColor,
    borderRadius: theme.components.bottomSheet.handle.borderRadius,
  },
}));

BottomSheetHandle.displayName = 'BottomSheetHandle';

export default BottomSheetHandle;

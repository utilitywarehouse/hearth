import { BottomSheetHandle as Handle } from '@gorhom/bottom-sheet';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { BottomSheetDefaultHandleProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetHandle/types';

const StyledBottomSheetHandle = withUnistyles(Handle);

const BottomSheetHandle = ({ style, indicatorStyle, ...props }: BottomSheetDefaultHandleProps) => {
  return (
    <StyledBottomSheetHandle
      // @ts-ignore - style
      style={[styles.handle, style]}
      indicatorStyle={[styles.indicator, indicatorStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  handle: {
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

import { BottomSheetHandle as Handle } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultHandleProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetHandle/types';
import { Platform, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

const StyledBottomSheetHandle = withUnistyles(Handle);

const BottomSheetHandle = ({ style, indicatorStyle, ...props }: BottomSheetDefaultHandleProps) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.handle, style]}>
        <View style={[styles.indicator, indicatorStyle]} />
      </View>
    );
  }
  return (
    <StyledBottomSheetHandle
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
    _web: {
      alignItems: 'center',
      cursor: 'grab',
    },
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

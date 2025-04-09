import React, { forwardRef, useCallback, useMemo, useImperativeHandle } from 'react';
import BottomSheetCore, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
} from '@gorhom/bottom-sheet';
import type BottomSheetProps from './BottomSheet.props';
import { useTheme } from '../../hooks';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

const StyledBottomSheetView = withUnistyles(BottomSheetView);
const StyledBottomSheetHandle = withUnistyles(BottomSheetHandle);
const StyledBottomSheetBackdrop = withUnistyles(BottomSheetBackdrop);
const StyledBottomSheetCore = withUnistyles(BottomSheetCore);

const BottomSheet = forwardRef<BottomSheetCore, BottomSheetProps>(
  (
    {
      children,
      containerStyle,
      handleStyle,
      backdrop = true,
      showHandle = true,
      snapPoints: userSnapPoints,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    // Backdrop component
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => {
        if (backdrop === false) return null;

        if (backdrop === true) {
          return (
            <StyledBottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              opacity={theme.components.overlay.opacity / 100}
              style={[styles.backdrop, props.style]}
            />
          );
        }

        // Custom backdrop component provided by the user
        return backdrop(props);
      },
      [backdrop]
    );

    // Handle component
    const renderHandle = useCallback(
      (props: BottomSheetHandleProps) => {
        if (!showHandle) return null;

        return (
          <StyledBottomSheetHandle
            {...props}
            style={[styles.handle, handleStyle]}
            indicatorStyle={styles.indicator}
          />
        );
      },
      [showHandle, handleStyle]
    );

    // Forward ref methods to parent component
    useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetCore);

    // Create ref for the bottom sheet
    const bottomSheetRef = React.useRef<BottomSheetCore>(null);

    return (
      <StyledBottomSheetCore
        ref={bottomSheetRef}
        index={-1}
        snapPoints={userSnapPoints}
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        style={[styles.container, containerStyle]}
        backgroundStyle={styles.background}
        {...rest}
      >
        <StyledBottomSheetView style={styles.contentContainer}>{children}</StyledBottomSheetView>
      </StyledBottomSheetCore>
    );
  }
);

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: theme.components.overlay.color,
  },
  background: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 15,
  },
  handle: {},
  contentContainer: {
    padding: 20,
  },
  indicator: {
    width: 20,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
  },
}));

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

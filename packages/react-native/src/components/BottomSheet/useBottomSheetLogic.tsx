import React, { useCallback, useImperativeHandle, RefObject, FC } from 'react';
import { BottomSheetBackdropProps, BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';
import { ViewStyle } from 'react-native';

interface UseBottomSheetLogicProps<T = any> {
  ref?: React.Ref<T> | null;
  bottomSheetRef: RefObject<T | null>;
  backdrop: boolean | FC<BottomSheetBackdropProps>;
  showHandle: boolean;
  handleStyle?: ViewStyle;
}

const useBottomSheetLogic = <T = any,>(props: UseBottomSheetLogicProps<T>) => {
  const { ref, bottomSheetRef, backdrop, showHandle, handleStyle } = props;

  // Backdrop component
  const renderBackdrop = useCallback(
    (backDropProps: BottomSheetBackdropProps) => {
      if (backdrop === false) return null;

      if (backdrop === true) {
        return <BottomSheetBackdrop {...backDropProps} />;
      }

      // Custom backdrop component provided by the user
      return backdrop(backDropProps);
    },
    [backdrop]
  );

  // Handle component
  const renderHandle = useCallback(
    (handleProps: BottomSheetHandleProps) => {
      if (!showHandle) return null;

      return <BottomSheetHandle {...handleProps} />;
    },
    [showHandle, handleStyle]
  );

  // Forward ref methods to parent component
  useImperativeHandle(ref, () => bottomSheetRef.current as T);

  return {
    renderBackdrop,
    renderHandle,
  };
};

export default useBottomSheetLogic;

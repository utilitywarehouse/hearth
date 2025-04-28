import React, { useCallback, useImperativeHandle, RefObject } from 'react';
import { BottomSheetBackdropProps, BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import hasChildrenByDisplayName from '../../utils/hasChildrenByDisplayName';
import BottomSheetView from './BottomSheetView';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

interface UseBottomSheetLogicProps<T = any> {
  ref: React.Ref<T>;
  bottomSheetRef: RefObject<T>;
  backdrop: boolean | ((props: BottomSheetBackdropProps) => ReactNode);
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

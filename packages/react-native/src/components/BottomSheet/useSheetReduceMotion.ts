import { ReduceMotion } from 'react-native-reanimated';
import { useReducedMotionEnabled } from '../../hooks/useReducedMotionEnabled';

/**
 * Value for Gorhom's `overrideReduceMotion` prop. Gorhom reads the system setting itself, so it
 * never sees the `ReducedMotionOverride` context; pass the resolved value so both agree.
 */
export const useSheetReduceMotion = () =>
  useReducedMotionEnabled() ? ReduceMotion.Always : ReduceMotion.Never;

import { createContext, useContext } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

const ReducedMotionOverrideContext = createContext<boolean | undefined>(undefined);

/**
 * Internal. Forces `useReducedMotionEnabled` to a fixed value for everything below it. Used by
 * the visual test decorator so captures don't depend on the device's Reduce Motion setting.
 */
export const ReducedMotionOverride = ReducedMotionOverrideContext.Provider;

/**
 * Whether animated components should skip their animation. Returns the `ReducedMotionOverride`
 * value when one is set, otherwise the system Reduce Motion setting from Reanimated.
 *
 * Reanimated's `useReducedMotion` reads the system setting once at app start and ignores
 * `ReducedMotionConfig`, so it can't be overridden without this context.
 */
export const useReducedMotionEnabled = () => {
  const override = useContext(ReducedMotionOverrideContext);
  const isSystemReducedMotion = useReducedMotion();
  return override ?? isSystemReducedMotion;
};

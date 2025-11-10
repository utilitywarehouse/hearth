import { useCallback } from 'react';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

const useColorMode = () => {
  const { theme } = useUnistyles();

  const setColorModeWrapper = useCallback(
    (mode: 'light' | 'dark') => {
      if (mode === theme.colorMode) return;
      UnistylesRuntime.setTheme(mode);
    },
    [theme.colorMode]
  );

  return [theme.colorMode, setColorModeWrapper] as const;
};

export default useColorMode;

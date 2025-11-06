import { useCallback, useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

const useColorMode = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(
    UnistylesRuntime.themeName as 'light' | 'dark'
  );

  const setColorModeWrapper = useCallback(
    (mode: 'light' | 'dark') => {
      if (mode === colorMode) return;
      UnistylesRuntime.setTheme(mode);
      setColorMode(mode);
    },
    [colorMode]
  );

  return [colorMode, setColorModeWrapper] as const;
};

export default useColorMode;

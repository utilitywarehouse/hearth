import { UnistylesThemes, useUnistyles } from 'react-native-unistyles';

const useTheme = () => {
  const { theme } = useUnistyles();
  return theme as UnistylesThemes['light'] | UnistylesThemes['dark'];
};

export default useTheme;

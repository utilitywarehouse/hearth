import { useUnistyles } from 'react-native-unistyles';
import { AppThemes } from '../types';

const useTheme = () => {
  const { theme } = useUnistyles();
  return theme as AppThemes['light'] | AppThemes['dark'];
};

export default useTheme;

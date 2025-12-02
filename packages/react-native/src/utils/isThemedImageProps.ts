import { ImageProps } from 'react-native';
import { ThemedImageProps } from 'src/components';

const isThemedImageProps = (props: ThemedImageProps | ImageProps): props is ThemedImageProps => {
  return 'light' in props && 'dark' in props;
};

export default isThemedImageProps;

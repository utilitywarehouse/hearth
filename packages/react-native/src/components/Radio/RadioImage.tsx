import { Image, ImageProps } from 'react-native';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

const RadioImage = ({ ...props }: ImageProps | ThemedImageProps) => {
  if (isThemedImageProps(props)) {
    return <ThemedImage {...props} />;
  }
  return <Image {...props} />;
};

RadioImage.displayName = 'RadioImage';

export default RadioImage;

import { Image, ImageProps } from 'react-native';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

const CheckboxImage = ({ ...props }: ImageProps | ThemedImageProps) => {
  if (isThemedImageProps(props)) {
    return <ThemedImage {...props} />;
  }
  return <Image {...props} />;
};

CheckboxImage.displayName = 'CheckboxImage';

export default CheckboxImage;

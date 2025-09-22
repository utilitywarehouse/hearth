import { Image, ImageProps } from 'react-native';

const CheckboxImage = ({ source, style, ...props }: ImageProps) => (
  <Image source={source} style={style} {...props} />
);

CheckboxImage.displayName = 'CheckboxImage';

export default CheckboxImage;

import { Image, ImageProps } from 'react-native';

const RadioImage = ({ source, style, ...props }: ImageProps) => (
  <Image source={source} style={style} {...props} />
);

RadioImage.displayName = 'RadioImage';

export default RadioImage;

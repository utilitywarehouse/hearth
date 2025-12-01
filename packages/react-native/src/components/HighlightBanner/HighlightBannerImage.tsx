import { Image, ImageProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

const HighlightBannerImage = (props: ImageProps | ThemedImageProps) => {
  if (isThemedImageProps(props)) {
    return <ThemedImage {...props} style={[styles.image, props.style]} />;
  }
  return <Image resizeMode="cover" {...props} style={[styles.image, props.style]} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default HighlightBannerImage;

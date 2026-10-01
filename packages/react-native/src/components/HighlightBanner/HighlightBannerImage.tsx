import { Image, ImageProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

/**
 * Use HighlightBannerImage to render the image inside a HighlightBanner. Pass either standard
 * `Image` props, or `light`/`dark` sources to render a theme-aware image.
 */
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

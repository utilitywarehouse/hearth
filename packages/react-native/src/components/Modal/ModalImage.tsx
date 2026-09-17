import { Image, ImageProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

/** Use ModalImage to display an image within a `Modal`, with support for separate light and dark mode sources via `ThemedImage`. */
const ModalImage = (props: ImageProps | ThemedImageProps) => {
  if (isThemedImageProps(props)) {
    return <ThemedImage {...props} style={[styles.image, props.style]} />;
  }
  return <Image resizeMode="cover" {...props} style={[styles.image, props.style]} />;
};

const styles = StyleSheet.create({
  image: {
    width: 260,
    height: 260,
  },
});

export default ModalImage;

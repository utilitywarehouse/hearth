import { Image, ImageProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';
import { useBannerContext } from './Banner.context';

const BannerIllustration = (props: ImageProps | ThemedImageProps) => {
  const { direction } = useBannerContext();
  styles.useVariants({ direction });
  if (isThemedImageProps(props)) {
    return (
      <View style={[styles.media, styles.imageWrapper]}>
        <ThemedImage {...props} style={[styles.image, props.style]} />
      </View>
    );
  }
  return (
    <View style={[styles.media, styles.imageWrapper]}>
      <Image {...props} style={[styles.image, props.style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flexShrink: 0,
    variants: {
      direction: {
        horizontal: {},
        vertical: {
          alignSelf: 'center',
        },
      },
    },
  },
  imageWrapper: {
    flexDirection: 'row',
    variants: {
      direction: {
        horizontal: {},
        vertical: {},
      },
    },
  },
  image: {
    variants: {
      direction: {
        horizontal: { width: 160, height: 95 },
        vertical: {
          width: '100%',
          height: 160,
        },
      },
    },
  },
});

export default BannerIllustration;

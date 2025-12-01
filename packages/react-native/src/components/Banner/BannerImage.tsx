import { Image, ImageProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isThemedImageProps } from '../../utils';
import { ThemedImage, ThemedImageProps } from '../ThemedImage';

const BannerImage = (props: ImageProps | ThemedImageProps) => {
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

const styles = StyleSheet.create(theme => ({
  media: {
    flexShrink: 0,
    variants: {
      direction: {
        horizontal: {},
        vertical: {
          alignSelf: 'flex-start',
        },
      },
    },
  },
  imageWrapper: {
    flexDirection: 'row',
    variants: {
      direction: {
        horizontal: {},
        vertical: {
          width: '100%',
        },
      },
    },
  },
  image: {
    borderRadius: theme.borderRadius.md,
    borderColor: theme.color.border.strong,
    borderWidth: theme.borderWidth[1],
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
}));

export default BannerImage;

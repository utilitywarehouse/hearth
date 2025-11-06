import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';
import { useCardContext } from '../Card.context';
import type CardHighlightBannerProps from './CardHighlightBanner.props';

const CardHighlightBanner = ({
  heading,
  headingColor,
  image,
  imageContainerHeight,
  description,
  link,
  button,
  style,
  ...props
}: CardHighlightBannerProps) => {
  const { variant } = useCardContext();
  styles.useVariants({ headingColor, variant });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.header]}>
        <BodyText size="md" textAlign="center" weight="semibold">
          {heading}
        </BodyText>
      </View>
      <View style={styles.imageContainer(imageContainerHeight)}>
        <Image resizeMode="cover" {...image} style={[styles.image, image?.style]} />
      </View>
      <View style={styles.footer}>
        <BodyText size="md" textAlign="center">
          {description}
        </BodyText>
        {link && <View style={styles.linkContainer}>{link}</View>}
        {button && <View style={styles.buttonContainer}>{button}</View>}
      </View>
    </View>
  );
};

CardHighlightBanner.displayName = 'CardHighlightBanner';

const styles = StyleSheet.create(theme => ({
  container: {
    overflow: 'hidden',
    flex: 1,
    width: '100%',
  },
  header: {
    padding: theme.components.banner.highlight.padding,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      headingColor: {
        highlight: {
          backgroundColor: theme.color.surface.highlight.subtle,
        },
        pig: {
          backgroundColor: theme.color.surface.pig.subtle,
        },
        energy: {
          backgroundColor: theme.color.surface.energy.subtle,
        },
        broadband: {
          backgroundColor: theme.color.surface.broadband.subtle,
        },
        mobile: {
          backgroundColor: theme.color.surface.mobile.subtle,
        },
        insurance: {
          backgroundColor: theme.color.surface.insurance.subtle,
        },
        cashback: {
          backgroundColor: theme.color.surface.cashback.subtle,
        },
      },
      variant: {
        emphasis: {
          borderColor: theme.color.border.strong,
          borderBottomWidth: theme.borderWidth[2],
        },
        subtle: {
          borderColor: theme.color.border.subtle,
        },
      },
    },
  },
  imageContainer: (height: number = 200) => ({
    width: '100%',
    height,
  }),
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: theme.components.banner.highlight.padding,
    gap: theme.components.banner.highlight.content.gap,
    variants: {
      variant: {
        emphasis: {
          borderColor: theme.color.border.strong,
          borderTopWidth: theme.borderWidth[2],
        },
        subtle: {
          borderColor: theme.color.border.subtle,
        },
      },
    },
  },
  linkContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'stretch',
  },
}));

export default CardHighlightBanner;

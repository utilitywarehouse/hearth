import { ChevronRightSmallIcon, CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { IconContainer } from '../IconContainer';
import { ThemedImage } from '../ThemedImage';
import { UnstyledIconButton } from '../UnstyledIconButton';
import type BannerProps from './Banner.props';

const Banner = ({
  icon,
  iconContainerVariant = 'subtle',
  iconContainerSize = 'md',
  iconContainerColor = 'pig',
  illustration,
  image,
  heading,
  description,
  direction = 'horizontal',
  link,
  button,
  onPress,
  onClose,
  variant = 'subtle',
  colorScheme = 'pig',
  style,
  ...props
}: BannerProps) => {
  const hasIllustration = Boolean(illustration);
  styles.useVariants({ direction, hasIllustration, variant });

  const renderIconOrImage = () => {
    if (icon) {
      return (
        <IconContainer
          icon={icon}
          variant={iconContainerVariant}
          size={iconContainerSize}
          color={iconContainerColor}
          style={styles.media}
        />
      );
    }
    if (illustration) {
      return (
        <ThemedImage
          {...illustration}
          resizeMode="cover"
          style={[styles.media, styles.imageWrapper, illustration.style]}
        />
      );
    }
    if (image) {
      return (
        <View style={[styles.media, styles.imageWrapper]}>
          <ThemedImage {...image} style={[styles.image, image.style]} />
        </View>
      );
    }
    return null;
  };

  const renderAction = () => {
    if (link) {
      return <View style={styles.action}>{link}</View>;
    }
    if (button) {
      return <View style={styles.action}>{button}</View>;
    }
    return null;
  };

  const content = (
    <View style={styles.container}>
      {renderIconOrImage()}
      <View style={styles.contentContainer}>
        <View style={styles.contentTextContainer}>
          <View style={styles.textContainer}>
            <Heading
              size="sm"
              style={styles.heading}
              textAlign={hasIllustration && direction === 'vertical' ? 'center' : 'left'}
            >
              {heading}
            </Heading>
            <BodyText
              size="md"
              style={styles.description}
              textAlign={hasIllustration && direction === 'vertical' ? 'center' : 'left'}
            >
              {description}
            </BodyText>
          </View>

          {renderAction()}
        </View>
        {onPress && (
          <UnstyledIconButton
            icon={ChevronRightSmallIcon}
            size="sm"
            onPress={onPress}
            style={styles.chevron}
          />
        )}
        {onClose && (
          <UnstyledIconButton
            icon={CloseSmallIcon}
            size="sm"
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Close banner"
          />
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Card variant={variant} style={[styles.card, style]} {...props}>
        <Pressable onPress={onPress} accessibilityRole="button" style={styles.pressable}>
          {content}
        </Pressable>
      </Card>
    );
  }

  return (
    <Card variant={variant} style={[styles.card, style]} {...props}>
      {content}
    </Card>
  );
};

Banner.displayName = 'Banner';

const styles = StyleSheet.create(theme => ({
  card: {},
  pressable: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    gap: theme.space.lg,
    variants: {
      direction: {
        horizontal: {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        vertical: {
          flexDirection: 'column',
          alignItems: 'stretch',
        },
      },
      hasIllustration: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        direction: 'vertical',
        hasIllustration: false,
        styles: {
          alignItems: 'flex-start',
        },
      },
      {
        direction: 'vertical',
        hasIllustration: true,
        styles: {
          alignItems: 'center',
        },
      },
    ],
  },
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
    variants: {
      direction: {
        horizontal: { width: 160, height: 95 },
        vertical: {
          width: '100%',
          height: 160,
        },
      },
      variant: {
        emphasis: {
          borderColor: theme.color.border.strong,
          borderWidth: theme.borderWidth[2],
        },
        subtle: {
          borderColor: theme.color.border.subtle,
          borderWidth: theme.borderWidth[1],
        },
      },
    },
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.space.lg,
    variants: {
      direction: {
        horizontal: {
          flex: 1,
          flexDirection: 'row',
        },
        vertical: {
          flexDirection: 'column',
        },
      },
    },
  },
  textContainer: {
    gap: theme.space.sm,
  },
  contentTextContainer: {
    gap: theme.space.lg,
    variants: {
      direction: {
        horizontal: {
          flex: 1,
        },
        vertical: {},
      },
    },
  },
  heading: {
    compoundVariants: [
      {
        direction: 'vertical',
        hasIllustration: true,
        styles: {
          textAlign: 'center',
        },
      },
    ],
  },
  description: {
    compoundVariants: [
      {
        direction: 'vertical',
        hasIllustration: true,
        styles: {
          textAlign: 'center',
        },
      },
    ],
  },
  action: {
    alignSelf: 'flex-start',
  },
  chevron: {
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
}));

export default Banner;

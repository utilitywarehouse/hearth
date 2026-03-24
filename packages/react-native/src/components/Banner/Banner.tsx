import { ChevronRightSmallIcon, CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { IconContainer } from '../IconContainer';
import { UnstyledIconButton } from '../UnstyledIconButton';
import BannerContext from './Banner.context';
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
  style,
  ...props
}: BannerProps) => {
  const hasIllustration = Boolean(illustration);
  styles.useVariants({ direction, hasIllustration, isPressable: Boolean(onPress) });

  const context = useMemo(
    () => ({
      direction,
    }),
    [direction]
  );

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
      return illustration;
    }
    if (image) {
      return image;
    }
    return null;
  };

  const renderAction = () => {
    if (link) {
      return <View style={styles.action}>{link}</View>;
    }
    if (button) {
      return (
        <View style={[styles.action, styles.buttonWrap]}>
          <View style={styles.buttonInner}>{button}</View>
        </View>
      );
    }
    return null;
  };

  const content = (
    <View style={styles.container}>
      {onClose && direction === 'vertical' && (
        <UnstyledIconButton
          icon={CloseSmallIcon}
          size="sm"
          onPress={onClose}
          style={styles.closeButton}
          accessibilityLabel="Close banner"
        />
      )}
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
        {onClose && direction === 'horizontal' && (
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
      <BannerContext.Provider value={context}>
        <Card variant={variant} style={[styles.card, style]} {...props}>
          <Pressable onPress={onPress} accessibilityRole="button" style={styles.pressable}>
            {content}
          </Pressable>
        </Card>
      </BannerContext.Provider>
    );
  }

  return (
    <BannerContext.Provider value={context}>
      <Card variant={variant} style={[styles.card, style]} {...props}>
        {content}
      </Card>
    </BannerContext.Provider>
  );
};

Banner.displayName = 'Banner';

const styles = StyleSheet.create(theme => ({
  card: { flexDirection: 'row', _web: { flexDirection: 'column' } },
  pressable: {
    flex: 1,
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
      isPressable: {
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
      {
        direction: 'horizontal',
        isPressable: false,
        styles: {
          flex: 1,
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
        horizontal: {},
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
  buttonWrap: {
    variants: {
      direction: {
        horizontal: {},
        vertical: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
        },
      },
    },
  },
  buttonInner: {
    variants: {
      direction: {
        horizontal: {},
        vertical: {
          flex: 1,
        },
      },
    },
  },
  chevron: {
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    variants: {
      direction: {
        vertical: {
          position: 'absolute',
          top: 0,
          right: 0,
        },
        horizontal: {},
      },
    },
  },
}));

export default Banner;

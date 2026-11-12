import { useContext } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CarouselContext from './Carousel.context';
import { CarouselControlsItemProps } from './Carousel.props';

const CarouselControlItem = ({
  active,
  style,
  index,
  activeStyle,
  onPress,
  disabled,
  ...props
}: CarouselControlsItemProps) => {
  const { inverted, numItems } = useContext(CarouselContext);
  styles.useVariants({ active, inverted });
  return (
    <Pressable
      style={[styles.item, active && activeStyle]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={`Page ${index + 1} of ${numItems}`}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active, disabled: !!disabled }}
      // react-native-web ignores `accessibilityState`, and `aria-selected` is not valid on a
      // button, so mark the current page with `aria-current` on web.
      {...(Platform.OS === 'web'
        ? ({ 'aria-current': active ? 'true' : undefined } as object)
        : null)}
      {...props}
    >
      <View style={[styles.circle, style]} />
    </Pressable>
  );
};

CarouselControlItem.displayName = 'CarouselControlItem';

const styles = StyleSheet.create(theme => ({
  item: {
    width: theme.components.icon.md.width,
    height: theme.components.icon.md.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: theme.components.carouselControl.size,
    height: theme.components.carouselControl.size,
    borderRadius: theme.borderRadius.full,
    borderColor: theme.color.interactive.functional.border.subtle,
    borderWidth: theme.borderWidth[2],
    backgroundColor: 'transparent',
    paddingTop: theme.space['100'],
    overflow: 'hidden',
    _hover: {
      backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
    },
    variants: {
      active: {
        true: {
          backgroundColor: theme.color.interactive.functional.foreground.subtle,
          _hover: {
            backgroundColor: theme.color.interactive.functional.foreground.subtle,
          },
        },
      },
      inverted: {
        true: {
          borderColor: theme.color.interactive.functional.border.inverted,
          _hover: {
            backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.hover,
          },
        },
      },
    },
    compoundVariants: [
      {
        active: true,
        inverted: true,
        styles: {
          backgroundColor: theme.color.interactive.functional.foreground.inverted,
        },
      },
    ],
  },
}));

export default CarouselControlItem;

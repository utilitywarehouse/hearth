import { createPressable } from '@gluestack-ui/pressable';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { CarouselControlsItemProps } from './Carousel.props';

export const CarouselControlItemRoot = ({
  active,
  style,
  index,
  activeStyle,
  onPress,
  states,
}: CarouselControlsItemProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active: pressed } = states || {};
  styles.useVariants({ active, pressed });
  return (
    <Pressable style={[styles.item, active && activeStyle]} onPress={onPress}>
      <View style={[styles.circle, style]}>
        <BodyText>{index}</BodyText>
      </View>
    </Pressable>
  );
};

const CarouselControlItem = createPressable({
  Root: CarouselControlItemRoot,
});

CarouselControlItem.displayName = 'CarouselControlItem';

const styles = StyleSheet.create(theme => ({
  item: {
    width: 24,
    height: 24,
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
      pressed: {
        true: {
          opacity: 0.7,
        },
      },
    },
  },
}));

export default CarouselControlItem;

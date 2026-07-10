import { nanoid } from 'nanoid/non-secure';
import { FC, useContext, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { UnstyledIconButton } from '../UnstyledIconButton';
import CarouselContext from './Carousel.context';
import { CarouselControlsProps } from './Carousel.props';
import CarouselControlItem from './CarouselControlItem';

export const CarouselControls: FC<CarouselControlsProps> = ({
  testID = 'pagination',
  style,
  itemStyle,
  activeItemStyle,
  showNavigation = false,
  onPressPrev,
  onPressNext,
  accessibilityHidden,
  ...props
}) => {
  const context = useContext(CarouselContext);
  const {
    activeIndex = 0,
    numItems = 0,
    setActiveIndex,
    controlsAccessibilityHidden,
    disabled = false,
  } = context;

  const isAccessibilityHidden = accessibilityHidden ?? controlsAccessibilityHidden ?? true;

  styles.useVariants({ showNavigation });

  useEffect(() => {
    if (!Object.keys(context).length) {
      console.warn(
        'CarouselControls must be a child of Carousel. Pagination will not be displayed.'
      );
    }
  }, [context]);

  const keys = useMemo(() => {
    return Array(numItems)
      .fill(null)
      .map(() => nanoid());
  }, [numItems]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onPressPrev?.();
    }
  };

  const handleNext = () => {
    if (activeIndex < numItems - 1) {
      setActiveIndex(activeIndex + 1);
      onPressNext?.();
    }
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
  };

  if (!Object.keys(context).length) {
    return null;
  }

  return (
    <View
      style={[styles.root, style]}
      testID={testID}
      importantForAccessibility={isAccessibilityHidden ? 'no-hide-descendants' : 'auto'}
      accessibilityElementsHidden={isAccessibilityHidden}
      {...props}
    >
      {showNavigation && (
        <UnstyledIconButton
          icon={ChevronLeftSmallIcon}
          onPress={handlePrev}
          disabled={disabled || activeIndex === 0}
          accessibilityLabel="Previous"
          style={styles.button}
          inverted={context.inverted}
        />
      )}
      <View style={styles.dotsContainer}>
        {keys.map((_, index) => (
          <CarouselControlItem
            active={index === activeIndex}
            index={index}
            key={keys[index]}
            style={itemStyle}
            activeStyle={activeItemStyle}
            onPress={() => handleItemPress(index)}
            disabled={disabled}
          />
        ))}
      </View>
      {showNavigation && (
        <UnstyledIconButton
          icon={ChevronRightSmallIcon}
          onPress={handleNext}
          disabled={disabled || activeIndex === numItems - 1}
          accessibilityLabel="Next"
          style={styles.button}
          inverted={context.inverted}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  root: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.carouselControl.gap,
    justifyContent: 'space-between',
    variants: {
      showNavigation: {
        true: {
          justifyContent: 'space-between',
        },
        false: {
          justifyContent: 'center',
        },
      },
    },
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: theme.components.carouselControl.gap,
  },
  button: {
    width: theme.components.iconSize.md,
    height: theme.components.iconSize.md,
  },
}));

CarouselControls.displayName = 'CarouselControls';

export default CarouselControls;

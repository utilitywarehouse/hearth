import { ReactElement } from 'react';
import { FlatListProps, PressableProps, ViewProps, ViewStyle } from 'react-native';

export interface CarouselRef {
  scrollToIndex: (params: { index: number; animated?: boolean | null }) => void;
  scrollToOffset: (params: { offset: number; animated?: boolean | null }) => void;
}

export interface CarouselContextValue {
  activeIndex: number;
  numItems: number;
  setActiveIndex: (index: number) => void;
  setNumItems: (count: number) => void;
  controlsAccessibilityHidden?: boolean;
  inverted?: boolean;
  disabled?: boolean;
}

export interface CarouselItemProps extends ViewProps {
  active?: boolean;
  key?: string | number;
  inactiveOpacity?: number;
  width?: number;
}

export interface CarouselProps
  extends Omit<
    FlatListProps<ReactElement<CarouselItemProps>>,
    | 'accessibilityActions'
    | 'accessibilityLabel'
    | 'accessibilityRole'
    | 'accessible'
    | 'bounces'
    | 'children'
    | 'data'
    | 'decelerationRate'
    | 'getItemLayout'
    | 'horizontal'
    | 'pagingEnabled'
    | 'onAccessibilityAction'
    | 'onViewableItemsChanged'
    | 'overScrollMode'
    | 'renderItem'
    | 'showsHorizontalScrollIndicator'
    | 'snapToInterval'
    | 'snapToAlignment'
    | 'viewabilityConfig'
    | 'style'
  > {
  activeIndex?: number;
  centered?: boolean;
  disabled?: boolean;
  inactiveItemOpacity?: number;
  itemWidth?: number;
  onSnapToItem?: (index: number) => void;
  showOverflow?: boolean;
  width: number;
  children?: ViewProps['children'];
  itemsStyle?: FlatListProps<ReactElement<CarouselItemProps>>['style'];
  style?: ViewStyle;
  showControls?: boolean;
  showNavigation?: boolean;
  controlsStyle?: ViewProps['style'];
  controlsItemStyle?: ViewProps['style'];
  controlsActiveItemStyle?: ViewProps['style'];
  controlsAccessibilityHidden?: boolean;
  ref?: React.Ref<CarouselRef>;
  inverted?: boolean;
}

export interface CarouselProviderProps {
  initialActiveIndex?: number;
}

export interface CarouselControlsProps extends ViewProps {
  itemStyle?: ViewProps['style'];
  activeItemStyle?: ViewProps['style'];
  showNavigation?: boolean;
  onPressPrev?: () => void;
  onPressNext?: () => void;
  accessibilityHidden?: boolean;
}

export interface CarouselControlsItemProps extends Omit<PressableProps, 'style'> {
  active: boolean;
  index: number;
  style?: ViewProps['style'];
  activeStyle?: ViewProps['style'];
}

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
  /** Sets the initial active item index.
   * @default 0
   */
  activeIndex?: number;
  /** Centers items within the viewport, revealing partial adjacent items when used with `itemWidth`.
   * @default false
   */
  centered?: boolean;
  /** Disables scrolling and interaction with the carousel.
   * @default false
   */
  disabled?: boolean;
  /** Opacity applied to items outside the active viewport, for use with `showOverflow`.
   * @default 1
   */
  inactiveItemOpacity?: number;
  /** Width of each carousel item, if different from `width`. */
  itemWidth?: number;
  /** Called each time a new item becomes active in the viewport. */
  onSnapToItem?: (index: number) => void;
  /** Reveals items that sit outside the carousel viewport.
   * @default false
   */
  showOverflow?: boolean;
  /** Width of the carousel viewport. */
  width: number;
  /** The `CarouselItem` elements to render. */
  children?: ViewProps['children'];
  /** Style applied to the scrollable list of items. */
  itemsStyle?: FlatListProps<ReactElement<CarouselItemProps>>['style'];
  /** Style applied to the carousel's outer container. */
  style?: ViewStyle;
  /** Shows the built-in pagination controls.
   * @default true
   */
  showControls?: boolean;
  /** Shows previous/next navigation buttons in the controls.
   * @default false
   */
  showNavigation?: boolean;
  /** Style applied to the pagination controls container. */
  controlsStyle?: ViewProps['style'];
  /** Style applied to each pagination dot. */
  controlsItemStyle?: ViewProps['style'];
  /** Style applied to the active pagination dot. */
  controlsActiveItemStyle?: ViewProps['style'];
  /** Hides the pagination controls from screen readers.
   * @default true
   */
  controlsAccessibilityHidden?: boolean;
  /** Forwarded ref exposing `scrollToIndex` and `scrollToOffset` methods. */
  ref?: React.Ref<CarouselRef>;
  /** Inverts the carousel control colours, for use on brand-coloured backgrounds.
   * @default false
   */
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

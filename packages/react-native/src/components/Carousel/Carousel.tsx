import {
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  View,
  ViewStyle,
  ViewToken,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import CarouselContext from './Carousel.context';
import { CarouselItemProps, CarouselProps } from './Carousel.props';
import { CarouselControls } from './CarouselControls';
import { CarouselItem } from './CarouselItem';

const Carousel = ({
  centered = false,
  children,
  disabled = false,
  inactiveItemOpacity = 1,
  itemWidth,
  onSnapToItem,
  showOverflow = false,
  style,
  width,
  itemsStyle,
  activeIndex: initialActiveIndex = 0,
  showControls = true,
  showNavigation = false,
  controlsStyle,
  controlsItemStyle,
  controlsActiveItemStyle,
  controlsAccessibilityHidden = true,
  inverted = false,
  ref,
  ...props
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [, setNumItems] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  const isWeb = Platform.OS === 'web';
  const isProgrammaticScroll = useRef(false);

  // Expose scroll methods through ref
  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: ({ index, animated = true }: { index: number; animated?: boolean | null }) => {
        if (isWeb && scrollViewRef.current) {
          isProgrammaticScroll.current = true;
          const itemWidthValue = itemWidth || width;
          const offset = centered ? (width - (itemWidth || width)) / 2 : 0;
          const scrollX = index * itemWidthValue - offset;
          scrollViewRef.current.scrollTo({ x: scrollX, animated: animated ?? true });
          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 500);
        } else if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index, animated: animated ?? true });
        }
        setActiveIndex(index);
      },
      scrollToOffset: ({
        offset,
        animated = true,
      }: {
        offset: number;
        animated?: boolean | null;
      }) => {
        if (isWeb && scrollViewRef.current) {
          isProgrammaticScroll.current = true;
          scrollViewRef.current.scrollTo({ x: offset, animated: animated ?? true });
          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 500);
        } else if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset, animated: animated ?? true });
        }
      },
    }),
    [isWeb, itemWidth, width, centered]
  );

  // Recursively check if CarouselControls exists in the children tree
  const hasCarouselControlsInTree = (node: React.ReactNode): boolean => {
    if (!node) return false;

    if (typeof node === 'object' && 'type' in node) {
      if (
        node.type === CarouselControls ||
        (node.type as any)?.displayName === 'CarouselControls'
      ) {
        return true;
      }

      // Check children recursively
      if ('props' in node && node.props && typeof node.props === 'object') {
        const props = node.props as { children?: React.ReactNode };
        if (props.children) {
          const childArray = Children.toArray(props.children);
          return childArray.some(child => hasCarouselControlsInTree(child));
        }
      }
    }

    return false;
  };

  // Filter only CarouselItem children for the carousel
  const { carouselItems, otherChildren, hasCarouselControls } = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const carouselItems: Array<ReactElement<CarouselItemProps>> = [];
    const otherChildren: Array<React.ReactNode> = [];

    childrenArray.forEach(child => {
      if (
        typeof child === 'object' &&
        'type' in child &&
        (child.type === CarouselItem || (child.type as any)?.displayName === 'CarouselItem')
      ) {
        carouselItems.push(child as ReactElement<CarouselItemProps>);
      } else {
        otherChildren.push(child);
      }
    });

    // Recursively check if any CarouselControls exist in the tree
    const hasCarouselControls = childrenArray.some(child => hasCarouselControlsInTree(child));

    return { carouselItems, otherChildren, hasCarouselControls };
  }, [children]);

  const innerMargin: number = width - (itemWidth || width);
  const containerStyles: ViewStyle = {
    marginHorizontal: centered ? innerMargin / 2 : 0,
    overflow: showOverflow ? 'visible' : 'hidden',
  };

  const context = useMemo(
    () => ({
      activeIndex,
      numItems: carouselItems.length,
      setActiveIndex,
      setNumItems,
      controlsAccessibilityHidden,
      inverted,
      disabled,
    }),
    [
      activeIndex,
      carouselItems.length,
      setActiveIndex,
      setNumItems,
      controlsAccessibilityHidden,
      inverted,
      disabled,
    ]
  );

  // On web, we need to prevent overflow from expanding the container
  const webContainerStyles: ViewStyle = isWeb
    ? {
        width,
        maxWidth: width,
        overflow: 'hidden', // Always clip on web to prevent expansion
      }
    : {};

  // For web centered layouts, add padding to content container
  const webContentContainerStyle: ViewStyle =
    isWeb && centered
      ? {
          paddingHorizontal: innerMargin / 2,
        }
      : {};

  useEffect(() => {
    setNumItems((carouselItems || []).length);
  }, [carouselItems, setNumItems]);

  // Set initial scroll position on web
  useEffect(() => {
    if (isWeb && scrollViewRef.current && initialActiveIndex > 0) {
      // Use setTimeout to ensure ScrollView is mounted
      setTimeout(() => {
        if (scrollViewRef.current) {
          const itemWidthValue = itemWidth || width;
          const offset = centered ? innerMargin / 2 : 0;
          const scrollX = initialActiveIndex * itemWidthValue - offset;
          scrollViewRef.current.scrollTo({ x: scrollX, animated: false });
        }
      }, 0);
    }
  }, [isWeb, initialActiveIndex, itemWidth, width, centered, innerMargin]);

  // Scroll to active index when it changes (for programmatic navigation)
  useEffect(() => {
    if (!isProgrammaticScroll.current) {
      isProgrammaticScroll.current = true;

      if (isWeb && scrollViewRef.current) {
        const itemWidthValue = itemWidth || width;
        const offset = centered ? innerMargin / 2 : 0;
        const scrollX = activeIndex * itemWidthValue - offset;

        scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
      } else if (
        !isWeb &&
        flatListRef.current &&
        activeIndex >= 0 &&
        activeIndex < carouselItems.length
      ) {
        flatListRef.current.scrollToIndex({ index: activeIndex, animated: true });
      }

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  }, [activeIndex, isWeb, itemWidth, width, centered, innerMargin, carouselItems.length]);

  // Web scroll handler - track scroll position
  const handleWebScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isWeb || isProgrammaticScroll.current) return;

      const scrollX = event.nativeEvent.contentOffset.x;
      const itemWidthValue = itemWidth || width;

      // For centered layouts, account for the padding offset
      const offset = centered ? innerMargin / 2 : 0;
      const index = Math.round((scrollX + offset) / itemWidthValue);

      if (index >= 0 && index < carouselItems.length && index !== activeIndex) {
        setActiveIndex?.(index);
      }
    },
    [
      activeIndex,
      centered,
      innerMargin,
      isWeb,
      itemWidth,
      carouselItems.length,
      setActiveIndex,
      width,
    ]
  );

  // Web scroll end handler - update when scroll completes
  const handleWebScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isWeb || isProgrammaticScroll.current) return;

      const scrollX = event.nativeEvent.contentOffset.x;
      const itemWidthValue = itemWidth || width;

      // For centered layouts, account for the padding offset
      const offset = centered ? innerMargin / 2 : 0;
      const index = Math.round((scrollX + offset) / itemWidthValue);

      if (index >= 0 && index < carouselItems.length) {
        setActiveIndex?.(index);
        onSnapToItem?.(index);
      }
    },
    [
      centered,
      innerMargin,
      isWeb,
      itemWidth,
      carouselItems.length,
      onSnapToItem,
      setActiveIndex,
      width,
    ]
  );

  // Native viewable items handler
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (!viewableItems.length) {
        return;
      }

      const index = viewableItems[viewableItems.length - 1].index || 0;

      setActiveIndex?.(index);
      onSnapToItem?.(index);
    },
    [onSnapToItem, setActiveIndex]
  );

  const controls = (
    <CarouselControls
      style={[styles.controls, controlsStyle]}
      itemStyle={controlsItemStyle}
      activeItemStyle={controlsActiveItemStyle}
      showNavigation={showNavigation}
      accessibilityHidden={controlsAccessibilityHidden}
    />
  );

  // Render for web using ScrollView with scroll snap
  if (isWeb) {
    return (
      <CarouselContext.Provider value={context}>
        <View style={style}>
          <ScrollView
            horizontal
            onScroll={handleWebScroll}
            onMomentumScrollEnd={handleWebScrollEnd}
            onScrollEndDrag={handleWebScrollEnd}
            ref={scrollViewRef as any}
            scrollEnabled={!disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth || width}
            snapToAlignment={centered ? 'center' : 'start'}
            decelerationRate="fast"
            style={[styles.webContainer, webContainerStyles, itemsStyle]}
            contentContainerStyle={[styles.webContentContainer, webContentContainerStyle]}
            {...props}
          >
            {carouselItems.map((item, index) =>
              cloneElement(item, {
                active: index === activeIndex,
                inactiveOpacity: inactiveItemOpacity,
                key: item?.key || item.props?.id || index,
                width: itemWidth || width,
                style: [
                  item.props?.style,
                  styles.webItem,
                  centered ? styles.webItemCentered : styles.webItemStart,
                ],
              })
            )}
          </ScrollView>
          {showControls && !hasCarouselControls && controls}
          {otherChildren}
        </View>
      </CarouselContext.Provider>
    );
  }

  // Render for native using FlatList
  return (
    <CarouselContext.Provider value={context}>
      <View style={style}>
        <FlatList<ReactElement<CarouselItemProps>>
          ref={flatListRef as any}
          bounces={false} // Prevents bouncing at the start and end of carousel scrolling (iOS only)
          data={carouselItems}
          decelerationRate="fast"
          disableIntervalMomentum // Prevents scrolling more than one item at a time
          getItemLayout={(_, index) => ({
            length: itemWidth || width,
            offset: (itemWidth || width) * index,
            index,
          })}
          horizontal
          initialScrollIndex={activeIndex}
          pagingEnabled
          onViewableItemsChanged={handleViewableItemsChanged}
          overScrollMode="never" // Prevents stretching of first and last items when reaching each end of the carousel (Android only)
          removeClippedSubviews={!showOverflow}
          renderItem={({ index, item }) =>
            cloneElement(item, {
              active: index === activeIndex,
              inactiveOpacity: inactiveItemOpacity,
              key: item?.key || item.props?.id || index,
              width: itemWidth || width,
            })
          }
          scrollEnabled={!disabled}
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth || width}
          snapToAlignment="center"
          style={[itemsStyle, containerStyles]}
          viewabilityConfig={{ itemVisiblePercentThreshold: 51 }}
          {...props}
        />
        {showControls && !hasCarouselControls && controls}
        {otherChildren}
      </View>
    </CarouselContext.Provider>
  );
};

Carousel.displayName = 'Carousel';

const styles = StyleSheet.create(theme => ({
  controls: {
    marginTop: theme.space['200'],
  },
  webContainer: {
    _web: {
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      overflowX: 'scroll',
      overflowY: 'hidden',
    },
  },
  webContentContainer: {
    _web: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  webItem: {
    _web: {
      scrollSnapStop: 'always',
      flexShrink: 0,
    },
  },
  webItemCentered: {
    _web: {
      scrollSnapAlign: 'center',
    },
  },
  webItemStart: {
    _web: {
      scrollSnapAlign: 'start',
    },
  },
}));

export default Carousel;

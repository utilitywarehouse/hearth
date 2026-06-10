import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { useTabsContext } from './Tabs.context';
import type TabsListProps from './TabsList.props';

const Indicator = Animated.createAnimatedComponent(View);

const SCROLL_STEP_RATIO = 0.6;
const SCROLL_BUTTON_HITSLOP = { top: 10, bottom: 10, left: 10, right: 10 } as const;

const TabsList = ({ children, style, ...rest }: TabsListProps) => {
  const { indicatorSizeSV, indicatorXSV } = useTabsContext();

  const scrollRef = useRef<Animated.ScrollView | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerWidthRef = useRef(0);
  const contentWidthRef = useRef(0);
  const scrollX = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorXSV.value }],
    width: indicatorSizeSV.value,
  }));

  const updateScrollState = useCallback(() => {
    const cw = containerWidthRef.current;
    const contentW = contentWidthRef.current;
    const x = scrollX.value;
    const overflow = contentW > cw + 1;
    setCanScrollLeft(overflow && x > 0);
    setCanScrollRight(overflow && x + cw < contentW - 1);
  }, [scrollX]);

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    containerWidthRef.current = e.nativeEvent.layout.width;
    updateScrollState();
  };
  const onContentSizeChange = (w: number) => {
    contentWidthRef.current = w;
    updateScrollState();
  };
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: { contentOffset: { x: number } }) => {
      scrollX.value = e.contentOffset.x;
      runOnJS(updateScrollState)();
    },
  });

  const scrollBy = (direction: 1 | -1) => {
    const viewW = containerWidthRef.current;
    const step = viewW * SCROLL_STEP_RATIO;
    const current = scrollX.value;
    const max = Math.max(0, contentWidthRef.current - viewW);
    const target = Math.max(0, Math.min(current + direction * step, max));
    scrollRef.current?.scrollTo({ x: target, animated: true });
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handler = () => updateScrollState();
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }
    return;
  }, [updateScrollState]);

  return (
    <View style={[styles.wrapper, style]} {...rest} accessibilityRole="tablist">
      {canScrollLeft && (
        <View
          style={[styles.iconButtonWrap, styles.scrollButtonLeft]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : {})}
        >
          <UnstyledIconButton
            accessibilityLabel={undefined}
            icon={ChevronLeftSmallIcon}
            onPress={() => scrollBy(-1)}
            style={styles.iconButton}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            hitSlop={SCROLL_BUTTON_HITSLOP}
            {...(Platform.OS === 'web' ? ({ 'aria-hidden': true, tabIndex: -1 } as any) : {})}
          />
        </View>
      )}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={onLayoutContainer}
        onContentSizeChange={onContentSizeChange}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {children}
          <Indicator
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[styles.indicator, indicatorStyle]}
          />
        </View>
      </Animated.ScrollView>
      {canScrollRight && (
        <View
          style={[styles.iconButtonWrap, styles.scrollButtonRight]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : {})}
        >
          <UnstyledIconButton
            accessibilityLabel={undefined}
            icon={ChevronRightSmallIcon}
            onPress={() => scrollBy(1)}
            style={styles.iconButton}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            hitSlop={SCROLL_BUTTON_HITSLOP}
            {...(Platform.OS === 'web' ? ({ 'aria-hidden': true, tabIndex: -1 } as any) : {})}
          />
        </View>
      )}
    </View>
  );
};

TabsList.displayName = 'TabsList';

const styles = StyleSheet.create(theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    borderBottomWidth: theme.components.tabs.divider.borderWidth,
    borderColor: theme.color.border.strong,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  container: {
    position: 'relative',
    flexDirection: 'row',
    gap: theme.components.tabs.gap,
  },
  indicator: {
    position: 'absolute',
    height: 6,
    borderTopLeftRadius: theme.components.tabs.item.selected.borderTopRadius,
    borderTopRightRadius: theme.components.tabs.item.selected.borderTopRadius,
    borderBottomLeftRadius: theme.components.tabs.item.selected.borderBottomRadius,
    borderBottomRightRadius: theme.components.tabs.item.selected.borderBottomRadius,
    backgroundColor: theme.color.surface.brand.default,
    bottom: 0,
    left: 0,
  },
  scrollButtonLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -theme.space[150] }],
    zIndex: 10,
  },
  scrollButtonRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -theme.space[150] }],
    zIndex: 10,
  },
  iconButtonWrap: {},
  iconButton: {
    backgroundColor: theme.color.surface.neutral.subtle,
    width: theme.space[300],
    height: theme.space[300],
  },
}));

export default TabsList;

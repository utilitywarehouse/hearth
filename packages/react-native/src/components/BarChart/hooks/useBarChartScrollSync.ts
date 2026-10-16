import { useCallback, useEffect, useRef } from 'react';
import { useAnimatedRef } from 'react-native-reanimated';
import type Animated from 'react-native-reanimated';
import { IS_WEB } from '../BarChart.constants';
import { shouldScrollToEnd } from '../BarChart.utils';

interface UseBarChartScrollSyncOptions {
  dataId: string;
  viewportWidth: number;
  contentWidth: number;
}

/**
 * Keeps the scroll position valid for the chart's content width: back to the start when everything
 * fits (a stale offset past the new end would leave the plot blank), otherwise to the newest bar
 * once per dataset. Only a native content size that already matches counts as scrolled, as
 * scrolling before the native view resizes lands on the old end.
 */
export const useBarChartScrollSync = ({
  dataId,
  viewportWidth,
  contentWidth,
}: UseBarChartScrollSyncOptions) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrolledToEndId = useRef<string | null>(null);
  const nativeContentWidth = useRef<number | null>(null);

  const syncScroll = useCallback(
    (width: number, isNativeSized: boolean) => {
      if (width <= viewportWidth) {
        // A later overflow is a fresh need to scroll to the newest bar.
        scrolledToEndId.current = null;
        scrollRef.current?.scrollTo({ x: 0, animated: false });
        return;
      }
      if (
        !shouldScrollToEnd({
          scrolledId: scrolledToEndId.current,
          dataId,
          viewportWidth,
          contentWidth: width,
        })
      ) {
        return;
      }
      if (isNativeSized) {
        scrolledToEndId.current = dataId;
      }
      scrollRef.current?.scrollToEnd({ animated: false });
      if (isNativeSized && !IS_WEB) {
        // The native scroll view applies its new content size after this callback, so the call
        // above can clamp to the previous end. Scroll again once it has caught up.
        requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: false }));
      }
    },
    [viewportWidth, dataId, scrollRef]
  );

  useEffect(() => {
    syncScroll(contentWidth, nativeContentWidth.current === contentWidth);
  }, [syncScroll, contentWidth]);

  const handleContentSizeChange = (width: number) => {
    nativeContentWidth.current = width;
    syncScroll(width, true);
  };

  return { scrollRef, handleContentSizeChange };
};

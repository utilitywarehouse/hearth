import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet as RNStyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { UnistylesRuntime } from '../../core';
import SafeAreaViewProps, { SafeAreaEdge } from './SafeAreaView.props';

type EdgeInsets = Record<SafeAreaEdge, number>;

const DEFAULT_EDGES: SafeAreaEdge[] = ['top', 'right', 'bottom', 'left'];
const EMPTY_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const EDGE_EPSILON = 1;

const getNumericStyleValue = (value: unknown) => {
  return typeof value === 'number' ? value : 0;
};

const getStyleInsetValue = (
  style: ViewStyle | undefined,
  mode: SafeAreaViewProps['mode'],
  edge: SafeAreaEdge
) => {
  const prefix = mode === 'margin' ? 'margin' : 'padding';

  if (!style) {
    return 0;
  }

  if (edge === 'top') {
    return getNumericStyleValue(
      style[`${prefix}Top`] ?? style[`${prefix}Vertical`] ?? style[prefix] ?? 0
    );
  }

  if (edge === 'bottom') {
    return getNumericStyleValue(
      style[`${prefix}Bottom`] ?? style[`${prefix}Vertical`] ?? style[prefix] ?? 0
    );
  }

  if (edge === 'left') {
    return getNumericStyleValue(
      style[`${prefix}Left`] ?? style[`${prefix}Horizontal`] ?? style[prefix] ?? 0
    );
  }

  return getNumericStyleValue(
    style[`${prefix}Right`] ?? style[`${prefix}Horizontal`] ?? style[prefix] ?? 0
  );
};

const SafeAreaView = forwardRef<View, SafeAreaViewProps>(
  ({ children, edges = DEFAULT_EDGES, mode = 'padding', onLayout, style, ...props }, ref) => {
    const viewRef = useRef<View>(null);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [edgeInsets, setEdgeInsets] = useState<EdgeInsets>(EMPTY_INSETS);

    const flattenedStyle = useMemo(
      () => RNStyleSheet.flatten(style) as ViewStyle | undefined,
      [style]
    );

    const updateEdgeInsets = useCallback(() => {
      const currentView = viewRef.current;

      if (!currentView) {
        return;
      }

      currentView.measureInWindow((x, y, width, height) => {
        const runtimeInsets = UnistylesRuntime.insets ?? EMPTY_INSETS;
        const nextEdgeInsets: EdgeInsets = {
          top: edges.includes('top') ? Math.max(runtimeInsets.top - Math.max(y, 0), 0) : 0,
          right: edges.includes('right')
            ? Math.max(runtimeInsets.right - Math.max(windowWidth - (x + width), 0), 0)
            : 0,
          bottom: edges.includes('bottom')
            ? Math.max(runtimeInsets.bottom - Math.max(windowHeight - (y + height), 0), 0)
            : 0,
          left: edges.includes('left') ? Math.max(runtimeInsets.left - Math.max(x, 0), 0) : 0,
        };

        setEdgeInsets(previousInsets => {
          const hasChanged = (Object.keys(nextEdgeInsets) as SafeAreaEdge[]).some(
            edge => Math.abs(previousInsets[edge] - nextEdgeInsets[edge]) > EDGE_EPSILON
          );

          return hasChanged ? nextEdgeInsets : previousInsets;
        });
      });
    }, [edges, windowHeight, windowWidth]);

    useEffect(() => {
      const frame = requestAnimationFrame(updateEdgeInsets);

      return () => cancelAnimationFrame(frame);
    }, [updateEdgeInsets]);

    const handleRef = useCallback(
      (node: View | null) => {
        viewRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event);
        requestAnimationFrame(updateEdgeInsets);
      },
      [onLayout, updateEdgeInsets]
    );

    const safeAreaStyle = useMemo(() => {
      const nextStyle: ViewStyle = {};

      if (mode === 'padding') {
        nextStyle.paddingTop = getStyleInsetValue(flattenedStyle, mode, 'top') + edgeInsets.top;
        nextStyle.paddingRight =
          getStyleInsetValue(flattenedStyle, mode, 'right') + edgeInsets.right;
        nextStyle.paddingBottom =
          getStyleInsetValue(flattenedStyle, mode, 'bottom') + edgeInsets.bottom;
        nextStyle.paddingLeft = getStyleInsetValue(flattenedStyle, mode, 'left') + edgeInsets.left;

        return nextStyle;
      }

      nextStyle.marginTop = getStyleInsetValue(flattenedStyle, mode, 'top') + edgeInsets.top;
      nextStyle.marginRight = getStyleInsetValue(flattenedStyle, mode, 'right') + edgeInsets.right;
      nextStyle.marginBottom =
        getStyleInsetValue(flattenedStyle, mode, 'bottom') + edgeInsets.bottom;
      nextStyle.marginLeft = getStyleInsetValue(flattenedStyle, mode, 'left') + edgeInsets.left;

      return nextStyle;
    }, [
      edgeInsets.bottom,
      edgeInsets.left,
      edgeInsets.right,
      edgeInsets.top,
      flattenedStyle,
      mode,
    ]);

    return (
      <View ref={handleRef} onLayout={handleLayout} style={[style, safeAreaStyle]} {...props}>
        {children}
      </View>
    );
  }
);

SafeAreaView.displayName = 'SafeAreaView';

export default SafeAreaView;

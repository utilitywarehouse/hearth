import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { TimelineItemPosition, TimelineItemProps, TimelineProps } from './Timeline.props';

const getItemPosition = (index: number, count: number): TimelineItemPosition => {
  if (count <= 1) {
    return 'single';
  }

  if (index === 0) {
    return 'start';
  }

  if (index === count - 1) {
    return 'end';
  }

  return 'middle';
};

const Timeline = ({ children, variant = 'static', style, ...rest }: TimelineProps) => {
  const childElements = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <View accessibilityRole="list" style={[styles.root, style as ViewStyle]} {...rest}>
      {childElements.map((child, index) => {
        const position = getItemPosition(index, childElements.length);

        return React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
          key: child.key ?? `timeline-item-${index}`,
          position,
          variant,
        });
      })}
    </View>
  );
};

Timeline.displayName = 'Timeline';

const styles = StyleSheet.create(() => ({
  root: {
    width: '100%',
  },
}));

export default Timeline;

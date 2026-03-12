import WheelPicker from '@quidone/react-native-wheel-picker';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import type { PickerOption } from './TimePicker.props';

type TimePickerWheelProps = {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
};

const ITEM_HEIGHT = 40;
const VISIBLE_REST = 3;

const TimePickerWheel = ({ value, setValue = () => {}, items }: TimePickerWheelProps) => {
  const theme = useTheme();
  const fadeHeight = ITEM_HEIGHT * 1.5;
  const gradientId = useMemo(() => `wheel-fade-${Math.random().toString(36).slice(2)}`, []);
  const displayCount = VISIBLE_REST * 2 + 1;
  const pickerHeight = ITEM_HEIGHT * displayCount;

  const data = useMemo(
    () =>
      items.map(item => ({
        value: item.value,
        label: item.text,
      })),
    [items]
  );

  const handleValueChanged = useCallback(
    ({ item }: { item: { value: number | string } }) => {
      if (item?.value === value) {
        return;
      }
      if (item && item.value !== undefined) {
        setValue(item.value);
      }
    },
    [setValue, value]
  );

  const renderOverlay = useCallback(
    () => (
      <View style={[styles.overlayContainer, styles.pointerEventsNone]}>
        <View style={[styles.fadeOverlay, styles.pointerEventsNone, { height: fadeHeight }]}>
          <Svg width="100%" height="100%" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id={`${gradientId}-top`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={theme.color.background.secondary} stopOpacity={1} />
                <Stop offset="1" stopColor={theme.color.background.secondary} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${gradientId}-top)`} />
          </Svg>
        </View>
        <View
          style={[
            styles.fadeOverlay,
            styles.fadeOverlayBottom,
            styles.pointerEventsNone,
            { height: fadeHeight },
          ]}
        >
          <Svg width="100%" height="100%" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id={`${gradientId}-bottom`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={theme.color.background.secondary} stopOpacity={0} />
                <Stop offset="1" stopColor={theme.color.background.secondary} stopOpacity={1} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${gradientId}-bottom)`} />
          </Svg>
        </View>
      </View>
    ),
    [fadeHeight, gradientId, theme.color.background.secondary]
  );

  const renderItem = useCallback(
    ({ item }: { item: { label: string } }) => (
      <View style={styles.indicator}>
        <BodyText size="lg">{item.label}</BodyText>
      </View>
    ),
    []
  );

  return (
    <View style={[styles.container, { height: pickerHeight }]}>
      <View style={styles.overlayContainer}>
        <View style={[styles.selection]} />
      </View>
      <WheelPicker
        data={data}
        value={value}
        onValueChanged={handleValueChanged}
        itemHeight={ITEM_HEIGHT}
        visibleItemCount={displayCount}
        width={theme.components.timePicker.time.item.width}
        renderItem={renderItem}
        renderOverlay={renderOverlay}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    minWidth: theme.components.timePicker.time.item.width,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  indicator: {
    width: theme.components.timePicker.time.item.width,
    height: theme.components.timePicker.time.item.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selection: {
    alignSelf: 'stretch',
    backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
    borderRadius: theme.borderRadius.md,
    width: theme.components.timePicker.time.item.width,
    height: theme.components.timePicker.time.item.height,
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  fadeOverlayBottom: {
    top: undefined,
    bottom: 0,
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
}));

export default TimePickerWheel;

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, findNodeHandle, Platform, View as RNView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BottomSheetModal, BottomSheetView } from '../BottomSheet';
import { Button } from '../Button';
import { DEFAULT_TIME_PICKER_HEIGHT } from './constants';
import type { DateType, TimePickerProps } from './TimePicker.props';
import TimePickerView from './TimePickerView';

dayjs.extend(utc);
dayjs.extend(timezone);

type FooterProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const Footer = ({ onCancel, onConfirm }: FooterProps) => {
  return (
    <RNView style={styles.footer} testID="footer">
      <Button variant="ghost" colorScheme="functional" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="ghost" colorScheme="functional" onPress={onConfirm}>
        Ok
      </Button>
    </RNView>
  );
};

const TimePicker = ({
  timeZone,
  date,
  onChange,
  use12Hours,
  minuteInterval,
  numerals = 'latn',
  containerHeight = DEFAULT_TIME_PICKER_HEIGHT,
  hideFooter,
  style,
  ref,
  onCancel = () => {},
}: TimePickerProps) => {
  dayjs.tz.setDefault(timeZone);
  dayjs.locale('en');

  const modalRef = useRef<BottomSheetModal>(null);
  const pickerViewRef = useRef<RNView>(null);

  useImperativeHandle(ref, () => modalRef.current as BottomSheetModal);

  const [currentDate, setCurrentDate] = useState<DateType>(() => {
    return date ? dayjs.tz(date, timeZone) : dayjs().tz(timeZone);
  });

  useEffect(() => {
    if (date) {
      setCurrentDate(dayjs.tz(date, timeZone));
    } else {
      setCurrentDate(dayjs().tz(timeZone));
    }
  }, [date, timeZone]);

  const closeTimePicker = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const handleSelectDate = useCallback(
    (selectedDate: DateType) => {
      const newDate = dayjs.tz(selectedDate ?? currentDate, timeZone);
      setCurrentDate(newDate);
      onChange?.({ date: newDate ? dayjs(newDate).toDate() : newDate });
    },
    [currentDate, onChange, timeZone]
  );

  const handleCancel = useCallback(() => {
    onCancel?.();
    closeTimePicker();
  }, [closeTimePicker, onCancel]);

  const handleConfirm = useCallback(() => {
    closeTimePicker();
  }, [closeTimePicker]);

  const handleChange = useCallback((index: number) => {
    if (index > -1) {
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility('Time picker opened.');

        const targetRef = pickerViewRef.current;
        if (targetRef) {
          const nodeHandle = findNodeHandle(targetRef);
          if (nodeHandle) {
            AccessibilityInfo.setAccessibilityFocus(nodeHandle);
          }
        }
      }, 50);
    }
  }, []);

  const contentStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <BottomSheetModal
      ref={modalRef}
      onChange={handleChange}
      accessible={false}
      enableContentPanningGesture={false}
    >
      <BottomSheetView>
        <RNView
          ref={pickerViewRef}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? 'Time picker' : undefined}
          importantForAccessibility={Platform.OS === 'android' ? 'yes' : 'auto'}
          style={contentStyle}
        >
          <TimePickerView
            date={date}
            currentDate={currentDate}
            onSelectDate={handleSelectDate}
            timeZone={timeZone}
            numerals={numerals}
            use12Hours={use12Hours}
            minuteInterval={minuteInterval}
            containerHeight={containerHeight}
          />
          {!hideFooter ? <Footer onCancel={handleCancel} onConfirm={handleConfirm} /> : null}
        </RNView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

TimePicker.displayName = 'TimePicker';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.background.secondary,
    gap: theme.components.datePicker.calendar.gap,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.components.datePicker.calendar.footer.gap,
    justifyContent: 'flex-end',
  },
}));

export default TimePicker;

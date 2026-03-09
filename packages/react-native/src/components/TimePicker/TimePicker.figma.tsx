import figma from '@figma/code-connect';
import { useRef, useState } from 'react';
import { BottomSheetModalProvider, Button, DateType, TimePicker } from '../';

figma.connect(
  TimePicker,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10334-16770&t=Jg2fPJPQNzOyspmQ-4',
  {
    props: {},
    example: props => {
      const pickerRef = useRef(null);
      const [time, setTime] = useState<DateType>();

      return (
        <BottomSheetModalProvider>
          <Button onPress={() => pickerRef.current?.present()}>Choose time</Button>

          <TimePicker
            ref={pickerRef}
            date={time}
            onChange={({ date }) => setTime(date)}
            onCancel={() => setTime(undefined)}
            use12Hours={false}
          />
        </BottomSheetModalProvider>
      );
    },
  }
);

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10334-16770&t=Jg2fPJPQNzOyspmQ-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/TimePicker/TimePicker.tsx
// component=TimePicker

import figma from 'figma';

const hideFooter = figma.selectedInstance.getBoolean('Footer?', {
  true: false,
  false: true,
});

export default {
  id: 'time-picker',
  imports: [
    "import { useRef, useState } from 'react';",
    "import { BottomSheetModalProvider, Button, TimePicker } from '@utilitywarehouse/hearth-react-native';",
    "import type { DateType } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`const pickerRef = useRef(null);
const [time, setTime] = useState<DateType>();

<BottomSheetModalProvider>
  <Button onPress={() => pickerRef.current?.present()}>Choose time</Button>
  <TimePicker
    ref={pickerRef}
    date={time}
    onChange={({ date }) => setTime(date)}
    onCancel={() => setTime(undefined)}
    use12Hours={false}${figma.helpers.react.renderProp('hideFooter', hideFooter)}
  />
</BottomSheetModalProvider>`,
  metadata: { nestable: true, props: { hideFooter } },
};

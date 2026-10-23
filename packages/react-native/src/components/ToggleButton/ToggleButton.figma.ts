// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4842-1131&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ToggleButton/ToggleButton.tsx
// component=ToggleButton

import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Label');
const toggled = instance.getEnum('Selected?', { True: true, False: false });

// Figma has no Toggle Group component, so the snippet points at `ToggleGroup`, as the React
// package's ToggleButton and ToggleButtonCard templates do.
export default {
  id: 'ToggleButton',
  imports: ["import { ToggleButton } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`// Wrap related ToggleButtons in a ToggleGroup and give each a unique value, see docs.
// Use toggled and onToggle only for a standalone ToggleButton.
<ToggleButton${figma.helpers.react.renderProp('text', text)} value="someValue"${figma.helpers.react.renderProp('toggled', toggled)} />`,
  metadata: {
    nestable: true,
    props: { text, toggled },
  },
};

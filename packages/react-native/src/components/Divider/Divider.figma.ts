// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2421%3A1687
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Divider/Divider.tsx
// component=Divider

import figma from 'figma';

const orientation = figma.selectedInstance.getEnum('Orientation', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});

export default {
  id: 'Divider',
  imports: ['import { Divider } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<Divider${figma.helpers.react.renderProp('orientation', orientation)}/>`,
  metadata: { nestable: true, props: { orientation } },
};

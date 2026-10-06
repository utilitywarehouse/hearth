// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=16247-1724
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Chip/Chip.tsx
// component=Chip

import figma from 'figma';

const instance = figma.selectedInstance;

const children = instance.getString('Label');

export default {
  id: 'Chip',
  imports: ["import { Chip } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Chip onPress={() => {}}>${figma.helpers.react.renderChildren(children)}</Chip>`,
  metadata: { nestable: true },
};

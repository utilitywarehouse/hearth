// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=8145%3A617
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Label/Label.tsx
// component=Label

import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const optional = instance.getBoolean('Optional?');

export default {
  id: 'label',
  imports: ['import { Label } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<Label>${figma.helpers.react.renderChildren(label)}${
    optional ? ' (optional)' : ''
  }</Label>`,
  metadata: {
    nestable: true,
    props: {
      label,
      optional,
    },
  },
};

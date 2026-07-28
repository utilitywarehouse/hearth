// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=8364%3A1538
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Helper/HelperText.tsx
// component=HelperText
import figma from 'figma';

const instance = figma.selectedInstance;

const helperText = instance.getString('Helper text');

export default {
  id: 'helper-text',
  imports: ['import { HelperText } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<HelperText>${figma.helpers.react.renderChildren(helperText)}</HelperText>`,
  metadata: { nestable: true, props: { helperText } },
};

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-2288&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Tabs/Tab.tsx
// component=Tab

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const icon = figma.selectedInstance.getBoolean('Icon?', {
  true: figma.selectedInstance.getInstanceSwap('Icon-20')?.executeTemplate().example,
});

export default {
  id: 'Tab',
  imports: ["import { Tab } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Tab${figma.helpers.react.renderProp(
    'value',
    label
  )}${figma.helpers.react.renderProp('icon', icon)}>${figma.helpers.react.renderChildren(
    label
  )}</Tab>`,
  metadata: { nestable: true, props: { label, icon } },
};

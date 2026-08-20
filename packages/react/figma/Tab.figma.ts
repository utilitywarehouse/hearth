// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-2288&m=dev
// source=../src/components/Tabs/Tab.tsx
// component=Tab
import figma from 'figma';
const instance = figma.selectedInstance;

const children = instance.getString('Label');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().example,
  false: undefined,
});

export default {
  example: figma.code`<Tab value="">${figma.helpers.react.renderChildren(icon)}${figma.helpers.react.renderChildren(children)}</Tab>`,
  imports: ['import { Tab } from "@utilitywarehouse/hearth-react"'],
  id: 'tab',
  metadata: { nestable: true },
};

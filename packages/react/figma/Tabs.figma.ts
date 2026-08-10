// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-8744&m=dev
// source=../src/components/Tabs/Tabs.tsx
// component=Tabs
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'MD-56': 'md',
  'LG-64': 'lg',
});
// Arrow left?/Arrow right? are TabsList scroll-affordance visuals (design-time only, no prop),
// and Condensed? is a Figma-only layout variant with no code equivalent.
const tabLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Tab item');
const tabs = tabLayers
  .map(item => (item.type === 'INSTANCE' ? item.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<Tabs${figma.helpers.react.renderProp('size', size)} defaultValue="tab-1">
  <TabsList>${tabs.flat()}</TabsList>
  <TabContent value="tab-1">{/* content */}</TabContent>
</Tabs>`,
  imports: [
    'import { Tabs, TabsList, Tab, TabContent } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'tabs',
};

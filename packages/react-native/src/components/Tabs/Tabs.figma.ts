// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6464%3A8744
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Tabs/Tabs.tsx
// component=Tabs

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  'MD-56': 'md',
  'LG-64': 'lg',
});
const tabs = figma.properties.children(['Tab item']);

export default {
  id: 'Tabs',
  imports: ["import { TabPanel, Tabs, TabsList } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Tabs${figma.helpers.react.renderProp('size', size)}>
      <TabsList>${figma.helpers.react.renderChildren(tabs)}</TabsList>
      {/* Example TabPanel content, make sure they match the value of your Tab items */}
      <TabPanel value="account">Account content</TabPanel>
      <TabPanel value="billing">Billing content</TabPanel>
      <TabPanel value="usage">Usage content</TabPanel>
    </Tabs>`,
  metadata: { nestable: true, props: { size, tabs } },
};

import figma from '@figma/code-connect';
import { TabPanel, Tabs, TabsList } from '../';

figma.connect(Tabs, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6464%3A8744', {
  props: {
    size: figma.enum('Size', {
      'LG-64': 'lg',
    }),
    tabs: figma.children('Tab item'),
  },
  example: props => (
    <Tabs size={props.size}>
      <TabsList>{props.tabs}</TabsList>
      {/* Example TabPanel content, make sure they match the value of your Tab items */}
      <TabPanel value="account">Account content</TabPanel>
      <TabPanel value="billing">Billing content</TabPanel>
      <TabPanel value="usage">Usage content</TabPanel>
    </Tabs>
  ),
});

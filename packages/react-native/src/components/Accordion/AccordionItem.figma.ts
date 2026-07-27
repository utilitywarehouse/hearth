// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3390%3A6160
// component=AccordionItem

import figma from 'figma';

const instance = figma.selectedInstance;

const title = instance.getString('Title');
const expanded = instance.getBoolean('Expand?');
const description = instance.getString('Description');

// "Trigger custom content" and "Custom content" are slots — connectedInstances only includes
// children with their own Code Connect definitions.
const triggerSlot = instance.getSlot('Trigger custom content');
const triggerContent = triggerSlot?.connectedInstances[0]?.executeTemplate().example;

const contentSlot = instance.getSlot('Custom content');
const content = contentSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  id: 'AccordionItem',
  imports: [
    "import { BodyText } from '@utilitywarehouse/hearth-react-native';",
    "import { AccordionItem } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`<AccordionItem${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp('expanded', expanded)}${triggerContent ? figma.code` triggerContent={${triggerContent}}` : ''}>
      <BodyText>${figma.helpers.react.renderChildren(description)}</BodyText>
      ${content.flat()}
    </AccordionItem>`,
  metadata: { nestable: true },
};

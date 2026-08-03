// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&t=Uq6QfQcygdNGv5lM-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ToggleButtonCard/ToggleButtonCard.tsx
// component=ToggleButtonCard

import figma from 'figma';

const instance = figma.selectedInstance;

// Get label from the nested Toggle Button instance
const label = (function () {
  const nestedToggleButton = instance.findInstance('Toggle Button');
  if (nestedToggleButton?.type !== 'ERROR') {
    return nestedToggleButton.getString('Label');
  }
  return undefined;
})();

// Content is a SLOT property
const contentSlot = instance.getSlot('Content');
const contentItems = contentSlot?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  id: 'ToggleButtonCard',
  imports: ["import { ToggleButtonCard } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`// This should be wrapped in a ToggleButtonCardGroup, see docs
<ToggleButtonCard${figma.helpers.react.renderProp('label', label)} value="someValue">
  ${contentItems.flat()}
</ToggleButtonCard>`,
  metadata: {
    nestable: true,
    props: { label, contentItems },
  },
};

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&t=Uq6QfQcygdNGv5lM-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/RadioCard/RadioCard.tsx
// component=RadioCard

import figma from 'figma';

const instance = figma.selectedInstance;

const radio = (function () {
  const nestedLayer0 = instance.findText('Label');
  return {
    label: nestedLayer0.type !== 'ERROR' ? nestedLayer0.textContent : undefined,
  };
})();

const contentSlot = instance.getSlot('Content');
const content = contentSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  id: 'RadioCard',
  imports: ["import { RadioCard } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`// This should be wrapped in a RadioCardGroup, see docs
<RadioCard${figma.helpers.react.renderProp('label', radio.label)} value="someValue">
  ${figma.helpers.react.renderChildren(content.flat())}
</RadioCard>`,
  metadata: { nestable: true, props: { radio, content } },
};

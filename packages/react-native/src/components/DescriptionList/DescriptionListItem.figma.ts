// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-5209&t=3uUSBVdxldgG5uz3-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/DescriptionList/DescriptionListItem.tsx
// component=DescriptionListItem

import figma from 'figma';

const heading = figma.selectedInstance.getString('Heading');
const direction = figma.selectedInstance.getEnum('Direction', {
  Row: 'row',
  Column: 'column',
});
const description = figma.selectedInstance.getBoolean('Description?', {
  true: figma.selectedInstance.getString('Description'),
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing content?', {
  true: (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance('Trailing content');
    return {
      trailingContent:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getInstanceSwap('Variant')?.executeTemplate().example
          : undefined,
    };
  })(),
});
const invalidText = figma.selectedInstance.getEnum('State', {
  Invalid: (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance('Validation Text');
    return {
      invalidText: nestedLayer1.type !== 'ERROR' ? nestedLayer1.getString('Text') : undefined,
    };
  })(),
});
const numericValue = figma.selectedInstance.getBoolean('Numerical value?', {
  true: figma.selectedInstance.getString('Numerical value'),
});

export default {
  id: 'DescriptionListItem',
  imports: ["import { DescriptionListItem } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<DescriptionListItem${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent?.trailingContent
  )}${figma.helpers.react.renderProp(
    'invalidText',
    invalidText?.invalidText
  )}${figma.helpers.react.renderProp('numericValue', numericValue)}/>`,
  metadata: {
    nestable: true,
    props: { heading, direction, description, trailingContent, invalidText, numericValue },
  },
};

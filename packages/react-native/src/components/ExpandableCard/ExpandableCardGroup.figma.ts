// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7222-7221&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ExpandableCard/ExpandableCardGroup.tsx
// component=ExpandableCardGroup

import figma from 'figma';

const sectionHeader = figma.selectedInstance.getBoolean('Section header?', {
  true: (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance('Section Header');
    return {
      heading: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('Heading') : undefined,
      helperText:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getBoolean('Helper text?', {
              true: nestedLayer0.getString('Helper text'),
            })
          : undefined,
      trailingContent:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getBoolean('Trailing content?', {
              true: (function () {
                const nestedLayer1 = figma.selectedInstance.findInstance('Trailing content');
                return {
                  headerTrailingContent:
                    nestedLayer1.type !== 'ERROR'
                      ? nestedLayer1.getInstanceSwap('Variant')?.executeTemplate().example
                      : undefined,
                };
              })(),
            })
          : undefined,
      invalidText:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getEnum('State', {
              Invalid: (function () {
                const nestedLayer2 = figma.selectedInstance.findInstance('Validation Text');
                return {
                  invalidText:
                    nestedLayer2.type !== 'ERROR' ? nestedLayer2.getString('Text') : undefined,
                };
              })(),
            })
          : undefined,
    };
  })(),
});
const cardLayers = figma.selectedInstance.findConnectedInstances(n => n.hasCodeConnect());
const cards = cardLayers.map(layer => layer.executeTemplate().example) ?? [];

export default {
  id: 'ExpandableCardGroup',
  imports: ["import { ExpandableCardGroup } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ExpandableCardGroup${figma.helpers.react.renderProp(
    'heading',
    sectionHeader?.heading
  )}${figma.helpers.react.renderProp(
    'helperText',
    sectionHeader?.helperText
  )}${figma.helpers.react.renderProp(
    'headerTrailingContent',
    sectionHeader?.trailingContent?.headerTrailingContent
  )}${figma.helpers.react.renderProp('invalidText', sectionHeader?.invalidText?.invalidText)}>
        ${figma.helpers.react.renderChildren(cards.flat())}
      </ExpandableCardGroup>`,
  metadata: {
    nestable: true,
    props: {
      sectionHeader,
      cards,
    },
  },
};

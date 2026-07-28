// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7247%3A4636
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/DescriptionList/DescriptionList.tsx
// component=DescriptionList

import figma from 'figma';

const sectionHeader = figma.selectedInstance.getBoolean('Section header?', {
  true: (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance('Section Header');
    return {
      heading: nestedLayer2.type !== 'ERROR' ? nestedLayer2.getString('Heading') : undefined,
      helperText:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.getBoolean('Helper text?', {
              true: nestedLayer2.getString('Helper text'),
            })
          : undefined,
      trailingContent:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.getBoolean('Trailing content?', {
              true: (function () {
                const nestedLayer3 = figma.selectedInstance.findInstance('Trailing content');
                return {
                  headerTrailingContent:
                    nestedLayer3.type !== 'ERROR'
                      ? nestedLayer3.getInstanceSwap('Variant')?.executeTemplate().example
                      : undefined,
                };
              })(),
            })
          : undefined,
      invalidText:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.getEnum('State', {
              Invalid: (function () {
                const nestedLayer4 = figma.selectedInstance.findInstance('Validation Text');
                return {
                  invalidText:
                    nestedLayer4.type !== 'ERROR' ? nestedLayer4.getString('Text') : undefined,
                };
              })(),
            })
          : undefined,
    };
  })(),
});
const items = figma.properties.children(['Item']);
const direction = (function () {
  const nestedLayer5 = figma.selectedInstance.findInstance('Item');
  return {
    direction:
      nestedLayer5.type !== 'ERROR'
        ? nestedLayer5.getEnum('Direction', {
            Row: 'row',
            Column: 'column',
          })
        : undefined,
  };
})();

export default {
  id: 'DescriptionList',
  imports: ["import { DescriptionList } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp(
    'heading',
    sectionHeader?.heading
  )}${figma.helpers.react.renderProp(
    'helperText',
    sectionHeader?.helperText
  )}${figma.helpers.react.renderProp(
    'direction',
    direction?.direction
  )}${figma.helpers.react.renderProp(
    'headerTrailingContent',
    sectionHeader?.trailingContent?.headerTrailingContent
  )}${figma.helpers.react.renderProp('invalidText', sectionHeader?.invalidText?.invalidText)}>
        ${figma.helpers.react.renderChildren(items)}
      </DescriptionList>`,
  metadata: { nestable: true, props: { sectionHeader, items, direction } },
};

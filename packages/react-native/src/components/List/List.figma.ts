// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2437%3A621
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/List/List.tsx
// component=List

import figma from 'figma';

const container = figma.selectedInstance.getEnum('Container', {
  'Subtle White': 'subtleWhite',
  'Emphasis White': 'emphasisWhite',
  'Subtle Warm White': 'subtleWarmWhite',
  'Emphasis Warm White': 'emphasisWarmWhite',
});
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
    };
  })(),
});
const listContainer =
  figma.selectedInstance
    .getSlot('List Container')
    ?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  id: 'List',
  imports: ["import { List } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<List${figma.helpers.react.renderProp(
    'container',
    container
  )}${figma.helpers.react.renderProp(
    'heading',
    sectionHeader?.heading
  )}${figma.helpers.react.renderProp(
    'helperText',
    sectionHeader?.helperText
  )}${figma.helpers.react.renderProp(
    'headerTrailingContent',
    sectionHeader?.trailingContent?.headerTrailingContent
  )}>
      ${figma.helpers.react.renderChildren(listContainer.flat())}
    </List>`,
  metadata: {
    nestable: true,
    props: { container, sectionHeader, listContainer },
  },
};

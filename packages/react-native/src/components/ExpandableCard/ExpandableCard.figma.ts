// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7222%3A5935
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ExpandableCard/ExpandableCard.tsx
// component=ExpandableCard

import figma from 'figma';

const expanded = figma.selectedInstance.getBoolean('Expand?');
const heading = figma.selectedInstance.getString('Heading');
const helperText = figma.selectedInstance.getString('Helper text');
const leadingContent = figma.selectedInstance.getBoolean('Leading content?', {
  true: (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance('Leading content');
    return {
      variant:
        nestedLayer3.type !== 'ERROR'
          ? nestedLayer3.getEnum('Variant', {
              Icon: nestedLayer3.getInstanceSwap('Icon-24')?.executeTemplate().example,
              'Icon Container': figma.helpers.react.jsxElement(
                "<IconContainer icon={figma.instance('Icon-24')} />"
              ),
            })
          : undefined,
    };
  })(),
});
const content = figma.selectedInstance.getInstanceSwap('Custom content')?.executeTemplate().example;
const numericalValue = figma.selectedInstance.getBoolean('Numerical value?', {
  true: figma.selectedInstance.getString('Numerical value'),
});
const badge = figma.selectedInstance.getBoolean('Badge?', {
  true: figma.selectedInstance.getInstanceSwap('Badge')?.executeTemplate().example,
});
const slot = figma.selectedInstance.getSlot('Slot');
const expandedContentItems = slot?.connectedInstances.map(i => i.executeTemplate().example) ?? [];
// An empty array passed to renderProp() renders as broken, unparseable `prop={}` syntax
// instead of being omitted — only pass it through when there's actually something to render.
const expandedContent = expandedContentItems.length > 0 ? expandedContentItems.flat() : undefined;

export default {
  id: 'ExpandableCard',
  imports: ["import { ExpandableCard } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ExpandableCard${figma.helpers.react.renderProp(
    'expanded',
    expanded
  )}${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent?.variant
  )}${figma.helpers.react.renderProp(
    'numericValue',
    numericalValue
  )}${figma.helpers.react.renderProp('badge', badge)}${figma.helpers.react.renderProp(
    'expandedContent',
    expandedContent
  )}>
        ${figma.helpers.react.renderChildren(content)}
      </ExpandableCard>`,
  metadata: {
    nestable: true,
    props: {
      expanded,
      heading,
      helperText,
      leadingContent,
      content,
      numericalValue,
      badge,
      expandedContent,
    },
  },
};

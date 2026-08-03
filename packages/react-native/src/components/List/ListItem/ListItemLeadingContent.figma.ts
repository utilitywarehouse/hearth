// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6732%3A5792
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/List/ListItem/ListItemLeadingContent.tsx
// component=ListItemLeadingContent

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Icon: 'icon',
  'Icon Container': 'iconContainer',
  Avatar: 'avatar',
  Indicator: 'indicator',
});
const icon = figma.selectedInstance.getInstanceSwap('Icon-24');

export default {
  id: 'ListItemLeadingContent',
  imports: ["import { ListItemLeadingContent } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ListItemLeadingContent${figma.helpers.react.renderProp(
    'variant',
    variant
  )} />`,
  metadata: { nestable: true, props: { variant, icon } },
};

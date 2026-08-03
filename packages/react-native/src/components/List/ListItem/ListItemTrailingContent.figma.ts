// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=9852%3A9858
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/List/ListItem/ListItemTrailingContent.tsx
// component=ListItemTrailingContent

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Link: 'link',
  Button: 'button',
});

export default {
  id: 'ListItemTrailingContent',
  imports: ["import { ListItemTrailingContent } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ListItemTrailingContent${figma.helpers.react.renderProp(
    'variant',
    variant
  )} />`,
  metadata: { nestable: true, props: { variant } },
};

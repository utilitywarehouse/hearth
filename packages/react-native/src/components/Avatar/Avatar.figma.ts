// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6790-14313
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Avatar/Avatar.tsx
// component=Avatar

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const name = figma.selectedInstance.getString('Initials');
const src = figma.selectedInstance.getInstanceSwap('Image')?.executeTemplate().example;
const variant = figma.selectedInstance.getEnum('Variant', {
  Image: 'image',
  Initials: 'initials',
  Icon: 'icon',
});

export default {
  id: 'Avatar',
  imports: ["import { Avatar } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Avatar${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('name', name)}${figma.helpers.react.renderProp('src', src)}/>`,
  metadata: {
    nestable: true,
    props: {
      size,
      name,
      src,
      variant,
    },
  },
};

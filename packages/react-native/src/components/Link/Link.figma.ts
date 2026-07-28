// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=163%3A562
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Link/Link.tsx
// component=Link

import figma from 'figma';

const iconRight = figma.selectedInstance.getBoolean('Icon right?');
const iconLeft = figma.selectedInstance.getBoolean('Icon left?');
const inverted = figma.selectedInstance.getEnum('Inverted?', {
  True: true,
  False: false,
});
const text = figma.selectedInstance.getString('Text');

const showIcon = iconRight || iconLeft;
const iconPosition = iconRight ? 'right' : iconLeft ? 'left' : undefined;

const iconRightSwap = figma.selectedInstance
  .getInstanceSwap('Icon right-20')
  ?.executeTemplate().example;
const iconLeftSwap = figma.selectedInstance
  .getInstanceSwap('Icon left-20')
  ?.executeTemplate().example;

const icon = iconRight ? iconRightSwap : iconLeftSwap;

export default {
  id: 'Link',
  imports: ["import { Link } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Link${figma.helpers.react.renderProp(
    'inverted',
    inverted
  )}${figma.helpers.react.renderProp('showIcon', showIcon)}${figma.helpers.react.renderProp(
    'iconPosition',
    iconPosition
  )}${figma.helpers.react.renderProp('icon', icon)}>
      ${figma.helpers.react.renderChildren(text)}
    </Link>`,
  metadata: {
    nestable: true,
    props: {
      iconRight,
      iconLeft,
      inverted,
      text,
      showIcon,
      iconPosition,
      iconRightSwap,
      iconLeftSwap,
      icon,
    },
  },
};

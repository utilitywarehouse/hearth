// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6790-14313&m=dev
// source=../src/components/Avatar/Avatar.tsx
// component=Avatar
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const name = instance.getString('Initials');
// Variant=Image (with its Image instance-swap) is deliberately unmapped: `src` needs a real
// image URL string, and the Figma swap only points to a decorative placeholder instance, not a
// URL - there's no live data to bind to `src`.

export default {
  example: figma.code`<Avatar${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('name', name)} />`,
  imports: ['import { Avatar } from "@utilitywarehouse/hearth-react"'],
  id: 'avatar',
  metadata: { nestable: true },
};

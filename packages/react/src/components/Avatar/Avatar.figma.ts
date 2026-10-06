// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6790-14313&m=dev
// source=./Avatar.tsx
// component=Avatar
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const isImageVariant = instance.getEnum('Variant', { Image: true });
const name = instance.getString('Initials');

export default {
  example: figma.code`<Avatar${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('name', name)}${isImageVariant ? figma.code`src="https://your-image-url"` : ''} />`,
  imports: ['import { Avatar } from "@utilitywarehouse/hearth-react"'],
  id: 'avatar',
  metadata: { nestable: true },
};

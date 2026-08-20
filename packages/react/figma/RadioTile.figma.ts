// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13222&m=dev
// source=../src/components/RadioTile/RadioTile.tsx
// component=RadioTile
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const hasImage = instance.getBoolean('Image?');
const imageInstance = hasImage ? instance.findInstance('Radio Image') : undefined;
const imageSlot =
  imageInstance && imageInstance.type !== 'ERROR' ? imageInstance.getSlot('Image Slot') : undefined;
const image = imageSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];
const hasBadge = instance.getBoolean('Badge?');
const badgeInstance = hasBadge ? instance.findInstance('Badge') : undefined;
const badge =
  badgeInstance && badgeInstance.type !== 'ERROR'
    ? badgeInstance.executeTemplate().example
    : undefined;

export default {
  id: 'radio-tile',
  imports: ['import { RadioTile } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<RadioTile${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${image.length ? figma.code` image={${image.flat()}}` : ''}${badge ? figma.code` badge={${badge}}` : ''} />`,
  metadata: { nestable: true },
};

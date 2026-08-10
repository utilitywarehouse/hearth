// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7428-12685&m=dev
// source=../src/components/Radio/Radio.tsx
// component=Radio
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

export default {
  id: 'radio',
  imports: ['import { Radio } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<Radio${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${image.length ? figma.code` image={${image.flat()}}` : ''} />`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3087-7316&m=dev
// source=./Checkbox.tsx
// component=Checkbox
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
});
const validationText = instance.getEnum('State', {
  Invalid: instance.getString('Validation text'),
});

const showImage = instance.getBoolean('Image?');
const imageInstance =
  showImage && instance.findInstance('Checkbox Image').type !== 'ERROR'
    ? instance.findInstance('Checkbox Image')
    : undefined;
const imageSlot = imageInstance?.getSlot('Image Slot');
const image = imageSlot?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  example: figma.code`<Checkbox${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}${
    image && image.length > 0 ? figma.code` image={${image.flat().join('')}}` : ''
  }/>`,
  imports: ['import { Checkbox } from "@utilitywarehouse/hearth-react"'],
  id: 'checkbox',
  metadata: { nestable: true },
};

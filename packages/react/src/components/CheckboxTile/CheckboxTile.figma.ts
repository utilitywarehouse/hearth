// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4961-23797&m=dev
// source=./CheckboxTile.tsx
// component=CheckboxTile
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationStatus = instance.getEnum('State', {
  Default: undefined,
  Invalid: 'invalid',
  Focus: undefined,
});
// validationText is a placeholder because the Figma component's validation text node doesn't expose content as a property
const validationText = validationStatus === 'invalid' ? 'Validation message' : undefined;

const showImage = instance.getBoolean('Image?');
const imageInstance =
  showImage && instance.findInstance('Checkbox Image').type !== 'ERROR'
    ? instance.findInstance('Checkbox Image')
    : undefined;
const imageSlot = imageInstance?.getSlot('Image Slot');
const image = imageSlot?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  example: figma.code`<CheckboxTile${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}${
    image && image.length > 0 ? figma.code` image={${image.flat().join('')}}` : ''
  }/>`,
  imports: ['import { CheckboxTile } from "@utilitywarehouse/hearth-react"'],
  id: 'checkbox-tile',
  metadata: { nestable: true },
};

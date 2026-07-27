// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4961-23797&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Checkbox/Checkbox.tsx
// component=Checkbox

import figma from 'figma';

const validationStatus = figma.selectedInstance.getEnum('State', {
  Invalid: 'invalid',
});
const checked = figma.selectedInstance.getBoolean('Checked?');
const label = figma.selectedInstance.getString('Label');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
  false: undefined,
});
const showImage = figma.selectedInstance.getBoolean('Image?');
const imageInstance = figma.selectedInstance.findInstance('Checkbox Image');
const image = showImage ? imageInstance?.executeTemplate().example : undefined;

export default {
  id: 'CheckboxTile',
  imports: ["import { Checkbox } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Checkbox type="tile"${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('checked', checked)}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'image',
    image
  )}/>`,
  metadata: { nestable: true, props: { validationStatus, checked, label, helperText, image } },
};

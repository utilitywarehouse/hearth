// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7428-12685&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Radio/Radio.tsx
// component=Radio

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const image = figma.selectedInstance.getBoolean('Image?', {
  true: figma.selectedInstance.findInstance('Radio Image')?.executeTemplate().example,
});

export default {
  id: 'Radio',
  imports: ["import { Radio } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Radio${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'image',
    image
  )} value="someValue"/>`,
  metadata: { nestable: true, props: { label, helperText, image } },
};

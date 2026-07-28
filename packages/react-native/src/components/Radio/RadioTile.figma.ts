// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13222&t=Uq6QfQcygdNGv5lM-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Radio/Radio.tsx
// component=RadioTile

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const badgeLayers = figma.selectedInstance.findLayers(
  i => i.type === 'INSTANCE' && (i.name || '').includes('Badge')
);
const badge = figma.selectedInstance.getBoolean('Badge?', {
  true:
    badgeLayers.length > 0 && badgeLayers[0].type === 'INSTANCE'
      ? badgeLayers[0].executeTemplate().example
      : undefined,
});
const image = figma.selectedInstance.getBoolean('Image?', {
  true: figma.selectedInstance.findInstance('Radio Image')?.executeTemplate().example,
});

export default {
  id: 'RadioTile',
  imports: ["import { RadioTile } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<RadioTile${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'badge',
    badge
  )}${figma.helpers.react.renderProp('image', image)} value="someValue"/>`,
  metadata: { nestable: true, props: { label, helperText, badge, image } },
};

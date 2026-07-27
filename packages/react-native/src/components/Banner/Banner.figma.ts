// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=12512-3903&t=wLfy4ZMrZsHup0oB-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Banner/Banner.tsx
// component=Banner

import figma from 'figma';

const instance = figma.selectedInstance;

const headingText = instance.findText('Banner heading');
const heading =
  (headingText.type !== 'ERROR' ? headingText.textContent : undefined) || 'The banner heading';
const descriptionText = instance.findText('Description');
const description =
  (descriptionText.type !== 'ERROR' ? descriptionText.textContent : undefined) ||
  'The text in the banner';

const direction = instance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});

const imageSlot = instance.getSlot('Image');
const image2Slot = instance.getSlot('Image2');
const image =
  imageSlot?.connectedInstances[0]?.executeTemplate().example ??
  image2Slot?.connectedInstances[0]?.executeTemplate().example;

const onClose = instance.getBoolean('Close?', {
  true: figma.helpers.react.function("() => console.log('Close pressed')"),
  false: undefined,
});

const button = instance.getBoolean('Button?', {
  true: figma.properties.children(['Button']),
});

const link = instance.getBoolean('Link?', {
  true: figma.properties.children(['Link']),
});

const onPress = instance.getBoolean('Chevron?', {
  true: figma.helpers.react.function("() => console.log('Banner pressed')"),
  false: undefined,
});

export default {
  id: 'Banner',
  imports: ["import { Banner } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Banner${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp(
    'direction',
    direction
  )}${figma.helpers.react.renderProp('image', image)}${figma.helpers.react.renderProp(
    'button',
    button
  )}${figma.helpers.react.renderProp('link', link)}${figma.helpers.react.renderProp(
    'onPress',
    onPress
  )}${figma.helpers.react.renderProp('onClose', onClose)} />`,
  metadata: {
    nestable: true,
    props: { heading, description, direction, image, button, link, onPress, onClose },
  },
};

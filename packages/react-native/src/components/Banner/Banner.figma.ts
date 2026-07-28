// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8294-3905&m=dev
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

const rawDirection = instance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});
// getEnum() can resolve to a non-string sentinel when Direction can't be matched to either
// option — always fall back to the component's own default ('horizontal') rather than pass
// that sentinel through to renderProp, which renders it as broken, unparseable syntax.
const direction = typeof rawDirection === 'string' ? rawDirection : 'horizontal';

const imageSlot = instance.getSlot('Image');
const image2Slot = instance.getSlot('Image2');
const image =
  imageSlot?.connectedInstances[0]?.executeTemplate().example ??
  image2Slot?.connectedInstances[0]?.executeTemplate().example;

const showClose = instance.getBoolean('Close?');
const onClose =
  showClose === true
    ? figma.helpers.react.function("() => console.log('Close pressed')")
    : undefined;

const showButton = instance.getBoolean('Button?');
const buttonInstance = instance.findInstance('Button');
const button =
  showButton && buttonInstance.type !== 'ERROR'
    ? buttonInstance.executeTemplate().example
    : undefined;

const showLink = instance.getBoolean('Link?');
const linkInstance = instance.findInstance('Link');
const link =
  showLink && linkInstance.type !== 'ERROR' ? linkInstance.executeTemplate().example : undefined;

const showChevron = instance.getBoolean('Chevron?');
const onPress =
  showChevron === true
    ? figma.helpers.react.function("() => console.log('Banner pressed')")
    : undefined;

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

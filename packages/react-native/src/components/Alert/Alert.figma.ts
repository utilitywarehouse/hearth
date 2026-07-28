// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3288%3A4656
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Alert/Alert.tsx
// component=Alert

import figma from 'figma';

const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  Info: 'info',
  Positive: 'positive',
  Warning: 'warning',
  Danger: 'danger',
});
const showIconButton = figma.selectedInstance.getBoolean('Icon button?');
const onPressIconButton =
  showIconButton === true
    ? figma.helpers.react.function("() => console.log('icon button pressed')")
    : undefined;
const text = figma.selectedInstance.getString('Text');
const showClose = figma.selectedInstance.getBoolean('Close?');
const onClose =
  showClose === true ? figma.helpers.react.function("() => console.log('close')") : undefined;
const title = figma.selectedInstance.getBoolean('Title?', {
  true: figma.selectedInstance.getString('Title'),
  false: undefined,
});
const showLinkPress = figma.selectedInstance.getBoolean('Link?');
const onPressLink =
  showLinkPress === true
    ? figma.helpers.react.function("() => console.log('link pressed')")
    : undefined;
const link = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Link');
  return {
    text: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('Text') : undefined,
  };
})();

export default {
  id: 'Alert',
  imports: ['import { Alert } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<Alert${figma.helpers.react.renderProp(
    'colorScheme',
    colorScheme
  )}${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp(
    'text',
    text
  )}${figma.helpers.react.renderProp('onClose', onClose)}${figma.helpers.react.renderProp(
    'onPressIconButton',
    onPressIconButton
  )}${figma.helpers.react.renderProp('link', link.text)}${figma.helpers.react.renderProp(
    'onPressLink',
    onPressLink
  )}/>`,
  metadata: {
    nestable: true,
    props: { colorScheme, onPressIconButton, text, onClose, title, onPressLink, link },
  },
};

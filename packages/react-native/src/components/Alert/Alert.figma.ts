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
const iconButton = figma.selectedInstance.getBoolean('Icon button?', {
  true: figma.helpers.react.function("() => console.log('icon button pressed')"),
  false: undefined,
});
const text = figma.selectedInstance.getString('Text');
const close = figma.selectedInstance.getBoolean('Close?', {
  true: figma.helpers.react.function("() => console.log('close')"),
  false: undefined,
});
const title = figma.selectedInstance.getBoolean('Title?', {
  true: figma.selectedInstance.getString('Title'),
  false: undefined,
});
const showLink = figma.selectedInstance.getBoolean('Link?', {
  true: figma.helpers.react.function("() => console.log('link pressed')"),
  false: undefined,
});
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
  )}${figma.helpers.react.renderProp('onClose', close)}${figma.helpers.react.renderProp(
    'onPressIconButton',
    iconButton
  )}${figma.helpers.react.renderProp('link', link.text)}${figma.helpers.react.renderProp(
    'onPressLink',
    showLink
  )}/>`,
  metadata: {
    nestable: true,
    props: { colorScheme, iconButton, text, close, title, showLink, link },
  },
};

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3288-4656&m=dev
// source=./Alert.tsx
// component=Alert
import figma from 'figma';
const instance = figma.selectedInstance;

const colorScheme = instance.getEnum('Color Scheme', {
  Danger: 'danger',
  Info: 'info',
  Positive: 'positive',
  Warning: 'warning',
});
const title = instance.getBoolean('Title?', {
  true: instance.getString('Title'),
  false: undefined,
});
const text = instance.getString('Text');
const showLink = figma.selectedInstance.getBoolean('Link?');
const link = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Link');
  return {
    text: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('Text') : undefined,
  };
})();
const showIconButton = figma.selectedInstance.getBoolean('Icon button?');
const showChild = showLink || showIconButton;
const closable = instance.getBoolean('Close?');

export default {
  example: figma.code`<Alert${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp('text', text)}${closable ? figma.code` onClose={() => {}}` : ''} ${showChild ? '' : '/'}>${showLink ? figma.code`<AlertLink${figma.helpers.react.renderProp('text', link.text)} />` : ''}${showIconButton ? figma.code`<AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />` : ''}${showChild ? figma.code`</Alert>` : ''}`,
  imports: [
    `import { Alert${showLink ? ', AlertLink' : ''}${showIconButton ? ', AlertIconButton' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'alert',
  metadata: { nestable: true },
};

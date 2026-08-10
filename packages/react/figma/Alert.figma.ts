// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3288-4656&m=dev
// source=../src/components/Alert/Alert.tsx
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
// Link? and Icon button? render as nested AlertLink/custom child components, not direct Alert
// props - matching the accepted Accordion Link-vs-Badge pattern for nested content.
const closable = instance.getBoolean('Close?');

export default {
  example: figma.code`<Alert${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp('text', text)}${closable ? figma.code` onClose={() => {}}` : ''} />`,
  imports: ['import { Alert } from "@utilitywarehouse/hearth-react"'],
  id: 'alert',
  metadata: { nestable: true },
};

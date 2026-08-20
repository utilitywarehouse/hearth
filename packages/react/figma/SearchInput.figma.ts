// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1311&m=dev
// source=../src/components/SearchInput/SearchInput.tsx
// component=SearchInput
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const hideLabel = !instance.getBoolean('Label?');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const loading = instance.getEnum('State', {
  Filled: false,
  Loading: true,
  Placeholder: false,
});
const value = instance.getString('Value');

export default {
  example: figma.code`<SearchInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('hideLabel', hideLabel)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp('value', value)}/>`,
  imports: ['import { SearchInput } from "@utilitywarehouse/hearth-react"'],
  id: 'search-input',
};

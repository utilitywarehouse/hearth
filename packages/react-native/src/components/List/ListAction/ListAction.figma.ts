// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=9661%3A5128
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/List/ListAction/ListAction.tsx
// component=ListAction

import figma from 'figma';

const heading = figma.selectedInstance.getString('Action heading');
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const loading = figma.selectedInstance.getEnum('State', {
  Loading: true,
});

export default {
  id: 'ListAction',
  imports: ["import { ListAction } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ListAction${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp(
    'loading',
    loading
  )}/>`,
  metadata: { nestable: true, props: { heading, disabled, loading } },
};

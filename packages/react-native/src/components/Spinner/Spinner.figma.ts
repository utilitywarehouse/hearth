// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=61%3A195
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Spinner/Spinner.tsx
// component=Spinner

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  'XS-20': 'xs',
  'SM-24': 'sm',
  'MD-32': 'md',
  'LG-44': 'lg',
});

export default {
  id: 'Spinner',
  imports: ["import { Spinner } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Spinner${figma.helpers.react.renderProp('size', size)}/>`,
  metadata: { nestable: true, props: { size } },
};

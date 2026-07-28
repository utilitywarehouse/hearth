// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6414%3A8697&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Roundel/Roundel.tsx
// component=Roundel

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Success: 'success',
  Pending: 'pending',
  Error: 'error',
});

export default {
  id: 'Roundel',
  imports: ["import { Roundel } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Roundel${figma.helpers.react.renderProp('variant', variant)} />`,
  metadata: { nestable: true, props: { variant } },
};

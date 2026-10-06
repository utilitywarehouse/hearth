// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3044-243&m=dev
// source=./Switch.tsx
// component=Switch
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'MD-32': 'md',
  'SM-24': 'sm',
});

export default {
  example: figma.code`<Switch${figma.helpers.react.renderProp('size', size)} />`,
  imports: ['import { Switch } from "@utilitywarehouse/hearth-react"'],
  id: 'switch',
  metadata: { nestable: true },
};

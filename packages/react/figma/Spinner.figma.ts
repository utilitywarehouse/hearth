// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=61-195&m=dev
// source=../src/components/Spinner/Spinner.tsx
// component=Spinner
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'XS-20': 'xs',
  'SM-24': 'sm',
  'MD-32': 'md',
  'LG-44': 'lg',
});

export default {
  example: figma.code`<Spinner${figma.helpers.react.renderProp('size', size)} />`,
  imports: ['import { Spinner } from "@utilitywarehouse/hearth-react"'],
  id: 'spinner',
};

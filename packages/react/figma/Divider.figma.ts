// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2421-1687&m=dev
// source=../src/components/Divider/Divider.tsx
// component=Divider
import figma from 'figma';
const instance = figma.selectedInstance;

const orientation = instance.getEnum('Orientation', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});

export default {
  example: figma.code`<Divider${figma.helpers.react.renderProp('orientation', orientation)} decorative />`,
  imports: ['import { Divider } from "@utilitywarehouse/hearth-react"'],
  id: 'divider',
};

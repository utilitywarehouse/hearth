// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9617-42123&m=dev
// source=../src/components/Breadcrumbs/Breadcrumbs.tsx
// component=Breadcrumbs
import figma from 'figma';
const instance = figma.selectedInstance;

const inverted = instance.getBoolean('Inverted?');
const children = figma.properties.children(['Breadcrumb']);

export default {
  example: figma.code`<Breadcrumbs${figma.helpers.react.renderProp('inverted', inverted)}>${figma.helpers.react.renderChildren(children)}</Breadcrumbs>`,
  imports: ['import { Breadcrumbs } from "@utilitywarehouse/hearth-react"'],
  id: 'breadcrumbs',
  metadata: { nestable: true },
};

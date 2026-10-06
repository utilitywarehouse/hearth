// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5187-1428&m=dev
// source=./BreadcrumbItem.tsx
// component=BreadcrumbItem
import figma from 'figma';
const instance = figma.selectedInstance;

const currentPage = instance.getBoolean('Current page?');
const children = currentPage ? instance.getString('Current page') : instance.getString('Text');
// Inverted? is left unmapped: BreadcrumbItemProps inherits `inverted` from LinkProps, but the
// component always overrides it from BreadcrumbsContext (the parent Breadcrumbs' own `inverted`
// prop), so it can't be set independently per item.

export default {
  example: figma.code`<BreadcrumbItem${figma.helpers.react.renderProp('currentPage', currentPage)}>${figma.helpers.react.renderChildren(children)}</BreadcrumbItem>`,
  imports: ['import { BreadcrumbItem } from "@utilitywarehouse/hearth-react"'],
  id: 'breadcrumb-item',
  metadata: { nestable: true },
};

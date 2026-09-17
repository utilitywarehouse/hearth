// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6416-5836&m=dev
// source=./Pagination.tsx
// component=Pagination
import figma from 'figma';

const instance = figma.selectedInstance;

const condensed = instance.getEnum('Condensed?', {
  False: false,
  True: true,
});

const hideSkipButtons = instance.getBoolean('Skip?', {
  true: false,
  false: true,
});

export default {
  example: figma.code`<Pagination currentPage={1} totalPages={10} onPageChange={() => {}}${figma.helpers.react.renderProp('condensed', condensed)}${figma.helpers.react.renderProp('hideSkipButtons', hideSkipButtons)} />`,
  imports: ['import { Pagination } from "@utilitywarehouse/hearth-react"'],
  id: 'pagination',
};

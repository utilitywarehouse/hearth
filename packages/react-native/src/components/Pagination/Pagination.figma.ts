// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6416-5836&t=pZwKJYFo1y1QRQD1-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Pagination/Pagination.tsx
// component=Pagination

import figma from 'figma';

const condensed = figma.selectedInstance.getEnum('Condensed?', {
  False: false,
  True: true,
});
const hideSkipButtons = !figma.selectedInstance.getBoolean('Skip?');

export default {
  id: 'pagination',
  imports: ["import { Pagination } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Pagination currentPage={1} totalPages={10} onPageChange={() => {}}${figma.helpers.react.renderProp(
    'condensed',
    condensed
  )}${figma.helpers.react.renderProp('hideSkipButtons', hideSkipButtons)}/>`,
  metadata: {
    props: {
      condensed,
      hideSkipButtons,
    },
  },
};

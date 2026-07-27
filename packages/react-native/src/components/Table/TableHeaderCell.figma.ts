// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6414-6728&t=pZwKJYFo1y1QRQD1-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Table/TableHeaderCell.tsx
// component=TableHeaderCell

import figma from 'figma';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { TableHeaderCell } from '@utilitywarehouse/hearth-react-native';

const instance = figma.selectedInstance;

const sort = instance.getBoolean('Sort?');
const color = instance.getEnum('Color', {
  Purple: 'purple',
  White: 'white',
});
const variant = instance.getEnum('Variant', {
  Text: 'text',
  Blank: 'blank',
});

const trailingContent = sort
  ? figma.code`<UnstyledIconButton accessibilityLabel="Sort" icon={ExpandSmallIcon} size="sm" />`
  : '';

export default {
  id: 'TableHeaderCell',
  imports: [
    "import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';",
    "import { UnstyledIconButton, TableHeaderCell } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`<TableHeaderCell${figma.helpers.react.renderProp('color', color)}${
    trailingContent ? ` trailingContent={${trailingContent}}` : ''
  }>
      Header
    </TableHeaderCell>`,
  metadata: {
    nestable: true,
    props: { sort, color, variant },
  },
};

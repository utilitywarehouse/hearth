// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3797-6383&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/DatePicker/DatePicker.tsx
// component=DatePicker

import figma from 'figma';

const header = figma.selectedInstance.getBoolean('Header?', {
  true: false,
  false: true,
});
const footer = figma.selectedInstance.getBoolean('Footer?', {
  true: false,
  false: true,
});
const initialView = figma.selectedInstance.getEnum('Type', {
  Day: undefined,
  Month: 'month',
  Year: 'year',
});

export default {
  id: 'date-picker',
  imports: ['import { DatePicker } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<DatePicker mode="single"${figma.helpers.react.renderProp(
    'hideFooter',
    footer
  )}${figma.helpers.react.renderProp('hideHeader', header)}${figma.helpers.react.renderProp(
    'initialView',
    initialView
  )} />`,
  metadata: { nestable: true, props: { header, footer, initialView } },
};

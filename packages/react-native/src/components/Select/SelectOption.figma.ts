// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3394-3663&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Select/SelectOption.tsx
// component=SelectOption

import figma from 'figma';

const label = figma.selectedInstance.getString('Text');
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const rawSelected = figma.selectedInstance.getBoolean('Selected?#3481:0');
// getBoolean() can resolve to a non-boolean sentinel when the property can't be cleanly
// matched (this node has a duplicate "Selected?" property disambiguated by id) — always fall
// back to a real boolean rather than pass that sentinel through to renderProp, which renders
// it as broken, unparseable syntax.
const selected = typeof rawSelected === 'boolean' ? rawSelected : false;

export default {
  id: 'SelectOption',
  imports: ["import { SelectOption } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<SelectOption${figma.helpers.react.renderProp(
    'label',
    label
  )} value="some value"${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('selected', selected)}/>`,
  metadata: {
    nestable: true,
    props: {
      label,
      disabled,
      selected,
    },
  },
};

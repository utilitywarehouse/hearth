// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3141-4275&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Checkbox/CheckboxGroup.tsx
// component=CheckboxGroup

import figma from 'figma';

const label = figma.selectedInstance.getString('Group label');
const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  Heading: 'heading',
  Body: 'body',
});
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
  false: undefined,
});
const direction = figma.selectedInstance.getEnum('Direction', {
  Column: undefined,
  Row: 'row',
});
const validationStatus = figma.selectedInstance.getEnum('State', {
  Invalid: 'invalid',
});
const invalidText = figma.selectedInstance.getString('Validation text');
const content = figma.selectedInstance.getPropertyValue('Content');
const tiles = figma.properties.children(['Checkbox Tile']);
const checkboxes = figma.properties.children(['Checkbox']);

const isTile = content === 'Checkbox Tile';
const children = isTile ? tiles : checkboxes;

export default {
  id: 'CheckboxGroup',
  imports: ["import { CheckboxGroup } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<CheckboxGroup${isTile ? ` type="tile"` : ''}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp('direction', direction)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}>
    ${figma.helpers.react.renderChildren(children)}
  </CheckboxGroup>`,
  metadata: {
    nestable: true,
    props: {
      label,
      labelVariant,
      helperText,
      direction,
      validationStatus,
      invalidText,
      tiles,
      checkboxes,
    },
  },
};

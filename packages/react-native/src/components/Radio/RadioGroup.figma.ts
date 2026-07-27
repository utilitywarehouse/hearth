// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13254&t=Uq6QfQcygdNGv5lM-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Radio/RadioGroup.tsx
// component=RadioGroup

import figma from 'figma';

const label = figma.selectedInstance.getString('Group label');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const validationStatus = figma.selectedInstance.getEnum('State', {
  Invalid: 'invalid',
});
const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const direction = figma.selectedInstance.getEnum('Direction', {
  Row: 'row',
  Column: 'column',
});
const invalidText = figma.selectedInstance.getEnum('State', {
  Invalid: figma.selectedInstance.getString('Validation text'),
});
const content = figma.selectedInstance.getPropertyValue('Content');
const type = content === 'Radio Tile' ? 'tile' : 'default';
const childLayers = figma.selectedInstance.findLayers(i => i.type === 'INSTANCE');
const items = childLayers
  .filter(i => {
    if (i.type !== 'INSTANCE') return false;
    const name = i.name || '';
    return (
      (content === 'Radio Tile' && name.includes('Radio Tile')) ||
      (content === 'Radio' && name.includes('Radio') && !name.includes('Radio Tile'))
    );
  })
  .map(i => (i.type === 'INSTANCE' ? i.executeTemplate().example : ''));

export default {
  id: 'RadioGroup',
  imports: ["import { RadioGroup } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<RadioGroup${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp(
    'direction',
    direction
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${
    type === 'tile' ? ' type="tile"' : ''
  } value={value} onChange={value => setValue(value)}>
    ${items.flat()}
  </RadioGroup>`,
  metadata: {
    nestable: true,
    props: { label, helperText, validationStatus, labelVariant, direction, invalidText, type },
  },
};

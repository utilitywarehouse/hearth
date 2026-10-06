// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&m=dev
// source=./ToggleButtonCard.tsx
// component=ToggleButtonCard
import figma from 'figma';
const instance = figma.selectedInstance;

// This node ("Selectable Card") also backs RadioCard via its 'Radio' variant
// (../RadioCard/RadioCard.tsx) — Code Connect's template format requires one file per
// node, so both branches live here rather than in two separate .figma.ts files.
const variant = instance.getEnum('Variant', {
  'Toggle Button': 'toggle-button',
  Radio: 'radio',
});

const content =
  instance.getSlot('Content')?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

let template;
if (variant === 'toggle-button') {
  const toggleButtonInstance = instance.findInstance('Toggle Button');
  const label =
    toggleButtonInstance && toggleButtonInstance.type !== 'ERROR'
      ? toggleButtonInstance.getString('Label')
      : undefined;

  template = {
    example: figma.code`/* Related ToggleButtonCard components must be wrapped in a ToggleGroup */
  <ToggleButtonCard${figma.helpers.react.renderProp('label', label)}>${content.flat()}</ToggleButtonCard>`,
    imports: ['import { ToggleButtonCard } from "@utilitywarehouse/hearth-react"'],
    id: 'toggle-button-card',
    metadata: { nestable: true },
  };
} else if (variant === 'radio') {
  const labelText = instance.findText('Label');
  const label = labelText && labelText.type !== 'ERROR' ? labelText.textContent : undefined;

  template = {
    example: figma.code`/* Related RadioCard components must be wrapped in a RadioGroup */
  <RadioCard${figma.helpers.react.renderProp('label', label)}>${content.flat()}</RadioCard>`,
    imports: ['import { RadioCard } from "@utilitywarehouse/hearth-react"'],
    id: 'radio-card',
    metadata: { nestable: true },
  };
}

export default template;

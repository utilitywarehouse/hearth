// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9092-3352&m=dev
// source=../src/components/SectionHeader/SectionHeader.tsx
// component=SectionHeader
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getString('Heading');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const badge = instance.getBoolean('Badge?', {
  true: instance.findInstance('Badge')?.executeTemplate().example,
  false: undefined,
});
// Trailing content's Link/Button Code Connect files are still legacy .figma.tsx format (UWDS-4757),
// so they can't be resolved via executeTemplate() yet.
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
});
const validationTextInstance =
  validationStatus === 'invalid' ? instance.findInstance('Validation Text') : undefined;
const validationText =
  validationTextInstance && validationTextInstance.type !== 'ERROR'
    ? validationTextInstance.getString('Text')
    : undefined;

export default {
  example: figma.code`<SectionHeader${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${badge ? figma.code` trailingContent={${badge}}` : ''}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)} />`,
  imports: ['import { SectionHeader } from "@utilitywarehouse/hearth-react"'],
  id: 'section-header',
};

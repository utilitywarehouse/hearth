// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8136-2095&m=dev
// source=../src/components/ValidationText/ValidationText.tsx
// component=ValidationText
import figma from 'figma';
const instance = figma.selectedInstance;

const children = instance.getString('Text');
const status = instance.getEnum('Validation', {
  Invalid: 'invalid',
  Valid: 'valid',
});

export default {
  example: figma.code`<ValidationText${figma.helpers.react.renderProp('status', status)}>${figma.helpers.react.renderChildren(children)}</ValidationText>`,
  imports: ['import { ValidationText } from "@utilitywarehouse/hearth-react"'],
  id: 'validation-text',
  metadata: { nestable: true },
};

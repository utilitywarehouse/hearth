// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=9092%3A3352
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/SectionHeader/SectionHeader.tsx
// component=SectionHeader

import figma from 'figma';

const state = figma.selectedInstance.getEnum('State', {
  Invalid: 'invalid',
  Default: 'default',
});
const heading = figma.selectedInstance.getString('Heading');
const helperTextVisible = figma.selectedInstance.getBoolean('Helper text?');
const helperText = helperTextVisible ? figma.selectedInstance.getString('Helper text') : undefined;
const badgeVisible = figma.selectedInstance.getBoolean('Badge?');
const badge = badgeVisible
  ? figma.selectedInstance.findInstance('Badge')?.executeTemplate().example
  : undefined;
const trailingContentVisible = figma.selectedInstance.getBoolean('Trailing content?');
const trailingContent = trailingContentVisible
  ? (() => {
      const trailingContentInstance = figma.selectedInstance.findInstance('Trailing content');
      const link =
        trailingContentInstance.type === 'INSTANCE'
          ? trailingContentInstance.findInstance('Link')
          : undefined;
      return link?.executeTemplate().example;
    })()
  : undefined;
const invalidText =
  state === 'invalid'
    ? (() => {
        const validationText = figma.selectedInstance.findInstance('Validation Text');
        return validationText.type === 'INSTANCE' ? validationText.getString('Text') : undefined;
      })()
    : undefined;

export default {
  id: 'section-header',
  imports: ["import { SectionHeader } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<SectionHeader${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'badge',
    badge
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}/>`,
  metadata: {
    nestable: true,
    props: {
      state,
      heading,
      helperTextVisible,
      helperText,
      badgeVisible,
      badge,
      trailingContentVisible,
      trailingContent,
      invalidText,
    },
  },
};

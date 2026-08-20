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
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
});
const validationTextInstance =
  validationStatus === 'invalid' ? instance.findInstance('Validation Text') : undefined;
const validationText =
  validationTextInstance && validationTextInstance.type !== 'ERROR'
    ? validationTextInstance.getString('Text')
    : undefined;

const showTrailingContent = instance.getBoolean('Trailing content?');
const trailingContentInstance = showTrailingContent
  ? instance.findInstance('Trailing content')
  : undefined;

const trailingContentType =
  trailingContentInstance && trailingContentInstance.type !== 'ERROR'
    ? trailingContentInstance.getEnum('Variant', {
        Button: 'button',
        Link: 'link',
      })
    : undefined;

const linkInstance =
  trailingContentInstance && trailingContentInstance.type !== 'ERROR'
    ? trailingContentInstance.findInstance('Link')
    : undefined;
const buttonInstance =
  trailingContentInstance && trailingContentInstance.type !== 'ERROR'
    ? trailingContentInstance.findInstance('Button')
    : undefined;
const buttonText =
  buttonInstance && buttonInstance.type !== 'ERROR' ? buttonInstance.getString('Text') : undefined;
const linkExample =
  linkInstance && linkInstance.type !== 'ERROR'
    ? linkInstance.executeTemplate().example
    : undefined;

const trailingContent = Boolean(badge)
  ? badge
  : showTrailingContent
    ? trailingContentType === 'link'
      ? linkExample
      : trailingContentType === 'button'
        ? figma.code`<Link href="#" asChild><button>${buttonText}</button></Link>`
        : undefined
    : undefined;

// Only the 'button' variant is hardcoded literal JSX (asChild button wrapper) — the
// 'link' variant now resolves through linkInstance.executeTemplate(), which the tool
// auto-imports for, so only 'button' needs Link declared explicitly here.
const needsLinkImport = !Boolean(badge) && trailingContentType === 'button';

export default {
  example: figma.code`<SectionHeader${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${trailingContent ? figma.code` trailingContent={${trailingContent}}` : ''}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)} />`,
  imports: [
    `import { SectionHeader${needsLinkImport ? ', Link' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'section-header',
  metadata: {
    props: { heading, helperText, trailingContent, validationStatus, validationText },
    needsLinkImport,
  },
};

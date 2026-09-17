// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7072-913&m=dev
// source=./Toast.tsx
// component=Toast
import figma from 'figma';
const instance = figma.selectedInstance;

const description = instance.getString('Text');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-24')?.executeTemplate().example,
  false: undefined,
});
const showDismissButton = instance.getBoolean('Dismiss?');

const showLink = instance.getBoolean('Link?');
const linkInstance = showLink ? instance.findInstance('Link') : undefined;
const linkText =
  linkInstance && linkInstance.type !== 'ERROR' ? linkInstance.getString('Text') : undefined;
const link = showLink
  ? figma.code`<ToastActionLink href="#" altText="Visit #">
            ${linkText}
          </ToastActionLink>`
  : undefined;

export default {
  example: figma.code`<Toast${figma.helpers.react.renderProp('description', description)}${icon ? figma.code` icon={${icon}}` : ''}${figma.helpers.react.renderProp('showDismissButton', showDismissButton)}>${link}</Toast>`,
  imports: [
    `import { Toast${link ? ', ToastActionLink' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'toast',
};

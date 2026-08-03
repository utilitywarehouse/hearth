// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7072%3A913
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Toast/ToastItem.tsx
// component=ToastItem

import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Text');
const hasIcon = instance.getBoolean('Icon?');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-24')?.executeTemplate().example,
  false: '',
});
const hasLink = instance.getBoolean('Link?');
const hasDismiss = instance.getBoolean('Dismiss?');

export default {
  id: 'toast-item',
  imports: [
    "import { ToastItem } from '@utilitywarehouse/hearth-react-native';",
    "import type { ToastInstance } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`<ToastItem
    toast={{
      id: 'toast-1',
      text: '${text || 'Toast notification'}',
      ${hasIcon ? figma.code`icon: ${icon},` : ''}
      ${hasLink ? "actionText: 'Action'," : ''}
      showDismissIcon: ${hasDismiss},
      dismissOnPress: false,
      duration: 6000,
    }}
    onClose={() => {}}
  />`,
  metadata: {
    nestable: true,
    props: {
      text,
      hasIcon,
      icon,
      hasLink,
      hasDismiss,
    },
  },
};

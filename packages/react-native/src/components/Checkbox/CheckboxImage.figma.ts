// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7428%3A3207
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Checkbox/CheckboxImage.tsx
// component=CheckboxImage

import figma from 'figma';

export default {
  id: 'CheckboxImage',
  imports: ["import { CheckboxImage } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<CheckboxImage source={require('./image.png')} style={{ width: 40, height: 24, resizeMode: 'contain' }} />`,
  metadata: { nestable: true, props: {} },
};

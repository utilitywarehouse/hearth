// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7428:8535
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Radio/RadioImage.tsx
// component=RadioImage

import figma from 'figma';

export default {
  id: 'RadioImage',
  imports: ["import { RadioImage } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<RadioImage source={require('./image.png')} style={{ width: 40, height: 24, resizeMode: 'contain' }} />`,
  metadata: { nestable: true, props: {} },
};

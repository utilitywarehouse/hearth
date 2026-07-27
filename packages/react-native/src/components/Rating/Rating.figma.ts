// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10620-4185
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Rating/Rating.tsx
// component=Rating

import figma from 'figma';

const value = figma.selectedInstance.getEnum('Rating', {
  '0 Star': 0,
  '1 Star': 1,
  '2 Star': 2,
  '3 Star': 3,
  '4 Star': 4,
  '5 Star': 5,
});

export default {
  id: 'rating',
  imports: ["import { Rating } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Rating${figma.helpers.react.renderProp('value', value)} />`,
  metadata: { props: { value } },
};

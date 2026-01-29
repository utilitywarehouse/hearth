import figma from '@figma/code-connect';
import Divider from './Divider';

figma.connect(Divider, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2421%3A1687', {
  props: {
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: props => <Divider orientation={props.orientation} />,
});

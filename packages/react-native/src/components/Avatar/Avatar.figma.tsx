import figma from '@figma/code-connect';
import { Avatar } from '../';

figma.connect(
  Avatar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6790-14313',
  {
    props: {
      size: figma.enum('Size', {
        'SM-32': 'sm',
        'MD-48': 'md',
      }),
      initials: figma.string('Initials'),
      image: figma.instance('Image'),
      // "variant": figma.enum('Variant', {
      //   "Image": "image",
      //   "Initials": "initials",
      //   "Icon": "icon"
      // })
    },
    example: props => <Avatar size={props.size} name={props.initials} image={props.image} />,
  }
);

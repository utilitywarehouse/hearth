import { Badge } from './';
import figma from '@figma/code-connect';

figma.connect(
  Badge,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components-%26-Tokens?node-id=61-652&t=8rlYQ45xy8j75vwM-4',
  {
    links: [
      {
        name: 'Storybook - Docs',
        url: 'https://uw-hearth-react-native.vercel.app/?path=/docs/components-badge--docs',
      },
    ],
    props: {
      text: figma.string('Text'),
      colorScheme: figma.enum('Color Scheme', {
        Blue: 'blue',
        Orange: 'orange',
        Green: 'green',
        Grey: 'grey',
        Red: 'red',
      }),
      variant: figma.enum('Variant', {
        Solid: 'solid',
        Outline: 'outline',
      }),
      flatBase: figma.boolean('Flat Base?'),
      icon: figma.instance('Icon'),
    },
    example: ({ text, ...props }) => <Badge {...props}>{text}</Badge>,
  }
);

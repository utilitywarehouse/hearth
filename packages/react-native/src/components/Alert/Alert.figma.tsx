import figma from '@figma/code-connect';
import { Alert } from './';

figma.connect(Alert, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3288%3A4656', {
  links: [
    {
      name: 'Engineering Docs',
      url: 'https://hearth.prod.uw.systems/react-native/?path=/docs/components-alert--docs',
    },
  ],
  props: {
    colorScheme: figma.enum('Color Scheme', {
      Info: 'info',
      Positive: 'positive',
      Warning: 'warning',
      Danger: 'danger',
    }),
    iconButton: figma.boolean('Icon button?', {
      true: () => console.log('icon button pressed'),
      false: undefined,
    }),
    text: figma.string('Text'),
    close: figma.boolean('Close?', {
      true: () => console.log('close'),
      false: undefined,
    }),
    title: figma.string('Title'),
    showLink: figma.boolean('Link?', {
      true: () => console.log('link pressed'),
      false: undefined,
    }),
    link: figma.nestedProps('Link', {
      text: figma.string('Text'),
    }),
  },
  example: props => (
    <Alert
      colorScheme={props.colorScheme}
      title={props.title}
      text={props.text}
      onClose={props.close}
      onPressIconButton={props.iconButton}
      link={props.link.text}
      onPressLink={props.showLink}
    />
  ),
});

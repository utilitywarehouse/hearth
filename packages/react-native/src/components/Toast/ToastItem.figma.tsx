import figma from '@figma/code-connect';
import ToastItem from './ToastItem';


figma.connect(ToastItem, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7072%3A913', {
  props: {
    // No matching props could be found for these Figma properties:
    // "link": figma.boolean('Link?'),
    // "text": figma.string('Text'),
    // "icon": figma.boolean('Icon?'),
    // "icon24": figma.instance('Icon-24'),
    // "dismiss": figma.boolean('Dismiss?')
  },
  example: props => <ToastItem  />,
});

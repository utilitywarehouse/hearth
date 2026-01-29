import figma from '@figma/code-connect';
import { Banner } from '../';

figma.connect(
  Banner,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8294-3905&t=wLfy4ZMrZsHup0oB-4',
  {
    props: {
      // irection: figma.enum('Direction', {
      //   Horizontal: 'horizontal',
      //   Vertical: 'vertical',
      // }),d
    },
    example: props => {
      return (
        // Banner doesn't need to be wrapped in a Card
        // it's a standalone component in code please see the Banner docs
        // https://hearth.prod.uw.systems/react-native/?path=/docs/components-banner--docs
        <Banner heading="The banner heading" description="The text in the banner" />
      );
    },
  }
);

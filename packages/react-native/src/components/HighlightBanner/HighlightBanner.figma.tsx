import figma from '@figma/code-connect';
import { HighlightBanner, Image } from '..';

figma.connect(
  HighlightBanner,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8306-4665&t=3uUSBVdxldgG5uz3-4',
  {
    props: {
      heading: figma.string('Heading'),
      description: figma.string('Description'),
      image: figma.boolean('Image?', {
        true: <Image source={{ uri: '' }} />,
      }),
      headingColor: figma.enum('Heading color', {
        Hightlight: 'highlight',
        Pig: 'pig',
        Energy: 'energy',
        Broadband: 'broadband',
        Insurance: 'insurance',
        Cashback: 'cashback',
        Mobile: 'mobile',
      }),
      link: figma.boolean('Link?', {
        true: figma.children('Link'),
      }),
      button: figma.boolean('Button?', {
        true: figma.children('Button'),
      }),
    },
    example: props => {
      return (
        // HighlightBanner doesn't need to be wrapped in a Card
        // it's a standalone component in code please see the HighlightBanner docs
        // https://hearth.prod.uw.systems/react-native/?path=/docs/components-highlightbanner--docs
        <HighlightBanner
          heading={props.heading}
          description={props.description}
          image={props.image}
          headingColor={props.headingColor}
          link={props.link}
          button={props.button}
        />
      );
    },
  }
);

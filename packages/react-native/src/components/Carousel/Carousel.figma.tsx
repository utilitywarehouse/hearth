import figma from '@figma/code-connect';
import { Carousel, CarouselItem } from '../';

figma.connect(
  Carousel,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5191-3220&m=dev',
  {
    props: {
      inverted: figma.boolean('Inverted?'),
      showNavigation: figma.boolean('Arrows?'),
    },
    example: props => (
      // Example usage of the Carousel component
      // See https://hearth.prod.uw.systems/react-native/?path=/docs/components-carousel--docs
      <Carousel width={300} inverted={props.inverted} showNavigation={props.showNavigation}>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
      </Carousel>
    ),
  }
);

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5191-3220&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Carousel/Carousel.tsx
// component=Carousel

import figma from 'figma';

const inverted = figma.selectedInstance.getEnum('Inverted?', { False: false, True: true });
const showNavigation = figma.selectedInstance.getBoolean('Arrows?');

export default {
  id: 'Carousel',
  imports: ["import { Carousel, CarouselItem } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`// Example usage of the Carousel component
// See https://hearth.prod.uw.systems/react-native/?path=/docs/components-carousel--docs
<Carousel width={300}${figma.helpers.react.renderProp(
    'inverted',
    inverted
  )}${figma.helpers.react.renderProp('showNavigation', showNavigation)}>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
      </Carousel>`,
  metadata: { nestable: true, props: { inverted, showNavigation } },
};

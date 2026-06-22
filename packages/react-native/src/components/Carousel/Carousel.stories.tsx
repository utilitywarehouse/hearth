import { Meta, StoryObj } from '@storybook/react-vite';
import { color } from '@utilitywarehouse/hearth-tokens/js';
import { useState } from 'react';
import { LayoutChangeEvent, Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Carousel, CarouselControls, CarouselItem, CarouselProps } from '.';
import { Alert, BodyText, Box } from '../';

const meta = {
  title: 'Stories / Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Enable or disable the carousel',
    },
    inactiveItemOpacity: {
      control: 'number',
      description: 'Opacity of inactive items',
    },
    itemWidth: {
      control: 'number',
      description: 'Width of each item',
    },
    showOverflow: {
      control: 'boolean',
      description: 'Show overflow items',
    },
    showControls: {
      control: 'boolean',
      description: 'Show carousel controls',
    },
    inverted: {
      control: 'boolean',
      description: 'Invert the colors of the carousel controls',
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show prev/next navigation buttons',
    },
    style: {
      control: 'object',
      description: 'Style of the carousel',
    },
    width: {
      control: 'number',
      description: 'Width of the carousel',
    },
    centered: {
      control: 'boolean',
      description: 'Center the carousel items',
    },
  },
  args: {
    disabled: false,
    inactiveItemOpacity: 1,
    showOverflow: false,
    showControls: true,
    showNavigation: false,
    inverted: false,
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

interface CarouselItemCardProps {
  backgroundColor: string;
  title: string;
}

interface CarouselExampleProps extends Omit<CarouselProps, 'children'> {
  items: Array<any>;
}

const styles = StyleSheet.create(theme => ({
  carouselItem: {
    aspectRatio: 1.6,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    marginHorizontal: theme.space['100'],
    padding: theme.space['200'],
  },
  carouselItemTitle: {
    color: theme.color.white,
  },
  title: {
    marginBottom: theme.space['100'],
  },
}));

const CarouselItemCard = ({ backgroundColor, title }: CarouselItemCardProps) => {
  return (
    <Box style={[styles.carouselItem, { backgroundColor }]}>
      <BodyText style={styles.carouselItemTitle}>{title}</BodyText>
    </Box>
  );
};

const items = [
  {
    color: color.purple['800'],
    key: 1,
    title: '1111',
  },
  {
    color: color.red['800'],
    key: 2,
    title: '2222',
  },
  {
    color: color.green['800'],
    key: 3,
    title: '3333',
  },
  {
    color: color.blue['700'],
    key: 4,
    title: '4444',
  },
  {
    color: color.piggyPink['800'],
    key: 5,
    title: '5555',
  },
];

const CarouselExample = ({ items, ...props }: CarouselExampleProps) => (
  <Carousel {...props}>
    {items.map(({ color, key, title }) => (
      <CarouselItem key={key}>
        <CarouselItemCard backgroundColor={color} title={`•••• •••• •••• ${title}`} />
      </CarouselItem>
    ))}
  </Carousel>
);

export const Playground: Story = {
  args: {
    width: 300,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} width={width} />
      </Box>
    );
  },
};

export const FullWidth: Story = {
  args: {
    width: 300,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} width={width} />
      </Box>
    );
  },
};

export const FixedWidthCentered: Story = {
  args: {
    width: 300,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    const itemWidth = width * 0.8;

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample
          {...args}
          centered
          items={items}
          itemWidth={itemWidth}
          showOverflow
          width={width}
        />
      </Box>
    );
  },
};

export const FixedWidthStart: Story = {
  args: {
    width: 300,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    const itemWidth = width * 0.8;

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} itemWidth={itemWidth} showOverflow width={width} />
      </Box>
    );
  },
};

export const WithNavigation: Story = {
  args: {
    width: 300,
    showNavigation: true,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} width={width} />
      </Box>
    );
  },
};

export const WithoutControls: Story = {
  args: {
    width: 300,
    showControls: false,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} width={width} />
      </Box>
    );
  },
};

export const CustomControls: Story = {
  args: {
    width: 300,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <Carousel {...args} width={width}>
          {items.map(({ color, key, title }) => (
            <CarouselItem key={key}>
              <CarouselItemCard backgroundColor={color} title={`•••• •••• •••• ${title}`} />
            </CarouselItem>
          ))}
          <Box gap="200" mt="200">
            <Alert text="You can swipe to see more items or use the navigation below" />
            <CarouselControls showNavigation />
          </Box>
        </Carousel>
      </Box>
    );
  },
};

export const InvertedControls: Story = {
  args: {
    width: 300,
    showControls: true,
    inverted: true,
    showNavigation: true,
  },
  render: args => {
    const [width, setWidth] = useState(0);

    const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    };

    return (
      <Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
        <CarouselExample {...args} items={items} width={width} />
      </Box>
    );
  },
};

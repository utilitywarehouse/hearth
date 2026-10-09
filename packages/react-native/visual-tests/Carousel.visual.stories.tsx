import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { Carousel, CarouselItem } from '../src/components/Carousel';
import { useTheme } from '../src/hooks';

const meta = {
  title: 'Visual Tests/Carousel',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const WIDTH = 320;
const ITEM_HEIGHT = 160;

const Slide = ({
  label,
  background,
  inverted,
}: {
  label: string;
  background: string;
  inverted?: boolean;
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
      }}
    >
      <BodyText style={{ color: inverted ? theme.color.text.inverted : theme.color.text.primary }}>
        {label}
      </BodyText>
    </View>
  );
};

/** Three fixed-size items starting on the second, with pagination dots. */
export const Default: Story = {
  // The first frame depends on the list's layout pass, so wait for it to settle.
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: () => {
    const theme = useTheme();

    return (
      <Carousel width={WIDTH} activeIndex={1}>
        <CarouselItem>
          <Slide label="Item 1" background={theme.color.surface.brand.default} inverted />
        </CarouselItem>
        <CarouselItem>
          <Slide label="Item 2" background={theme.color.surface.cashback.default} />
        </CarouselItem>
        <CarouselItem>
          <Slide label="Item 3" background={theme.color.surface.mobile.default} />
        </CarouselItem>
      </Carousel>
    );
  },
};

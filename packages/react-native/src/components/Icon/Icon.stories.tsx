import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { expect, within } from 'storybook/test';
import { Icon } from '.';
import { ColorValue } from '../../types';
import { coloursAsArray } from '../../utils';

const meta = {
  title: 'Stories / Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'select',
      options: [...Object.keys(Icons)],
      description: 'The Icon that should render as the component',
      defaultValue: 'Helper text icon',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Background color of the Icon. Use the color name from the theme.',
    },
  },
  args: {
    // @ts-expect-error - This is a playground
    as: Object.keys(Icons)[0],
    color: 'grey1000' as ColorValue,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  // @ts-expect-error - This is a playground
  render: ({ as: icon, color }) => {
    // @ts-expect-error - This is a playground
    const as = icon === 'none' ? undefined : Icons[icon];
    return <Icon as={as} color={color} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Icon is decorative — `role="img"` is set (by the underlying
    // @gluestack-ui/icon createIcon wrapper), but it's also hidden from the
    // accessibility tree (`aria-hidden="true"`), so it must be queried with
    // `{ hidden: true }`.
    const icon = await canvas.findByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');

    // args.color defaults to 'grey1000', which resolves to this hex value.
    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('fill', '#101010');
  },
};

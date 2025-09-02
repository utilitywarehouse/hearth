import { Meta, StoryObj } from '@storybook/react-vite';
import { CurrencyInput } from '..';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The CurrencyInput field placeholder',
      defaultValue: '0.00',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focused',
      defaultValue: false,
    },
  },
  args: {
    placeholder: '0.00',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    return (
      <Flex direction="column" space="lg">
        <VariantTitle title="Default">
          <CurrencyInput />
        </VariantTitle>
        <VariantTitle title="With placeholder">
          <CurrencyInput placeholder="0.00" />
        </VariantTitle>
        <VariantTitle title="Focused">
          <CurrencyInput focused value="12.34" />
        </VariantTitle>
        <VariantTitle title="Valid">
          <CurrencyInput validationStatus="valid" />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <CurrencyInput validationStatus="invalid" />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <CurrencyInput disabled />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <CurrencyInput readonly readOnly />
        </VariantTitle>
      </Flex>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-native';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  FormField,
  FormFieldHelper,
  FormFieldHelperText,
  FormFieldInvalid,
  FormFieldInvalidIcon,
  FormFieldInvalidText,
  FormFieldLabelText,
  FormFieldTextContent,
  FormFieldValid,
  FormFieldValidIcon,
  FormFieldValidText,
} from '../src/components/FormField';
import { Input } from '../src/components/Input';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/FormField',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 12 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

const Field = () => <Input caretHidden value="Value" onChangeText={noop} />;

export const Variants: Story = {
  render: () => (
    <Cols>
      <Cell>
        <FormField label="Body label">
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Heading label" labelVariant="heading">
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Optional" required={false}>
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Helper" helperText="Helper text">
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Helper icon" helperText="Helper text" helperIcon={EmailMediumIcon}>
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Disabled" helperText="Helper text" disabled>
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Valid" validationStatus="valid" validText="Valid text">
          <Field />
        </FormField>
      </Cell>
      <Cell>
        <FormField label="Invalid" validationStatus="invalid" invalidText="Invalid text">
          <Field />
        </FormField>
      </Cell>
    </Cols>
  ),
};

/** FormField built from its child parts, with the helper text and validation messages below the label. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="FormField child parts invalid">
        <View style={{ width: '100%' }}>
          <FormField validationStatus="invalid">
            <FormFieldTextContent>
              <FormFieldLabelText>Label</FormFieldLabelText>
              <FormFieldHelper>
                <FormFieldHelperText>Helper text</FormFieldHelperText>
              </FormFieldHelper>
            </FormFieldTextContent>
            <Field />
            <FormFieldInvalid>
              <FormFieldInvalidIcon />
              <FormFieldInvalidText>Invalid text</FormFieldInvalidText>
            </FormFieldInvalid>
            <FormFieldValid>
              <FormFieldValidIcon />
              <FormFieldValidText>Valid text</FormFieldValidText>
            </FormFieldValid>
          </FormField>
        </View>
      </VTRow>
      <VTRow label="FormField child parts valid">
        <View style={{ width: '100%' }}>
          <FormField validationStatus="valid">
            <FormFieldTextContent>
              <FormFieldLabelText>Label</FormFieldLabelText>
              <FormFieldHelper>
                <FormFieldHelperText>Helper text</FormFieldHelperText>
              </FormFieldHelper>
            </FormFieldTextContent>
            <Field />
            <FormFieldInvalid>
              <FormFieldInvalidIcon />
              <FormFieldInvalidText>Invalid text</FormFieldInvalidText>
            </FormFieldInvalid>
            <FormFieldValid>
              <FormFieldValidIcon />
              <FormFieldValidText>Valid text</FormFieldValidText>
            </FormFieldValid>
          </FormField>
        </View>
      </VTRow>
    </VTGrid>
  ),
};

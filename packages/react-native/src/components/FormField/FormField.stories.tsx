import React from 'react';
import {
  FormField,
  FormFieldHelperText,
  FormFieldInvalid,
  FormFieldInvalidText,
  FormFieldLabelText,
  FormFieldValid,
  FormFieldValidText,
} from '.';
import { Meta, StoryObj } from '@storybook/react';
import * as Icons from '../../../docs/components/icons';
import { VariantTitle } from '../../../docs/components';
import { Input } from '../Input';
import { Flex } from '../Flex';
import FormFieldLabel from './FormFieldLabel';
import FormFieldHelper from './FormFieldHelper';

const meta = {
  title: 'Stories / FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the Input component',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Input component',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'The label of the Input component',
      defaultValue: 'Label',
    },
    helperText: {
      control: 'text',
      description: 'The helper text of the Input component',
      defaultValue: 'Helper text',
    },
    helperIcon: {
      control: 'select',
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      description: 'The helper text icon of the Input component',
      defaultValue: 'Helper text icon',
    },

    validText: {
      control: 'text',
      description: 'The valid text of the Input component',
      defaultValue: 'Valid text',
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the Input component',
      defaultValue: 'Invalid text',
    },
  },
  args: {
    validationStatus: 'initial',
    disabled: false,
    label: 'Label',
    helperText: 'Helper text',
    helperIcon: undefined,

    validText: 'Valid text',
    invalidText: 'Invalid error text',
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ validationStatus, helperIcon: icon, ...props }) => {
    // @ts-expect-error - This is a playground
    const helperIcon = icon === 'none' ? undefined : Icons[icon];
    return (
      <FormField validationStatus={validationStatus} helperIcon={helperIcon} {...props}>
        <Input />
      </FormField>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <Flex direction="column" space="lg">
        <VariantTitle title="Default">
          <FormField label="Label">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="With helper text bottom">
          <FormField label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="With helper text top">
          <FormField label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Valid with valid text">
          <FormField
            validationStatus="valid"
            label="Label"
            helperText="Helper text"
            validText="Valid form field text"
          >
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Invalid with invalid text">
          <FormField
            validationStatus="invalid"
            label="Label"
            helperText="Helper Text"
            invalidText="Invalid form field text"
          >
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Disabled">
          <FormField disabled label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
      </Flex>
    );
  },
};

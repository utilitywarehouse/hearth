import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@utilitywarehouse/colour-system';

import { Fieldset } from './Fieldset';
import { FieldsetLegend } from '../FieldsetLegend/FieldsetLegend';
import { Box } from '../Box/Box';
import { BodyText } from '../BodyText/BodyText';

const meta: Meta<typeof Fieldset> = {
  title: 'Components / Fieldset',
  component: Fieldset,
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Workshop: Story = {
  render: args => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Fieldset legend</FieldsetLegend>
        <Box backgroundColor={colors.grey75} padding="48px">
          <BodyText as="p" variant="body">
            A form input, such as a RadioGroup
          </BodyText>
        </Box>
      </Fieldset>
    );
  },
};

import { Meta, StoryObj } from '@storybook/react-native';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { ElectricityMediumIcon, GasMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../../';
import { Badge } from '../../Badge';
import { Flex } from '../../Flex';
import Card from '../Card';
import CardActions from '../CardActions';
import CardContent from '../CardContent';
import CardAction from './CardAction';

const meta: Meta<typeof CardAction> = {
  title: 'Stories / CardAction',
  component: CardAction,
  argTypes: {
    heading: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    badge: { control: 'object' },
    badgePosition: {
      control: 'select',
      options: ['bottom', 'middle', 'right'],
    },
    leadingIcon: {
      options: [
        'none',
        ...Object.keys(Icons).filter(icon => icon.includes('Small') || icon.includes('Medium')),
      ],
      control: 'select',
      description: 'The leading icon.',
    },
    trailingIcon: {
      options: [
        'none',
        ...Object.keys(Icons).filter(icon => icon.includes('Small') || icon.includes('Medium')),
      ],
      control: 'select',
      description: 'The trailing icon.',
    },
    iconContainer: { control: 'boolean' },
    iconContainerVariant: {
      control: 'select',
      options: ['subtle', 'emphasis'],
    },
    iconContainerColor: {
      control: 'select',
      options: ['pig', 'energy', 'broadband', 'mobile', 'insurance', 'cashback', 'highlight'],
    },
  },
  args: {
    heading: 'Card Action',
    helperText: 'This is a card action component',
    size: 'md',
    loading: false,
    disabled: false,
    iconContainer: true,
  },
};

export default meta;

type Story = StoryObj<typeof CardAction>;

export const Playground: Story = {
  args: {
    onPress: fn(),
  },
  render: (args: any) => {
    // @ts-expect-error - This is a playground
    const leadingIcon = args.leadingIcon === 'none' ? undefined : Icons[args.leadingIcon];
    // @ts-expect-error - This is a playground
    const trailingIcon = args.trailingIcon === 'none' ? undefined : Icons[args.trailingIcon];
    return (
      <View style={{ width: '100%', maxWidth: 400, gap: 16 }}>
        <Card variant="emphasis">
          <CardActions>
            <CardAction {...args} leadingIcon={leadingIcon} trailingIcon={trailingIcon} />
          </CardActions>
        </Card>
      </View>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const action = await canvas.findByTestId('card-action');
    await userEvent.click(action);

    // Pressing a CardAction fires the `onPress` handler passed through from the
    // underlying `createPressable()` Root.
    expect(args.onPress).toHaveBeenCalledOnce();
  },
};

export const WithLeadingIcon: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Bills"
            helperText="View your bills"
            leadingIcon={ElectricityMediumIcon}
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </View>
  ),
};

export const WithTrailingIcon: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Bills"
            helperText="View your bills"
            trailingIcon={ElectricityMediumIcon}
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </View>
  ),
};

export const WithIconContainer: Story = {
  args: {},
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Electricity"
            helperText="Last reading 23/03/24"
            leadingIcon={ElectricityMediumIcon}
            iconContainer
            iconContainerVariant="emphasis"
            iconContainerColor="energy"
            onPress={() => console.log('pressed')}
          />
          <CardAction
            heading="Gas"
            helperText="Last reading 23/03/24"
            leadingIcon={GasMediumIcon}
            iconContainer
            iconContainerVariant="emphasis"
            iconContainerColor="energy"
            onPress={() => console.log('pressed')}
          />
          <CardAction
            heading="Gas"
            helperText="Last reading 23/03/24"
            leadingIcon={GasMediumIcon}
            iconContainer
            iconContainerVariant="emphasis"
            iconContainerColor="energy"
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </View>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // CardActions tracks registration order (see CardActions.tsx / CardActions.utils.ts)
    // to work out which CardAction is first. When a Card contains only CardActions
    // (no other content), the first action's top border is removed via a Unistyles
    // `isFirst` variant so it doesn't double up with the Card's own border - a
    // visual/layout detail, not an accessibility one. The registration-order logic
    // itself (addActionId/removeActionId/getFirstActionId) is already characterized
    // deterministically in CardActions.utils.test.ts; the resulting Unistyles
    // variant style isn't reliably observable via getComputedStyle in every test
    // environment (see UWDS-4909 for the related pattern with other components'
    // variant-driven styles), so this only characterizes that all three actions
    // render successfully.
    const actions = canvas.getAllByTestId('card-action');
    expect(actions).toHaveLength(3);
  },
};

export const WithBadge: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Flex direction="column" spacing="md" style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Badge at bottom"
            helperText="Badge positioned below text"
            leadingIcon={ElectricityMediumIcon}
            badge={<Badge text="New" />}
            badgePosition="bottom"
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Badge at middle"
            helperText="Badge positioned between heading and helper text"
            leadingIcon={ElectricityMediumIcon}
            badge={<Badge text="New" />}
            badgePosition="middle"
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Badge at right"
            helperText="Badge positioned on the right side"
            leadingIcon={ElectricityMediumIcon}
            badge={<Badge text="New" />}
            badgePosition="right"
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Flex direction="column" spacing="md" style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Medium size (default)"
            helperText="Heading size is md"
            size="md"
            leadingIcon={ElectricityMediumIcon}
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Large size"
            helperText="Heading size is lg"
            size="lg"
            leadingIcon={ElectricityMediumIcon}
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </Flex>
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Loading"
            helperText="This is loading"
            loading
            leadingIcon={ElectricityMediumIcon}
            onPress={() => console.log('pressed')}
          />
        </CardActions>
      </Card>
    </View>
  ),
};

const disabledOnPress = fn();

export const Disabled: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardActions>
          <CardAction
            heading="Disabled"
            helperText="This is disabled"
            disabled
            leadingIcon={ElectricityMediumIcon}
            onPress={disabledOnPress}
          />
        </CardActions>
      </Card>
    </View>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // A disabled CardAction renders with `pointer-events: none` - a real user
    // cannot click it at all (userEvent.click throws on a pointer-events: none
    // element, which is itself proof it can't respond). `disabled` maps straight
    // through to the Pressable's `disabled`/`aria-disabled` DOM attributes here
    // (react-native-web's one special case for accessibilityState - verified
    // via live DOM inspection), so that's the characterization itself.
    const action = await canvas.findByTestId('card-action');
    expect(action).toHaveAttribute('aria-disabled', 'true');

    // A disabled CardAction does not fire its `onPress` handler.
    expect(disabledOnPress).not.toHaveBeenCalled();
  },
};

const CustomAction = ({ heading, ...props }: { heading: string }) => {
  return <CardAction key={heading} heading={heading} {...props} onPress={() => null} />;
};

const CustomComponent = () => <BodyText>Multiple CardActions within a Card:</BodyText>;

export const WithCustomActions: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: (args: any) => {
    // @ts-expect-error - This is a playground
    const leadingIcon = args.leadingIcon === 'none' ? undefined : Icons[args.leadingIcon];
    // @ts-expect-error - This is a playground
    const trailingIcon = args.trailingIcon === 'none' ? undefined : Icons[args.trailingIcon];

    const actions = [{ text: 'Action 1' }, { text: 'Action 2' }, { text: 'Action 3' }];
    return (
      <View style={{ width: '100%', maxWidth: 400, gap: 16 }}>
        {/* Example 1 */}
        <Card variant="emphasis">
          <BodyText>Multiple CardActions within a Card:</BodyText>
          <CardActions>
            {actions.map(action => (
              <CustomAction
                key={action.text}
                {...args}
                heading={action.text}
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
              />
            ))}
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
          </CardActions>
        </Card>
        {/* Example 2 */}
        <Card variant="emphasis">
          <CardActions>
            {actions.map(action => (
              <CustomAction
                key={action.text}
                {...args}
                heading={action.text}
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
              />
            ))}
          </CardActions>
        </Card>
        {/* Example 3 */}
        <Card variant="emphasis">
          <CardActions>
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
          </CardActions>
        </Card>
        {/* Example 4 */}
        <Card variant="emphasis">
          <BodyText>Multiple CardActions within a Card:</BodyText>
        </Card>
        {/* Example 5 */}
        <Card variant="emphasis">
          <BodyText>Multiple CardActions within a Card:</BodyText>
          <CardActions>
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
          </CardActions>
        </Card>
        {/* Example 6 */}
        <Card variant="emphasis">
          <CardContent>
            <CustomComponent />
          </CardContent>
          <CardActions>
            {actions.map(action => (
              <CustomAction
                key={action.text}
                {...args}
                heading={action.text}
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
              />
            ))}
            <CardAction
              {...args}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
              onPress={() => null}
            />
          </CardActions>
        </Card>
      </View>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Flex } from '@utilitywarehouse/hearth-react';
import { useEffect, useState } from 'react';

const colorSchemes = ['blue', 'green', 'red', 'orange'] as const;

const meta: Meta<typeof Alert> = {
  title: 'Stories / Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'A `Alert` is a visual label or indicator used to convey status or highlight content. Alerts are read-only status indicators or labels and are not interactive.',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <Alert
          colorScheme="blue"
          title="Information"
          text="Unlock the power of knowledge with the following information."
        />
        <Alert
          colorScheme="green"
          title="Success"
          text="Boom! You did it! Please take a moment to pat yourself on the back. You've earned it!"
        />
        <Alert
          colorScheme="red"
          title="Error"
          text="Uh-oh! It looks like the matrix has glitched. Our team of tech ninjas are already on the case. Please hold tight while we fix the issue"
        />
        <Alert
          colorScheme="orange"
          title="Warning"
          text="Warning: Reading the following content may cause spontaneous outbursts of 'aha!' moments"
        />
      </Flex>
    );
  },
};

export const Playground: Story = {
  argTypes: {
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
  },
  args: {
    colorScheme: 'blue',
    title: 'Alert Title',
    text: 'This is an example of alert text which can wrap',
  },
};

export const Pressable: Story = {
  render: () => (
    <Alert
      colorScheme="blue"
      title="Information"
      text="Unlock the power of knowledge with the following information."
      onClick={() => alert('Information clicked')}
    />
  ),
};

export const WithLink: Story = {
  render: () => (
    <Alert
      colorScheme="orange"
      title="You're email has not been verified"
      text="Please verify your email address by clicking the link below."
      linkHref="#"
      linkText="Verify Email"
    />
  ),
};

export const Dismissable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      if (!visible) {
        timer = setTimeout(() => {
          setVisible(true);
        }, 3000);
      }
      return () => clearTimeout(timer);
    }, [visible]);

    const handleClose = () => {
      setVisible(false);
    };

    if (!visible) return <>Alert closed</>;
    return (
      <Alert
        colorScheme="green"
        title="Success"
        text="Your email address has been verified successfully."
        onClose={handleClose}
      />
    );
  },
};

// export const FlatBase: Story = {
//   render: () => {
//     return (
//       <Box>
//         <Flex justify="end" paddingRight="300" width="400px">
//           <Alert colorScheme="green" variant="solid" flatBase>
//             Multi SIM offer
//           </Alert>
//         </Flex>
//         <Box
//           width="400px"
//           height="200px"
//           backgroundColor="white"
//           borderColor="green700"
//           borderStyle="solid"
//           borderWidth="2"
//           borderRadius="sm"
//         />
//       </Box>
//     );
//   },
// };

// export const SurfaceColours: Story = {
//   render: () => (
//     <Flex width="600px">
//       <Flex gap="200" direction="column" padding="200" backgroundColor="white">
//         {colorSchemes.map(colorScheme => (
//           <Alert
//             key={colorScheme}
//             variant="solid"
//             colorScheme={colorScheme}
//             textTransform="capitalize"
//           >
//             {colorScheme}
//           </Alert>
//         ))}
//       </Flex>
//       <Flex gap="200" direction="column" padding="200" backgroundColor="darkPurple">
//         {colorSchemes.map(colorScheme => (
//           <Alert
//             key={colorScheme}
//             variant="solid"
//             colorScheme={colorScheme}
//             textTransform="capitalize"
//           >
//             {colorScheme}
//           </Alert>
//         ))}
//       </Flex>
//       <Flex gap="200" direction="column" padding="200" backgroundColor="white">
//         {colorSchemes.map(colorScheme => (
//           <Alert
//             key={colorScheme}
//             variant="outline"
//             colorScheme={colorScheme}
//             textTransform="capitalize"
//           >
//             {colorScheme}
//           </Alert>
//         ))}
//       </Flex>
//     </Flex>
//   ),
// };

// export const Icons: Story = {
//   render: () => (
//     <Flex gap="200">
//       <Alert colorScheme="green">
//         <TickSmallIcon />
//         Success
//       </Alert>
//       <Alert colorScheme="red">
//         <CloseSmallIcon />
//         Unsuccessful
//       </Alert>
//     </Flex>
//   ),
// };

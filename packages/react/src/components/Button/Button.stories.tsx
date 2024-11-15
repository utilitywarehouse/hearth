import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import * as React from 'react';

const sizes = ['medium', 'small'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['cyan', 'red', 'green'] as const;
const colorSchemes = [...solidColorSchemes, 'grey', 'gold'] as const;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Components / Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Pollen Button',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
    variant: 'solid',
    colorScheme: 'cyan',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Workshop: Story = {};

// export const KitchenSink: Story = {
//   parameters: { controls: { hideNoControlsWarning: true } },
//   render: () => {
//     return (
//       <Flex direction="column" gap={6}>
//         <Flex gap={2} direction="column">
//           <Heading variant="h2" textTransform="capitalize">
//             solid
//           </Heading>
//           <Flex gap={4} align="center">
//             {sizes.map(size => (
//               <Flex key={size} gap={1}>
//                 {solidColorSchemes.map(colorScheme => (
//                   <Button key={colorScheme} variant="solid" colorScheme={colorScheme} size={size}>
//                     Button
//                   </Button>
//                 ))}
//               </Flex>
//             ))}
//           </Flex>
//           <Flex gap={4} align="center">
//             {sizes.map(size => (
//               <Flex key={size} gap={1}>
//                 {solidColorSchemes.map(colorScheme => (
//                   <Button
//                     disabled
//                     key={colorScheme}
//                     variant="solid"
//                     colorScheme={colorScheme}
//                     size={size}
//                   >
//                     Button
//                   </Button>
//                 ))}
//               </Flex>
//             ))}
//           </Flex>
//         </Flex>
//         {(['outline', 'ghost'] as const).map(variant => (
//           <Flex key={variant} gap={2} direction="column">
//             <Heading variant="h2" textTransform="capitalize">
//               {variant}
//             </Heading>
//             <Flex gap={4} align="center">
//               {sizes.map(size => (
//                 <Flex key={size} gap={1}>
//                   {colorSchemes.map(colorScheme => (
//                     <Button
//                       key={colorScheme}
//                       variant={variant}
//                       colorScheme={colorScheme}
//                       size={size}
//                     >
//                       Button
//                     </Button>
//                   ))}
//                 </Flex>
//               ))}
//             </Flex>
//             <Flex gap={4} align="center">
//               {sizes.map(size => (
//                 <Flex key={size} gap={1}>
//                   {colorSchemes.map(colorScheme => (
//                     <Button
//                       disabled
//                       key={colorScheme}
//                       variant={variant}
//                       colorScheme={colorScheme}
//                       size={size}
//                     >
//                       Button
//                     </Button>
//                   ))}
//                 </Flex>
//               ))}
//             </Flex>
//           </Flex>
//         ))}
//       </Flex>
//     );
//   },
// };
//

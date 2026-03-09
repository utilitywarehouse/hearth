import figma from '@figma/code-connect';
import { ProgressBar } from '../';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7849-5704',
  {
    props: {
      value: figma.enum('Progress', {
        '0%': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        '40%': 40,
        '50%': 50,
        '60%': 60,
        '70%': 70,
        '80%': 80,
        '90%': 90,
        '100%': 100,
      }),
      colorScheme: figma.enum('Color Scheme', {
        Default: 'default',
        Success: 'success',
        Danger: 'danger',
      }),
      label: figma.boolean('Label?', { true: figma.string('Label') }),
    },
    example: props => (
      <ProgressBar
        variant="linear"
        value={props.value}
        colorScheme={props.colorScheme}
        label={props.label}
      />
    ),
  }
);

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7863-3977',
  {
    props: {
      value: figma.enum('Progress', {
        '0%': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        '40%': 40,
        '50%': 50,
        '60%': 60,
        '70%': 70,
        '80%': 80,
        '90%': 90,
        '100%': 100,
      }),
      colorScheme: figma.enum('Color Scheme', {
        Default: 'default',
        Success: 'success',
        Danger: 'danger',
      }),
      size: figma.enum('Size', {
        'SM-80': 'sm',
        'MD-140': 'md',
      }),
      label: figma.boolean('Label?', { true: figma.string('Label') }),
    },
    example: props => (
      <ProgressBar
        variant="circular"
        value={props.value}
        colorScheme={props.colorScheme}
        size={props.size}
        label={props.label}
      />
    ),
  }
);

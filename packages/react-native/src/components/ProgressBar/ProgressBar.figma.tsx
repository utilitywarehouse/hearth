import figma from '@figma/code-connect';
import { ProgressBar } from '../';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7849-5704',
  {
    props: {
      value: figma.enum('Value', {
        '0%': 0,
        '25%': 25,
        '50%': 50,
        '75%': 75,
        '100%': 100,
      }),
      colorScheme: figma.enum('Color Scheme', {
        Default: 'default',
        Success: 'success',
        Danger: 'danger',
      }),
      label: figma.string('Label'),
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
      value: figma.enum('Value', {
        '0%': 0,
        '25%': 25,
        '50%': 50,
        '75%': 75,
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
      label: figma.string('Label'),
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

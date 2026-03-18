import figma from '@figma/code-connect';
import { Timeline, TimelineItem } from '.';

figma.connect(
  Timeline,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5483&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {
      items: figma.children('Progress'),
    },
    variant: {
      Variant: 'Progress',
    },
    example: props => <Timeline variant="progress">{props.items}</Timeline>,
  }
);

figma.connect(
  Timeline,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5483&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {
      items: figma.children('Static'),
    },
    variant: {
      Variant: 'Static',
    },
    example: props => <Timeline variant="static">{props.items}</Timeline>,
  }
);

figma.connect(
  TimelineItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10562-2810&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', { true: figma.string('Helper text') }),
      state: figma.enum('State', {
        Complete: 'complete',
        Active: 'active',
        Incomplete: 'incomplete',
      }),
      customContent: figma.boolean('Custom content?', {
        true: figma.instance('Slot'),
      }),
    },
    example: props => (
      <TimelineItem
        variant="progress"
        position="middle"
        label={props.label}
        helperText={props.helperText}
        state={props.state}
      >
        {props.customContent}
      </TimelineItem>
    ),
  }
);

figma.connect(
  TimelineItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5189&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', { true: figma.string('Helper text') }),
      customContent: figma.boolean('Custom content?', {
        true: figma.instance('Slot'),
      }),
      position: figma.enum('Variant', {
        Start: 'start',
        Middle: 'middle',
        End: 'end',
      }),
    },
    example: props => (
      <TimelineItem
        variant="static"
        position={props.position}
        label={props.label}
        helperText={props.helperText}
      >
        {props.customContent}
      </TimelineItem>
    ),
  }
);

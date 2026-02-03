import figma from '@figma/code-connect';
import { IndicatorIconButton } from '..';

figma.connect(
  IndicatorIconButton,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6778-10672&t=3uUSBVdxldgG5uz3-4',
  {
    props: {
      indicator: figma.boolean('Indicator?'),
      icon: figma.nestedProps('Icon Button/Unstyled', {
        icon: figma.instance('Icon-24'),
      }),
    },
    example: props => <IndicatorIconButton icon={props.icon.icon} indicator={props.indicator} />,
  }
);

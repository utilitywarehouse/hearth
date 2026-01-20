import figma from '@figma/code-connect';
import Card from './Card';

figma.connect(Card, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2160%3A11', {
  props: {
    variant: figma.enum('Variant', {
      Emphasis: 'emphasis',
      Subtle: 'subtle',
    }),
    colorScheme: figma.enum('Color Scheme', {
      'Neutral Strong': 'neutralStrong',
      'Neutral Subtle': 'neutralSubtle',
      Brand: 'brand',
      Energy: 'energy',
      Broadband: 'broadband',
      Mobile: 'mobile',
      Insurance: 'insurance',
      Cashback: 'cashback',
      Pig: 'pig',
    }),
    noPadding: figma.boolean('Padding None?'),
    content: figma.instance('Content'),
  },
  example: props => (
    <Card variant={props.variant} colorScheme={props.colorScheme} noPadding={props.noPadding}>
      {props.content}
    </Card>
  ),
});

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2160-11&m=dev
// source=./Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

const contentSlot = instance.getSlot('Content');
const contentResults = contentSlot?.connectedInstances.map(item => item.executeTemplate()) ?? [];

// HighlightBanner already wraps itself in a Card, so when the Content slot resolves directly to
// one, render just that component instead of nesting it inside another Card.
const highlightBannerResult = contentResults.find(result => result.metadata?.isHighlightBanner);

const cardActionResults = contentResults.filter(result => result.metadata?.isCardAction);
const cardActionChildren = cardActionResults.map(result => result.example);
const cardActions =
  cardActionResults.length > 1
    ? figma.code`<CardActions>${cardActionChildren.flat()}</CardActions>`
    : (cardActionChildren[0] ?? '');

const otherChildren = contentResults
  .filter(result => !result.metadata?.isCardAction && !result.metadata?.isHighlightBanner)
  .map(result => result.example);

// The Content slot only surfaces instances that already have their own Code Connect definition —
// freeform content authored directly in the slot (bare text, or an ad-hoc frame mixing text and
// instances) isn't picked up at all. Fall back to scraping text layers so those cards still show
// something resembling their real content, e.g.
// https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3055-2863
// https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3674-6867
const slotTextLayers =
  contentResults.length === 0
    ? (instance.findLayers(node => node.type === 'TEXT') as { textContent: string }[])
    : [];
const fallbackContent = slotTextLayers.map(layer => layer.textContent).join('\n');

const variant = instance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Subtle: 'subtle',
});
const colorScheme = instance.getEnum('Color Scheme', {
  'Neutral Strong': 'neutralStrong',
  'Neutral Subtle': 'neutralSubtle',
  Brand: 'brand',
  Pig: 'pig',
  Highlight: 'highlight',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
});
const paddingNone = instance.getBoolean('Padding None?');

export default {
  id: 'card',
  imports: highlightBannerResult
    ? []
    : [
        `import { Card${cardActionResults.length > 1 ? ', CardActions' : ''} } from "@utilitywarehouse/hearth-react"`,
      ],
  example: highlightBannerResult
    ? figma.code`${highlightBannerResult.example}`
    : figma.code`<Card${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('paddingNone', paddingNone)}>${otherChildren.flat()}${cardActions}${fallbackContent}${contentSlot ?? ''}</Card>`,
  metadata: { nestable: true },
};

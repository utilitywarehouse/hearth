// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2160%3A11
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Card/CardRoot.tsx
// component=Card

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Subtle: 'subtle',
});
const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  'Neutral Strong': 'neutralStrong',
  'Neutral Subtle': 'neutralSubtle',
  Brand: 'brand',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Pig: 'pig',
  Highlight: 'highlight',
});
const noPadding = figma.selectedInstance.getBoolean('Padding None?');
const contentResults = (figma.selectedInstance.getSlot('Content')?.connectedInstances ?? []).map(
  i => i.executeTemplate()
);
const content = contentResults.map(r => r.example);

// Banner and HighlightBanner already wrap themselves in a Card, so when Card's Content slot is
// swapped directly to one of them, render just that component rather than nesting it in another.
// Detected from the rendered code itself (custom metadata.props fields that aren't referenced in
// a template's own `example` don't survive publish/resolve, so componentName-style flags can't be
// used here) — strip any leading comment lines, then check the JSX tag.
const rootCode = (contentResults.length === 1 ? contentResults[0].example : [])
  .filter(section => section.type === 'CODE')
  .map(section => section.code)
  .join('')
  .replace(/^\s*\/\/.*$/gm, '')
  .trim();
const standaloneContent = /^<(Banner|HighlightBanner)[\s/>]/.test(rootCode)
  ? contentResults[0].example
  : undefined;

export default {
  id: 'Card',
  imports: standaloneContent
    ? []
    : ["import { Card } from '@utilitywarehouse/hearth-react-native';"],
  example: standaloneContent
    ? figma.code`${standaloneContent}`
    : figma.code`<Card${figma.helpers.react.renderProp(
        'variant',
        variant
      )}${figma.helpers.react.renderProp(
        'colorScheme',
        colorScheme
      )}${figma.helpers.react.renderProp('noPadding', noPadding)}>
      ${content.flat()}
    </Card>`,
  metadata: { nestable: true, props: { variant, colorScheme, noPadding, content } },
};

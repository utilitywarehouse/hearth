// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2160-11&m=dev
// source=./Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

const contentSlot = instance.getSlot('Content');
const children = contentSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];
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

// HighlightBanner already wrap themselves in a Card, so when Card's Content slot is
// swapped directly to one of them, render just that component rather than nesting it in another.
// Detected from the rendered code itself (custom metadata.props fields that aren't referenced in
// a template's own `example` don't survive publish/resolve, so componentName-style flags can't be
// used here) — strip any leading comment lines, then check the JSX tag.
const contentResults = (figma.selectedInstance.getSlot('Content')?.connectedInstances ?? []).map(
  (i: { executeTemplate: () => any }) => i.executeTemplate()
);
const rootCode = (contentResults.length === 1 ? contentResults[0].example : [])
  .filter((section: { type: string }) => section.type === 'CODE')
  .map((section: { code: any }) => section.code)
  .join('')
  .replace(/^\s*\/\/.*$/gm, '')
  .trim();
const standaloneContent = /^<(HighlightBanner)[\s/>]/.test(rootCode)
  ? contentResults[0].example
  : undefined;

export default {
  id: 'card',
  imports: standaloneContent ? [] : ["import { Card } from '@utilitywarehouse/hearth-react'"],
  example: standaloneContent
    ? figma.code`${standaloneContent}`
    : figma.code`<Card${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('paddingNone', paddingNone)}>${children.flat()}</Card>`,
  metadata: { nestable: true },
};

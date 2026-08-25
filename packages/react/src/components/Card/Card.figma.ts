// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2160-11&m=dev
// source=./Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

const contentSlot = instance.getSlot('Content');
const connectedInstances = contentSlot?.connectedInstances ?? [];
const connectedTemplates = connectedInstances.map(i => i.executeTemplate());

// `connectedInstances` is shallow and only ever includes code-connected instances placed
// directly in the slot — it omits plain text and unconnected layers entirely (per the Code
// Connect Template API docs). Card itself has no other text outside its slotted content, so
// search the whole instance for text layers to also pick that up.
const slotTextLayers = instance
  .findLayers((node: { type: string }) => node.type === 'TEXT')
  .filter((node: { type: string }) => node.type === 'TEXT') as { textContent: string }[];

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
const singleConnectedTemplate =
  connectedTemplates?.length === 1 ? connectedTemplates[0] : undefined;
const rootCode = (singleConnectedTemplate ? singleConnectedTemplate.example : [])
  .filter((section: { type: string }) => section.type === 'CODE')
  .map((section: { code: any }) => section.code)
  .join('')
  .replace(/^\s*\/\/.*$/gm, '')
  .trim();
const standaloneContent = /^<(HighlightBanner)[\s/>]/.test(rootCode)
  ? singleConnectedTemplate?.example
  : undefined;

export default {
  id: 'card',
  imports: standaloneContent ? [] : ["import { Card } from '@utilitywarehouse/hearth-react'"],
  example: standaloneContent
    ? figma.code`${standaloneContent}`
    : figma.code`<Card${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('paddingNone', paddingNone)}>${slotTextLayers.map(t => t.textContent).join('')}${contentSlot ?? ''}</Card>`,
  metadata: { nestable: true },
};

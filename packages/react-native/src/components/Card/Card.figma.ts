// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2160%3A11
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Card/CardRoot.tsx
// component=Card

import figma from 'figma';
import type { InstanceHandle, ResultSection, TextHandle } from 'figma';

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

// The Content slot's `connectedInstances` is shallow — it only includes code-connected instances
// placed directly in the slot, so anything nested in a frame (e.g. Card Actions stacked in an
// auto-layout frame, or a "Card content" frame mixing text and a Button) is dropped entirely.
// Walk the layer tree instead, in document order: `findLayers` doesn't descend into instances, so
// keep code-connected ones as-is (they render their own contents) and recurse into unconnected
// wrapper instances to find what's inside them.
const collectContent = (node: InstanceHandle): (InstanceHandle | TextHandle)[] =>
  node
    .findLayers(layer => layer.type === 'INSTANCE' || layer.type === 'TEXT')
    .flatMap(layer => {
      if (layer.type === 'TEXT') return [layer];
      if (layer.type !== 'INSTANCE') return [];
      return layer.hasCodeConnect() || isLegacyCardAction(layer) ? [layer] : collectContent(layer);
    });

// Some Card content (e.g. the "App Key Actions Content" placeholder) still uses an older, orphaned
// Card Action component that has no Code Connect, so it would otherwise render as its loose
// children. Recognise it by layer name and build a basic CardAction from its visible text layers —
// icons and badges aren't mapped.
function isLegacyCardAction(layer: InstanceHandle) {
  return !layer.hasCodeConnect() && /^card action$/i.test(layer.name);
}
const legacyCardAction = (layer: InstanceHandle) => {
  const texts = layer
    .findLayers(node => node.type === 'TEXT')
    .filter((node): node is TextHandle => node.type === 'TEXT');
  const heading = texts.find(text => text.name === 'Card action heading')?.textContent;
  const helperText = texts.find(text => text.name === 'Helper text')?.textContent;
  return figma.code`<CardAction${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('helperText', helperText)} />`.sections;
};

// Detected from the rendered code itself (custom metadata fields that aren't referenced in a
// template's own `example` don't survive publish/resolve) — strip leading comments, then read the
// root JSX tag.
const rootTag = (example: ResultSection[]) =>
  example
    .filter(section => section.type === 'CODE')
    .map(section => section.code)
    .join('')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .trim()
    .match(/^<([A-Za-z]+)/)?.[1];

const contentItems = collectContent(figma.selectedInstance).map(layer =>
  layer.type === 'TEXT'
    ? {
        tag: 'BodyText',
        example:
          figma.code`<BodyText>${figma.helpers.react.renderChildren(layer.textContent)}</BodyText>`
            .sections,
      }
    : isLegacyCardAction(layer)
      ? { tag: 'CardAction', legacy: true, example: legacyCardAction(layer) }
      : (() => {
          const example = layer.executeTemplate().example;
          return { tag: rootTag(example), example };
        })()
);

// Banner and HighlightBanner already wrap themselves in a Card, so when Card's Content slot holds
// just one of them, render that component rather than nesting it in another Card.
const standaloneContent =
  contentItems.length === 1 &&
  (contentItems[0].tag === 'Banner' || contentItems[0].tag === 'HighlightBanner')
    ? contentItems[0].example
    : undefined;

const isCardAction = (tag?: string) => tag === 'CardAction';
const hasActions = contentItems.some(item => isCardAction(item.tag));
const hasText = contentItems.some(item => item.tag === 'BodyText');

// When the card has actions, consecutive CardActions are grouped into a CardActions wrapper and the
// rest of the content into a CardContent wrapper, as they are in code. Otherwise content renders
// directly inside the Card.
const content: ResultSection[][] = [];
let group: ResultSection[][] = [];
let groupIsActions = false;
const flushGroup = () => {
  if (group.length === 0) return;
  content.push(
    groupIsActions
      ? figma.code`<CardActions>${group.flat()}</CardActions>`.sections
      : figma.code`<CardContent>${group.flat()}</CardContent>`.sections
  );
  group = [];
};
contentItems.forEach(item => {
  if (!hasActions) {
    content.push(item.example);
    return;
  }
  const itemIsAction = isCardAction(item.tag);
  if (itemIsAction !== groupIsActions) flushGroup();
  groupIsActions = itemIsAction;
  group.push(item.example);
});
flushGroup();

const hasContent = hasActions && contentItems.some(item => !isCardAction(item.tag));
// Connected CardActions bring their own import; legacy ones built here don't.
const hasLegacyActions = contentItems.some(item => 'legacy' in item);

// Templates can only read a text layer's name and characters, not its text style, so loose text
// always renders as BodyText — flag it so the right typography component gets picked.
const textStyleNote = hasText
  ? "{/* Loose text renders as BodyText — swap for Heading or DetailText to match each layer's Figma text style */}\n"
  : '';

export default {
  id: 'Card',
  imports: standaloneContent
    ? []
    : [
        `import { ${['Card', hasContent && 'CardContent', hasActions && 'CardActions', hasLegacyActions && 'CardAction', hasText && 'BodyText'].filter(Boolean).join(', ')} } from '@utilitywarehouse/hearth-react-native';`,
      ],
  example: standaloneContent
    ? figma.code`${standaloneContent}`
    : figma.code`<Card${figma.helpers.react.renderProp(
        'variant',
        variant
      )}${figma.helpers.react.renderProp(
        'colorScheme',
        colorScheme
      )}${figma.helpers.react.renderProp('noPadding', noPadding)}>
      ${textStyleNote}${content.flat()}
    </Card>`,
  metadata: { nestable: true, props: { variant, colorScheme, noPadding, content } },
};

// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2421%3A1628
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/List/ListItem/ListItem.tsx
// component=ListItem

import figma from 'figma';

const loading = figma.selectedInstance.getEnum('State', {
  Loading: true,
});
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
// findLayers() returns a union that includes TextHandle, which has no executeTemplate() —
// guard on the INSTANCE type before calling it.
function executeFirstInstanceTemplate(
  layers: ReturnType<typeof figma.selectedInstance.findLayers>
) {
  const layer = layers[0];
  return layer && layer.type === 'INSTANCE' ? layer.executeTemplate().example : undefined;
}

const leadingContent = figma.selectedInstance.getBoolean('Leading content?', {
  true: (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance('Leading content');
    return {
      variant:
        nestedLayer3.type !== 'ERROR'
          ? nestedLayer3.getEnum('Variant', {
              Icon: nestedLayer3.getInstanceSwap('Icon-24')?.executeTemplate().example,
              'Icon Container': executeFirstInstanceTemplate(
                nestedLayer3.findLayers(n => n.type === 'INSTANCE' && n.name === 'Icon Container')
              ),
              Avatar: executeFirstInstanceTemplate(
                nestedLayer3.findLayers(n => n.type === 'INSTANCE' && n.name === 'Avatar')
              ),
              Indicator: executeFirstInstanceTemplate(
                nestedLayer3.findLayers(n => n.type === 'INSTANCE' && n.name === 'Indicator')
              ),
            })
          : undefined,
    };
  })(),
});
// Each Figma trailing content variant maps to the trailing content and alignment used in code.
type FCCValue = import('figma').FCCValue;
type TrailingContentMapping = {
  content?: FCCValue | import('figma').ResultSection[];
  alignment?: FCCValue;
  onPress?: FCCValue;
};
const trailingContent = figma.selectedInstance.getBoolean('Trailing Content?', {
  true: (function (): TrailingContentMapping | undefined {
    const nestedLayer4 = figma.selectedInstance.findInstance('Trailing content');
    if (nestedLayer4.type === 'ERROR') {
      return undefined;
    }
    const transactionLayer = nestedLayer4.findInstance('Transaction');
    const transactionText =
      transactionLayer.type !== 'ERROR'
        ? transactionLayer
            .findLayers(n => n.type === 'TEXT')
            .map(n => (n.type === 'TEXT' ? `<BodyText>${n.textContent}</BodyText>` : ''))
            .join('')
        : '';
    const variants: Record<string, TrailingContentMapping> = {
      // ListItem renders the chevron itself (centred) whenever `onPress` is set.
      Icon: { onPress: figma.helpers.react.function('() => {}') },
      Link: {
        content: executeFirstInstanceTemplate(
          nestedLayer4.findLayers(n => n.type === 'INSTANCE' && n.name === 'Link')
        ),
      },
      Button: {
        content: executeFirstInstanceTemplate(
          nestedLayer4.findLayers(n => n.type === 'INSTANCE' && n.name === 'Button')
        ),
      },
      Switch: {
        content: executeFirstInstanceTemplate(
          nestedLayer4.findLayers(n => n.type === 'INSTANCE' && n.name === 'Switch')
        ),
      },
      Transaction: {
        content: transactionText
          ? figma.helpers.react.jsxElement(`<>${transactionText}</>`)
          : undefined,
        alignment: 'center',
      },
    };
    return nestedLayer4.getEnum('Variant', variants);
  })(),
});
const heading = figma.selectedInstance.getString('List heading');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const showBadge = figma.selectedInstance.getBoolean('Badge?');
const badgeInstance = figma.selectedInstance.findInstance('Badge');
const badge =
  showBadge && badgeInstance.type !== 'ERROR' ? badgeInstance.executeTemplate().example : undefined;
const numericValue = figma.selectedInstance.getBoolean('Numerical value?', {
  true: figma.selectedInstance.getString('Numerical value'),
});
// "Slot" is a genuine slot property, only populated for the 'Custom' variant.
const customContent = figma.selectedInstance.getEnum('Variant', {
  Custom:
    figma.selectedInstance
      .getSlot('Slot')
      ?.connectedInstances.map(i => i.executeTemplate().example) ?? [],
});

export default {
  id: 'ListItem',
  imports: ["import { BodyText, ListItem } from '@utilitywarehouse/hearth-react-native';"],
  example: customContent
    ? figma.code`<ListItem${figma.helpers.react.renderProp(
        'loading',
        loading
      )}${figma.helpers.react.renderProp('disabled', disabled)}>
      ${figma.helpers.react.renderChildren(customContent.flat())}
    </ListItem>`
    : figma.code`<ListItem${figma.helpers.react.renderProp(
        'heading',
        heading
      )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
        'badge',
        badge
      )}${figma.helpers.react.renderProp(
        'numericValue',
        numericValue
      )}${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp(
        'disabled',
        disabled
      )}${figma.helpers.react.renderProp(
        'leadingContent',
        leadingContent?.variant
      )}${figma.helpers.react.renderProp(
        'trailingContent',
        trailingContent?.content
      )}${figma.helpers.react.renderProp(
        'trailingContentAlignment',
        trailingContent?.alignment
      )}${figma.helpers.react.renderProp('onPress', trailingContent?.onPress)}/>`,
  metadata: {
    nestable: true,
    props: {
      loading,
      disabled,
      leadingContent,
      trailingContent,
      heading,
      helperText,
      badge,
      numericValue,
      customContent,
    },
  },
};

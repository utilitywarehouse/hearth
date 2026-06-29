import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useStyleProps, useTheme } from '../../hooks';
import { SpaceValue } from '../../types';
import { getFlattenedColorValue } from '../../utils';
import { BodyText } from '../BodyText';
import { ListItemProps, ListStyleProps } from './ListItem';

export interface OrderedListProps extends ViewProps, ListStyleProps {
  children: ViewProps['children'];
  gap?: SpaceValue;
  bulletStyle?: ViewStyle;
}

const OrderedList = ({
  children,
  gap = '100',
  style,
  listStyleImage,
  listStyleIcon,
  listStyleWidth,
  listStyleHeight,
  listStyleColour,
  ...rest
}: OrderedListProps) => {
  const { computedStyles } = useStyleProps({ gap });
  const theme = useTheme();
  let itemNumber = 0;

  return (
    <View style={[styles.container, computedStyles, style]} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          itemNumber++;
          const childProps = child.props as ListItemProps;

          const image = childProps.listStyleImage ?? listStyleImage;
          const Icon = childProps.listStyleIcon ?? listStyleIcon;
          const width = childProps.listStyleWidth ?? listStyleWidth ?? 20;
          const height = childProps.listStyleHeight ?? listStyleHeight ?? 20;
          const colourRaw = childProps.listStyleColour ?? listStyleColour;

          const colour = colourRaw ? getFlattenedColorValue(colourRaw, theme.color) : undefined;

          let bullet;
          if (image) {
            const imageEl = image as React.ReactElement<any>;
            bullet = React.cloneElement(imageEl, {
              style: [{ width, height }, imageEl.props.style],
            });
          } else if (Icon) {
            bullet = (
              <Icon width={width} height={height} color={colour ?? theme.color.text.primary} />
            );
          } else {
            bullet = (
              <BodyText
                style={[styles.number, colour && { color: colour }]}
              >{`${itemNumber}.`}</BodyText>
            );
          }

          const isCustom = !!(image || Icon);

          return (
            <View style={styles.listItemContainer}>
              {isCustom ? <View style={{ marginRight: 8 }}>{bullet}</View> : bullet}
              {
                React.cloneElement(child as React.ReactElement<ListItemProps>, {
                  style: [childProps.style, { flex: 1 }],
                }) as ViewProps['children']
              }
            </View>
          );
        }
        return child;
      })}
    </View>
  );
};

OrderedList.displayName = 'OrderedList';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  number: {
    marginRight: 8,
    lineHeight: undefined,
  },
});

export default OrderedList;

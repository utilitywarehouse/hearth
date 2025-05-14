import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import AccordionHeadingTitle from './AccordionHeadingTitle';
import AccordionHeadingHelperText from './AccordionHeadingHelperText';
import AccordionHeadingProps from './AccordionHeading.props';
import AccordionHeadingTextContent from './AccordionHeadingTextContent';
import { Link } from '../../Link';
import { useAccordionContext } from '../Accordion.context';

const AccordionHeading = forwardRef<View, AccordionHeadingProps>(
  (
    {
      text,
      helperText,
      children,
      style,
      linkDisabled,
      linkHref,
      linkIcon,
      linkIconPosition,
      linkOnPress,
      linkShowIcon,
      linkTarget,
      linkText,
      ...props
    },
    ref
  ) => {
    const { disabled } = useAccordionContext();
    return (
      <View ref={ref} {...props} style={[styles.container, style]}>
        {children ? (
          children
        ) : (
          <>
            <AccordionHeadingTextContent>
              <AccordionHeadingTitle>{text}</AccordionHeadingTitle>
              {!!helperText && (
                <AccordionHeadingHelperText>{helperText}</AccordionHeadingHelperText>
              )}
            </AccordionHeadingTextContent>
            {!!linkText && (
              <Link
                href={linkHref}
                disabled={disabled ?? linkDisabled}
                onPress={linkOnPress}
                icon={linkIcon}
                showIcon={linkShowIcon}
                iconPosition={linkIconPosition}
                target={linkTarget}
              >
                {linkText}
              </Link>
            )}
          </>
        )}
      </View>
    );
  }
);

AccordionHeading.displayName = 'AccordionHeading';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.accordion.heading.gap,
    paddingBottom: theme.components.accordion.gap,
  },
}));

export default AccordionHeading;

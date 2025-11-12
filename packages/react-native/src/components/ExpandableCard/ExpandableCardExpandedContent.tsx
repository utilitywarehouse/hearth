import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Divider } from '../Divider';
import { Expandable } from '../Expandable';

interface ExpandableCardExpandedContentProps {
  children: React.ReactNode;
  isExpanded: boolean;
  duration?: number;
  animateOpacity?: boolean;
}

const ExpandableCardExpandedContent = ({
  children,
  isExpanded,
  duration = 200,
  animateOpacity = true,
}: ExpandableCardExpandedContentProps) => {
  return (
    <View style={styles.container}>
      <Expandable expanded={isExpanded} duration={duration} animateOpacity={animateOpacity}>
        <View>
          <Divider space="none" />
          <View style={styles.content}>{children}</View>
        </View>
      </Expandable>
    </View>
  );
};

ExpandableCardExpandedContent.displayName = 'ExpandableCardExpandedContent';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
  },
  content: {
    padding: theme.components.card.mobile.padding,
  },
}));

export default ExpandableCardExpandedContent;

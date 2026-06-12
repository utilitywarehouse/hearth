import { ChevronLeftSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { StyleSheet, View } from 'react-native';
import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils';
import { Card, CardPressHandler, Heading, Link } from '../../src';

type NextPrevPageProps = {
  nextLink?: string;
  nextTitle?: string;
  prevLink?: string;
  prevTitle?: string;
};

const NextPrevPage: React.FC<NextPrevPageProps> = ({
  nextLink,
  nextTitle,
  prevLink,
  prevTitle,
}) => (
  <div className="sb-unstyled">
    <View style={styles.container}>
      {!!prevLink && (
        <Card gap="100" alignItems="flex-start">
          {!!prevTitle && <Heading size="sm">{prevTitle}</Heading>}
          <CardPressHandler>
            <StorybookLink as={Link} to={prevLink} iconPosition="left" icon={ChevronLeftSmallIcon}>
              Prev Page
            </StorybookLink>
          </CardPressHandler>
        </Card>
      )}
      <div />
      {!!nextLink && (
        <Card gap="100" alignItems="flex-start">
          {!!nextTitle && <Heading size="sm">{nextTitle}</Heading>}
          <CardPressHandler>
            <StorybookLink as={Link} to={nextLink}>
              Next Page
            </StorybookLink>
          </CardPressHandler>
        </Card>
      )}
    </View>
  </div>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default NextPrevPage;

import { View, StyleSheet } from 'react-native';
import { Card, CardAction, Heading, Link } from '../../src';
import { ChevronLeftSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

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
}) => {
  const openLink = (link: string) => {
    if (window.top) {
      window.top.location.href = link;
    }
  };
  return (
    <div className="sb-unstyled">
      <View style={styles.container}>
        {!!prevLink && (
          <Card gap="100">
            {!!prevTitle && <Heading size="sm">{prevTitle}</Heading>}
            <CardAction>
              <Link
                onPress={() => openLink(prevLink)}
                iconPosition="left"
                icon={ChevronLeftSmallIcon}
              >
                Prev Page
              </Link>
            </CardAction>
          </Card>
        )}
        <div />
        {!!nextLink && (
          <Card gap="100">
            {!!nextTitle && <Heading size="sm">{nextTitle}</Heading>}
            <CardAction>
              <Link onPress={() => openLink(nextLink)}>Next Page</Link>
            </CardAction>
          </Card>
        )}
      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default NextPrevPage;

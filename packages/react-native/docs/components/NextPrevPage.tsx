import { ChevronLeftSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { StyleSheet, View } from 'react-native';
import { Card, CardAction, Heading, Link } from '../../src';
import { addReactNativePrefix } from '../heplers';

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
    let target = link;
    if (
      typeof window !== 'undefined' &&
      window.top?.location.href.includes('hearth.prod.uw.systems/?path=')
    ) {
      target = addReactNativePrefix(link);
    }
    if (window.top) {
      window.top.location.href = target;
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

import { StoryFn } from '@storybook/react-vite';
import {
  BodyText,
  Box,
  Button,
  ButtonGroup,
  ScrollView,
  StyleSheet,
  View,
} from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';
import React, { useState } from 'react';
import TimedRender from './TimedRender';

const COUNT = 250;

const NativeBox = () => (
  <View style={styles.boxContainer}>
    {new Array(COUNT).fill(0).map((_, i) => (
      <View
        key={`native-box-${i}`}
        style={[styles.styledView, i % 2 === 0 ? styles.blueBackground : styles.grayBackground]}
      >
        <BodyText color="white">Item {i}</BodyText>
        <BodyText color="white">This is static content</BodyText>
      </View>
    ))}
  </View>
);

const BoxComp = () => (
  <View style={styles.boxContainer}>
    {new Array(COUNT).fill(0).map((_, i) => (
      <Box
        key={`gluestack-box-${i}`}
        bg={i % 2 === 0 ? 'blue500' : 'grey500'}
        borderColor="rgb(255, 0, 0)"
        borderWidth={2}
        padding={10}
        justifyContent="center"
        alignItems="center"
      >
        <BodyText color="white">Item {i}</BodyText>
        <BodyText color="white">This is static content</BodyText>
      </Box>
    ))}
  </View>
);

const UnsistylesBox = () => {
  return (
    <View style={styles.boxContainer}>
      {new Array(COUNT).fill(0).map((_, i) => (
        <View
          key={`unsistyles-box-${i}`}
          style={[
            styless.styledView,
            i % 2 === 0 ? styless.blueBackground : styless.grayBackground,
          ]}
        >
          <BodyText color="white">Item {i}</BodyText>
          <BodyText color="white">This is static content</BodyText>
        </View>
      ))}
    </View>
  );
};

const BoxPerfTest: StoryFn = () => {
  const [styleType, setStyleType] = useState<string | undefined>(undefined);

  const onStyleTypePress = (curry: string) => () => {
    setStyleType(curry);
  };

  const renderStyleLibrary = () => {
    switch (styleType) {
      case 'React Native':
        return <NativeBox />;
      case 'Box':
        return <BoxComp />;
      case 'Unsistyles':
        return <UnsistylesBox />;
      default:
        return null;
    }
  };

  return (
    <>
      <ButtonGroup spacing="sm" flexDirection="column">
        <Button text="React Native" onPress={onStyleTypePress('React Native')} />
        <Button text="Unsistyles" onPress={onStyleTypePress('Unsistyles')} />
        <Button text="Box" onPress={onStyleTypePress('Box')} />
      </ButtonGroup>

      {styleType ? (
        <TimedRender key={styleType}>
          <BodyText style={styles.text}>
            Rendering with <BodyText style={styles.bold}>{styleType}</BodyText>
          </BodyText>
        </TimedRender>
      ) : null}
      <ScrollView>{renderStyleLibrary()}</ScrollView>
    </>
  );
};

const styless = StyleSheet.create(theme => ({
  styledView: {
    borderColor: 'rgb(255, 0, 0)',
    borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: theme.color.blue['500'],
  },
  grayBackground: {
    backgroundColor: theme.color.grey[500],
  },
}));

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: '#fff',
    flex: 1,
    minHeight: 500,
  },
  text: {
    marginVertical: 12,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  styledView: {
    borderColor: 'rgb(255, 0, 0)',
    borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: color.blue[400],
  },
  grayBackground: {
    backgroundColor: color.grey[500],
  },
});

export default BoxPerfTest;

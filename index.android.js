import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Container from './src';
import Share from './share.android';

const HeutagogyMobileApp = props => {
  return (
    <View style={styles.container}>
      <Container />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // to make it 100% width and height
  }
});

AppRegistry.registerComponent('HeutagogyMobileApp', () => HeutagogyMobileApp);
AppRegistry.registerComponent('MyShareEx', () => Share);

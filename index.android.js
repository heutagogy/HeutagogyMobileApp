import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Container from './src';
import Share from './share.android';

export default class HeutagogyMobileApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Container />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('HeutagogyMobileApp', () => HeutagogyMobileApp);
AppRegistry.registerComponent('MyShareEx', () => Share);
